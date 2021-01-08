import { Component, Host, h, State } from '@stencil/core';
import { IVerifyEmailAuthenticationRequest } from 'shared/src/interfaces/authentication.interface';
import { IResponse } from 'shared/src/interfaces/response.interface';
import { HttpStatus } from '../../../enums/http-status.enum';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  tag: 'p-auth-verify',
  styleUrl: 'p-auth-verify.css',
  shadow: true,
})
export class PAuthVerify {
  @State()
  formResponse: IResponse | null = null;

  async componentWillRender() {
    const pathname = window.location.pathname.split('/');
    const email = pathname[3];
    const token = pathname[4];

    if (email && token) {
      const formDataObject = {
        email: email,
        email_token: token,
      };

      this.formResponse = await AuthenticationService
        .verifyEmail(formDataObject as IVerifyEmailAuthenticationRequest);
    }
  }

  renderLoading() {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  renderSuccess() {
    return [
      <m-response type="success">
        <a-icon slot="icon" name="cart-outline" size="large"></a-icon>
        <h2>Jetzt kanns los gehen {this.formResponse.user.firstname}...</h2>
      </m-response>,
      <o-login></o-login>,
    ];
  }

  renderError() {
    return [
      <m-response type="error">
        <a-icon slot="icon" name="alert" size="large"></a-icon>
        <p>{this.formResponse.error}</p>
      </m-response>,
      this.formResponse.status === HttpStatus.FORBIDDEN
        ? <o-login></o-login>
        : null,
    ];
  }

  render() {
    return (
      <Host>
        {!this.formResponse
          ? this.renderLoading()
          : this.formResponse.status === HttpStatus.OK
            ? this.renderSuccess()
            : this.renderError()
        }
        <slot></slot>
      </Host>
    );
  }
}
