import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'p-register',
  styleUrl: 'p-register.css',
  shadow: true,
})
export class PRegister {
  render() {
    return (
      <Host>
        <o-register></o-register>
        <div>
          <h2>Moment... Du hast keinen Account?</h2>
          <c-button variant="tertiary">Jetzt erstellen!</c-button>
        </div>
      </Host>
    );
  }
}
