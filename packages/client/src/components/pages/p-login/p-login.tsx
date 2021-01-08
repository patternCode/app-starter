import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'p-login',
  styleUrl: 'p-login.css',
  shadow: true,
})
export class PLogin {

  render() {
    return (
      <Host>
        <o-login></o-login>
        <div>
          <h2>Moment... Du hast keinen Account?</h2>
          <a-button variant="tertiary" href="/register">Jetzt erstellen!</a-button>
        </div>
      </Host>
    );
  }

}
