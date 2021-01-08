import {
  Component,
  Event,
  EventEmitter,
  Host,
  Method,
  State,
  Prop,
  h
} from '@stencil/core';
import { href } from "stencil-router-v2";

@Component({
  tag: 'a-button',
  styleUrl: 'a-button.css',
  shadow: true,
})
export class AButton {

  button: HTMLButtonElement;

  @State()
  hasFocus = false;
  @State()
  mouseDown: boolean = false;
  @State()
  outline = false;

  /** The button's type. */
  @Prop({ reflect: true })
  type?: 'submit' | 'button' | 'reset' = 'button';

  /** Button Variant */
  @Prop({ reflect: true })
  variant: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'icon' = 'primary';

  /** The button's width. */
  @Prop({ reflect: true })
  width: 'default' | 'fullwidth' = 'default';

  /** The button's height. */
  @Prop({ reflect: true })
  height: 'small' | 'medium' | 'large' = 'medium';

  /** Set to true to draw the button with a caret for use with dropdowns,
   *  popovers, etc. */
  @Prop()
  caret = false;

  /** Set to true to disable the button. */
  @Prop({ reflect: true })
  disabled = false;

  /** Set to true to draw the button in a loading state. */
  @Prop({ reflect: true })
  loading = false;

  /** Set to true to draw a pill-style button with rounded edges. */
  @Prop({ reflect: true })
  pill = false;

  /** Set to true to draw a circle button. */
  @Prop({ reflect: true })
  circle = false;

  /** An optional name for the button. Ignored when `href` is set. */
  @Prop()
  name: string;

  /** An optional value for the button. Ignored when `href` is set. */
  @Prop()
  value: string;

  /** When set, the underlying button will be rendered as an `<a>` with this
   * `href` instead of a `<button>`. */
  @Prop()
  href: string;

  /** Tells the browser where to open the link. Only used when `href` is set. */
  @Prop()
  target: '_blank' | '_parent' | '_self' | '_top';

  /** Tells the browser to download the linked file as this filename. Only used
   * when `href` is set. */
  @Prop()
  download: string;

  /** Emitted when the button loses focus. */
  @Event()
  eventBlur: EventEmitter;

  /** Emitted when the button gains focus. */
  @Event()
  eventFocus: EventEmitter;

  connectedCallback() {
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  /** Sets focus on the button. */
  @Method()
  async setFocus() {
    this.button.focus();
  }

  /** Removes focus from the button. */
  @Method()
  async removeFocus() {
    this.button.blur();
  }

  handleMouseDown() {
    this.mouseDown = true;
  }

  handleMouseUp() {
    this.mouseDown = false;
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
    this.eventBlur.emit();

    event.stopPropagation();
  }

  handleClick(event: MouseEvent) {
    if (!this.href) {
      event.preventDefault();
    }

    if (this.disabled || this.loading) {
      event.stopPropagation();
    }
  }

  render() {
    const isLink = this.href ? true : false;
    const isButton = !isLink;
    const Button = isLink ? 'a' : 'button';

    return (
      <Host>
        <Button
          ref={el => (this.button = el)}
          part="base"
          class={{
            button: true,

            // Outline
            'button--outline': this.outline,

            // Variants
            'button--primary': this.variant === 'primary',
            'button--secondary': this.variant === 'secondary',
            'button--tertiary': this.variant === 'tertiary',
            'button--ghost': this.variant === 'ghost',
            'button--icon': this.variant === 'icon',

            // Width
            'button--width-fullwidth': this.width === 'fullwidth',

            // Height
            'button--height-small': this.height === 'small',
            'button--height-medium': this.height === 'medium',
            'button--height-large': this.height === 'large',

            // Modifiers
            'button--caret': this.caret,
            'button--circle': this.circle,
            'button--disabled': this.disabled,
            'button--focused': this.hasFocus,
            'button--loading': this.loading,
            'button--pill': this.pill
          }}
          disabled={this.disabled}
          type={isButton ? this.type : null}
          name={isButton ? this.name : null}
          value={isButton ? this.value : null}
          {...href(isLink && this.href)}
          target={isLink && this.target ? this.target : null}
          download={isLink && this.download ? this.download : null}
          rel={isLink && this.target ? 'noreferrer noopener' : null}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onClick={this.handleClick}
        >
          <span part="prefix" class="button__prefix">
            <slot name="prefix" />
          </span>
          <span part="label" class="button__label">
            <slot />
          </span>
          <span part="suffix" class="button__suffix">
            <slot name="suffix" />
          </span>
          {this.caret && (
            <span part="caret" class="button__caret">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          )}

          {this.loading && <hardeck-spinner />}
        </Button>
      </Host>
    );
  }

}
