import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'p-change-password',
  styleUrl: 'p-change-password.css',
  shadow: true,
})
export class PChangePassword {

  render() {
    return (
      <Host>
        <o-change-password></o-change-password>
        <div>
          <h2>Moment... Du hast keinen Account?</h2>
          <a-button variant="tertiary" href="/register">Jetzt erstellen!</a-button>
        </div>
      </Host>
    );
  }

}
