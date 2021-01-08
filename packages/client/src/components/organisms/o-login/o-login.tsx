import { Component, Element, Event, EventEmitter, Host, Method, Prop, Listen, h, State } from '@stencil/core';
import { HttpStatus } from '../../../enums/http-status.enum';
import { IResponse } from 'shared/src/interfaces/response.interface';
import { AuthenticationService } from '../../../services/authentication.service';
import { ILoginAuthenticationRequest } from 'shared/src/interfaces/authentication.interface';
import { Router } from '../../../store/router.store';

interface IFormControl {
  tag: string;
  serialize: (el: HTMLElement, formData: FormData) => void;
  click?: (event: MouseEvent) => any;
  keyDown?: (event: KeyboardEvent) => any;
}

@Component({
  tag: 'o-login',
  styleUrl: 'o-login.css',
  shadow: true,
})
export class OLogin {
  form: HTMLFormElement;
  formControls: IFormControl[];

  @Element()
  host: HTMLOLoginElement;

  /** Prevent the form from validating inputs before submitting. */
  @Prop()
  novalidate: boolean = false;

  @Prop()
  autocomplete: 'on' | 'off' = 'off';

  @State()
  formResponse: IResponse | null = null;

  @State()
  formData = null;

  /**
   * Emitted when the form is submitted. This event will not be emitted if any
   * form control inside of it is in an invalid state, unless the form has the
   * `novalidate` attribute. Note that there is never a need to prevent this
   * event, since it doen't send a GET or POST request like native forms. To
   * "prevent" submission, use a conditional around the XHR request you use to
   * submit the form's data with.
   */
  @Event()
  eventSubmit: EventEmitter;

  @Listen('eventChange')
  eventChangeHandler(event: CustomEvent) {
    const target = event.target as HTMLAInputElement;

    if (target) {
      if (target.name === 'email') {
        target.setCustomValidity('');
      }

      this.getFormData();
    }
  }

