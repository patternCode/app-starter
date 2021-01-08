import {
  Component,
  Element,
  Host,
  Prop,
  h
} from '@stencil/core';

@Component({
  tag: 'a-label',
  styleUrl: 'a-label.css',
  shadow: true,
})
export class ALabel {

  slot: HTMLSlotElement;

  @Element()
  host: HTMLALabelElement;

  @Prop()
  labelId: string;

  @Prop()
  inputId: string;

  @Prop()
  placeholder: string;

  @Prop()
  value: string;

  @Prop()
  hasFocus: boolean = false;

  @Prop()
  valid: boolean = true;

  @Prop()
  required: boolean;

  @Prop()
  relative?: boolean = false;

  render() {
    return (
      <Host>
        <label part="label"
               id={this.labelId}
               class={{
                 'label--relative': this.relative ? true : false,
                 'label--placeholder': this.placeholder ? true : false,
                 'label--focus': this.hasFocus,
                 'label--filled': this.value ? true : false,
                 'label--valid': this.valid,
                 'label--invalid': !this.hasFocus && !this.valid
               }}
               htmlFor={this.inputId}
               tabIndex={-1}
        >
          <slot name="label"></slot> {this.required ? '' : <span>(Optional)</span>}
        </label>
      </Host>
    );
  }

}
