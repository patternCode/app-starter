import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'p-forgot-password',
  styleUrl: 'p-forgot-password.css',
  shadow: true,
})
export class PForgotPassword {

  render() {
    return (
      <Host>
        <o-forgot-password></o-forgot-password>
        <div>
          <h2>Moment... Du hast keinen Account?</h2>
          <a-button variant="tertiary" href="/register">Jetzt erstellen!</a-button>
        </div>
      </Host>
    );
  }

}