  connectedCallback() {
    this.formControls = [
      {
        tag: 'a-input',
        serialize: (el: HTMLAInputElement, formData) => {
          return el.name && !el.disabled
            ? formData.append(el.name, el.value)
            : null;
        },
        keyDown: event => {
          if (event.key === 'Enter') {
            this.submit();
          }
        },
      },
      {
        tag: 'a-button',
        serialize: (el: HTMLAButtonElement, formData) => (
          el.name && !el.disabled ? formData.append(el.name, el.value) : null
        ),
        click: event => {
          const target = event.target as HTMLAButtonElement;
          if (target.type === 'submit') {
            this.submit();
          }
        },
      },
    ];

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  /** Serializes all form controls elements and returns a `FormData` object. */
  @Method()
  async getFormData() {
    const formData = new FormData();
    const formControls = await this.getFormControls();

    formControls.map(el => this.serializeElement(el, formData));
    this.formData = formData;
    return formData;
  }

  /** Gets all form control elements (native and custom). */
  @Method()
  async getFormControls(): Promise<HTMLElement[]> {
    const tags = this.formControls.map(control => control.tag);

    const elements = this.form.querySelectorAll('*');
    const inputs = [...elements].filter(el => {
      if (tags.includes(el.tagName.toLowerCase())) {
        return el as HTMLElement;
      }
    });
    return inputs as HTMLElement[];
  }

  private async scrollIntoView() {
    await this.host.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /**
   * Submits the form. If all controls are valid, the `slSubmit` event will be
   * emitted and the promise will resolve with `true`. If any form control is
   * invalid, the promise will resolve with `false` and no event will be
   * emitted.
   */
  @Method()
  async submit() {
    const formControls = await this.getFormControls();
    const formControlsThatReport = formControls
      .filter((el: any) => typeof el.reportValidity === 'function') as any;

    if (!this.novalidate) {
      const formValidity = [];
      let firstInvalid = null;
      for (const el of formControlsThatReport) {
        const elementValid = await el.reportValidity();
        formValidity.push(elementValid);

        if (!firstInvalid && elementValid.valid === false) {
          firstInvalid = el;
        }
      }

      if (formValidity.some(validity => validity.valid === false)) {
        return false;
      }
    }

    const formData = await this.getFormData();

    let formDataObject = {};
    formData.forEach((value, key) => (formDataObject[key] = value));
    this.formResponse = await AuthenticationService
      .login(formDataObject as ILoginAuthenticationRequest);

    if (this.formResponse.status === HttpStatus.OK) {
      Router.push('profile');
    } else {
      this.scrollIntoView();
      if (this.formResponse.status === HttpStatus.CONFLICT) {
        const emailEl = formControls
          .filter((el: any) => el.name === 'email') as any;

        emailEl[0].setCustomValidity('Invalid');
        return false;
      }
    }

    this.eventSubmit.emit({ formData, formControls });
    return true;
  }

  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const tag = target.tagName.toLowerCase();

    for (const formControl of this.formControls) {
      if (formControl.tag === tag && formControl.click) {
        formControl.click(event);
      }
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    const tag = target.tagName.toLowerCase();

    for (const formControl of this.formControls) {
      if (formControl.tag === tag && formControl.keyDown) {
        formControl.keyDown(event);
      }
    }
  }

  serializeElement(el: HTMLElement, formData: FormData) {
    const tag = el.tagName.toLowerCase();

    for (const formControl of this.formControls) {
      if (formControl.tag === tag) {
        return formControl.serialize(el, formData);
      }
    }

    return null;
  }

  renderSuccess() {
    return (
      <m-response type="success">
        <a-icon slot="icon" name="cart-outline" size="large"></a-icon>
        <h2>Super {this.formResponse.user.firstname}!</h2>
        <p>Schaue in Dein Email-Postfach und bestätige Deine Email-Adresse.</p>
        <p>Danach kannst Du Dich direkt einloggen!</p>
      </m-response>
    );
  }

  renderError() {
    return (
      <m-response type="error">
        <a-icon slot="icon" name="alert" size="large"></a-icon>
        <p>{this.formResponse.error}</p>
      </m-response>
    );
  }

  render() {
    return (
      <Host>
        {this.formResponse
          ? (this.formResponse.status === HttpStatus.CREATED
            ? this.renderSuccess()
            : this.renderError()
          ) : null}

        <form
          ref={el => (this.form = el as HTMLFormElement)}
          part="base"
          class={{
            form: true,
            grid: true,
            hidden: this.formResponse?.status === HttpStatus.CREATED,
          }}
          novalidate={this.novalidate}
          autocomplete={this.autocomplete}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
        >
          <c-section>
            <h1 class="grid__full">Willkommen</h1>
            <p class="grid__full">Sie sind bereits registriert und verfügen über einen Account?</p>
            <p class="grid__full">Melden Sie sich durch die Eingabe Ihrer Zugangsdaten an.</p>
          </c-section>

          <c-section>
            <a-input type="email" name="email" class="grid__full" required>
              <span slot="label">Email-Adresse</span>
              <span slot="helptext" data-name="default">
                Wir schicken Dir eine Email zur Bestätigung
              </span>
              <span slot="helptext" data-name="error-value-missing">
                Pflichtfeld
              </span>
              <span slot="helptext" data-name="error-type-mismatch">
                Bitte gib eine gültige Email-Adresse ein
              </span>
              <span slot="helptext" data-name="error-custom">
                Bereits registriert? <a href="./login">Passwort vergessen</a>
              </span>
            </a-input>
            <a-input type="password" name="password" class="grid__full" required>
              <span slot="label">Passwort</span>
              <span slot="helptext" data-name="default">
                Mindestens 8 Zeichen, ein Großzeichen, ein Sonderzeichen, eine Zahl
              </span>
              <span slot="helptext" data-name="error-value-missing">
                Pflichtfeld
              </span>
              <span slot="helptext" data-name="error-type-mismatch">
                Mindestens 8 Zeichen, ein Großzeichen, ein Sonderzeichen, eine Zahl
              </span>
            </a-input>
          </c-section>
          <c-section>
            <a-button href="./forgot-password" variant="ghost">
              Passwort vergessen?
            </a-button>
            <a-button type="submit" class="grid__right" width="fullwidth">
              Anmelden
            </a-button>
          </c-section>
        </form>
      </Host>
    );
  }
}
