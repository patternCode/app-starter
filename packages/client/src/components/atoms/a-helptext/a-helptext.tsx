import {
  Component,
  Element,
  Host,
  Watch,
  Prop,
  h
} from '@stencil/core';

@Component({
  tag: 'a-helptext',
  styleUrl: 'a-helptext.css',
  shadow: true,
})
export class AHelptext {

  slot: HTMLSlotElement;

  @Element()
  host: HTMLAHelptextElement;

  @Prop()
  hasFocus: boolean = false;

  @Prop()
  validity: ValidityState;

  @Watch('validity')
  handleValidityChange() {
    this.handleHelperText();
  }

  @Watch('hasFocus')
  handleFocusChange() {
    this.handleHelperText();
  }

  handleHelperText() {
    const shadowSlot = this.host.shadowRoot.querySelector('slot');
    const shadowNodes = shadowSlot?.assignedNodes({ flatten: false }) || [];
    const nativeSlot = this.host.querySelector('slot');
    const nativeNodes = nativeSlot?.assignedNodes({ flatten: false }) || [];

    [...shadowNodes, ...nativeNodes].map((node) => {
      const slotNode = (node as HTMLElement);
      if (this.hasFocus && slotNode.getAttribute('data-name') === 'default') {
        slotNode.classList.add('visible');
      } else {
        if (
          !this.hasFocus
          && this.validity.valueMissing
          && slotNode.getAttribute('data-name') === 'error-value-missing'
        ) {
          slotNode.classList.add('visible');
        } else if (
          !this.hasFocus
          && this.validity.typeMismatch
          && slotNode.getAttribute('data-name') === 'error-type-mismatch'
        ) {
          slotNode.classList.add('visible');
        } else if (
          !this.hasFocus
          && this.validity.tooShort
          && slotNode.getAttribute('data-name') === 'error-too-short'
        ) {
          slotNode.classList.add('visible');
        } else if (
          !this.hasFocus
          && this.validity.customError
          && slotNode.getAttribute('data-name') === 'error-custom'
        ) {
          slotNode.classList.add('visible');
        } else {
          slotNode.classList.remove('visible');
        }
      }
    });
  }

  render() {
    return (
      <Host class={{
        error: !this.hasFocus && !this.validity?.valid
      }}>
        <slot name="helptext"></slot>
      </Host>
    );
  }

}
