import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Method,
  State,
  Prop,
  Watch,
  h
} from '@stencil/core';
import { InputValidityObj } from '../../../utils/validate.util';

let id = 0;

@Component({
  tag: 'a-input',
  styleUrl: 'a-input.css',
  shadow: true,
})
export class AInput {

  inputId = `input-${++id}`;
  labelId = `input-label-${id}`;
  errorTextId = `input-error-text-${id}`;
  input: HTMLInputElement;

  @Element()
  host: HTMLAInputElement;

  @State()
  hasFocus = false;
  @State()
  mouseDown: boolean = false;
  @State()
  outline = false;
  @State()
  isPasswordVisible = false;

  /** The input's type. */
  @Prop({ reflect: true })
  type: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url' = 'text';

  /** The input's size. */
  @Prop({ reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  /** The input's name attribute. */
  @Prop({ reflect: true })
  name = '';

  /** The input's value attribute. */
  @Prop({ mutable: true })
  value: string = '';

  /** Set to true to draw a pill-style input with rounded edges. */
  @Prop({ reflect: true })
  pill = false;

  /** The input's placeholder text. */
  @Prop()
  placeholder: string;

  /** Set to true to disable the input. */
  @Prop({ reflect: true })
  disabled = false;

  /** Set to true to make the input readonly. */
  @Prop({ reflect: true })
  readonly = false;

  /** The minimum length of input that will be considered valid. */
  @Prop({ reflect: true })
  minlength: number;

  /** The maximum length of input that will be considered valid. */
  @Prop({ reflect: true })
  maxlength: number;

  /** The input's minimum value. */
  @Prop({ reflect: true })
  min: number;

  /** The input's maximum value. */
  @Prop({ reflect: true })
  max: number;

  /** The input's step attribute. */
  @Prop({ reflect: true })
  step: number;

  /** A pattern to validate input against. */
  @Prop({ reflect: true })
  pattern: string;

  /** Set to true to make the checkbox a required field. */
  @Prop({ mutable: true, reflect: true })
  required: boolean;

  /** The input's autocaptialize attribute. */
  @Prop()
  autocapitalize: string;

  /** The input's autocorrect attribute. */
  @Prop()
  autocorrect: string;

  /** The input's autocomplete attribute. */
  @Prop()
  autocomplete: string;

  /** The input's autofocus attribute. */
  @Prop()
  autofocus: boolean;

  /** Input validity */
  @Prop()
  validity: ValidityState = InputValidityObj();

  /** Set to true to add a clear button when the input is populated. */
  @Prop()
  clearable = false;

  /** Set to true to add a password toggle button for password inputs. */
  @Prop()
  togglePassword = false;

  /** The input's inputmode attribute. */
  @Prop()
  inputmode:
  'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';

  /** Host display */
  @Prop()
  hidden = true;

  @Watch('value')
  handleValueChange() {
    this.reportValidity();
  }

  /** Emitted when the control's value changes. */
  @Event()
  eventChange: EventEmitter;

  /** Emitted when the clear button is activated. */
  @Event()
  eventClear: EventEmitter;

  /** Emitted when the control receives input. */
  @Event()
  eventInput: EventEmitter;

  /** Emitted when the control gains focus. */
  @Event()
  eventFocus: EventEmitter;

  /** Emitted when the control loses focus. */
  @Event()
  eventBlur: EventEmitter;

  connectedCallback() {
    this.setPasswordLength();

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handlePasswordToggle = this.handlePasswordToggle.bind(this);
  }

  /** Sets focus on the input. */
  @Method()
  async setFocus() {
    this.input.focus();
  }

  /** Removes focus from the input. */
  @Method()
  async removeFocus() {
    this.input.blur();
  }

  /** Selects all the text in the input. */
  @Method()
  async select() {
    return this.input.select();
  }

  /** Sets the start and end positions of the text selection (0-based). */
  @Method()
  async setSelectionRange(
    selectionStart: number,
    selectionEnd: number,
    selectionDirection: 'forward' | 'backward' | 'none' = 'none'
  ) {
    return this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  }

  /** Replaces a range of text with a new string. */
  @Method()
  async setRangeText(
    replacement: string,
    start: number,
    end: number,
    selectMode: 'select' | 'start' | 'end' | 'preserve' = 'preserve'
  ) {
    this.input.setRangeText(replacement, start, end, selectMode);

    if (this.value !== this.input.value) {
      this.value = this.input.value;
      this.eventChange.emit({value: this.value});
      this.eventInput.emit();
    }
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  @Method()
  async reportValidity() {
    const nativeValidity = this.input.validity;

    let validity = InputValidityObj(nativeValidity);

    if (this.validityTransform) {
      const customValidity = this.validityTransform(this.value, validity);
      validity = {...validity, ...customValidity};
    }

    this.validity = validity;

    return this.validity;
  }

  /**
   * Sets a custom validation message. If `message` is not empty, the field
   * will be considered invalid.
   * */
  @Method()
  async setCustomValidity(message: string) {
    this.input.setCustomValidity(message);
    this.reportValidity();
  }

  setPasswordLength() {
    if (this.type === 'password') {
      this.minlength = 6;
    }
  }

  /*
   * Handle Events
   */
  handleMouseDown() {
    this.mouseDown = true;
  }

  handleMouseUp() {
    this.mouseDown = false;
  }

  handleChange(event: Event) {
    event.preventDefault();

    this.value = this.input.value;
    this.reportValidity();
    this.eventChange.emit({value: this.value});

    event.stopPropagation();
  }

  handleInput(event: Event) {
    event.preventDefault();
    this.value = this.input.value;
    this.eventInput.emit();

    event.stopPropagation();
  }

  handleFocus(event: Event) {
    event.preventDefault();

    if (this.disabled) {
      return;
    }

    this.hasFocus = true;
    if (!this.mouseDown) {
      this.outline = true;
    }
    this.eventFocus.emit();

    event.stopPropagation();
  }

  async handleBlur(event: Event) {
    event.preventDefault();
    this.hasFocus = false;
    this.outline = false;
    this.reportValidity();
    this.eventBlur.emit();

    event.stopPropagation();
  }

  async handleClearClick(event: MouseEvent) {
    if (this.type === 'password') {
      this.value = '';
      this.input.value = '';
    }
    this.eventClear.emit();
    this.eventInput.emit();
    this.eventChange.emit();
    this.input.focus();

    event.stopPropagation();
  }

  handlePasswordToggle() {
    this.isPasswordVisible = !this.isPasswordVisible;

    if (this.isPasswordVisible) {
      this.input.focus();
    }
  }

  private validityTransform: (
    (value: string, nativeValidity: ValidityState) =>
    Partial<ValidityState>
  ) | null = () => {
    if (this.required && this.input.value.match(/\S/) === null) {
      return {
        valid: false,
        valueMissing: true
      };
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (
      this.type === 'email'
      && !this.input.value.match(emailRegex)
      && (this.input.value.length || this.input.required)
    ) {
      return {
        valid: false,
        typeMismatch: true
      };
    }

    const telRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    if (
      this.type === 'tel'
      && !this.input.value.match(telRegex)
      && (this.input.value.length || this.input.required)
    ) {
      return {
        valid: false,
        typeMismatch: true
      };
    }

    const passwordRegex = /^(?=.*[A-Z]{1,})(?=.*[a-z]{1,})(?=.*[0-9]{1,})(?=.*[~!@#$%^&*()\-_=+{};:,<.>]{1,}).{8,}$/;
    if (
      this.type === 'password'
      && !this.input.value.match(passwordRegex)
      && (this.input.value.length || this.input.required)
    ) {
      return {
        valid: false,
        typeMismatch: true
      };
    }

    return {};
  };

  render() {
    /* const fillColor = this.value.length && this.validity.valid
      ? '#008d3d'
      : !this.hasFocus && !this.validity.valid
        ? '#e20d0d'
        : null; */

    return (
      <Host>
        <div part="field"
             class="field"
        >
          <input
            part="input"
            ref={el => (this.input = el)}
            id={this.inputId}
            class={{
              'input__control': true,
              'input__control--outline': this.outline,
              'input__control--error': !this.validity.valid,
              'input__control--success': this.value && this.validity.valid
            }}
            type={this.type === 'password' && this.isPasswordVisible ? 'text' : this.type}
            name={this.name}
            placeholder={this.placeholder}
            disabled={this.disabled}
            readonly={this.readonly}
            minLength={this.minlength}
            maxLength={this.maxlength}
            min={this.min}
            max={this.max}
            step={this.step}
            value={this.value}
            autoCapitalize={this.autocapitalize}
            autoComplete={this.autocomplete}
            autoCorrect={this.autocorrect}
            autoFocus={this.autofocus}
            pattern={this.pattern}
            required={this.required}
            inputMode={this.inputmode}
            aria-labelledby={this.labelId}
            aria-invalid={!this.validity.valid}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            onChange={this.handleChange}
            onInput={this.handleInput}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
          {this.type === 'password'
            ? <button part="password-toggle-button"
                      type="button"
                      class="validity-icon"
                      onClick={this.handlePasswordToggle}
              >
                {this.isPasswordVisible
                  ? <a-icon name="eye-off-outline" size="large"></a-icon>
                  : <a-icon name="eye-outline" size="large"></a-icon>
                }
              </button>
            : ''
          }
          <a-label inputId={this.inputId}
                   labelId={this.labelId}
                   placeholder={this.placeholder}
                   value={this.value}
                   hasFocus={this.hasFocus}
                   valid={this.validity.valid}
                   required={this.required}
          >
            <slot slot="label" name="label"></slot>
          </a-label>
        </div>
        <a-helptext hasFocus={this.hasFocus}
                    validity={this.validity}
        >
          <slot slot="helptext" name="helptext"></slot>
        </a-helptext>
      </Host>
    );
  }

}
