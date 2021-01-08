import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Method,
  Prop,
  Watch,
  h
} from '@stencil/core';

const toastStack = Object.assign(
  document.createElement('div'),
  {
    className: 'h-toast-stack'
  }
);

@Component({
  tag: 'm-response',
  styleUrl: 'm-response.css',
  shadow: true,
})
export class MResponse {

  response: HTMLElement;
  autoHideTimeout: any;
  isShowing = false;

  @Element()
  host: HTMLMResponseElement;

  /** Indicates whether or not the response is hidden.
   * You can use this in lieu of the show/hide methods.
   * */
  @Prop({ mutable: true, reflect: true })
  hidden = false;

  /** Set to true to make the response closable. */
  @Prop({ reflect: true })
  closable = false;

  /** The type of response. */
  @Prop({ reflect: true })
  type: 'success' | 'info' | 'warning' | 'error' = 'error';

  /** The content of response. */
  @Prop()
  content: any;

  /**
   * The length of time, in milliseconds, the response will show before closing itself. If the user interacts with the
   * response before it closes (e.g. moves the mouse over it), the timer will restart.
   */
  @Prop()
  duration = Infinity;

  @Watch('hidden')
  handleOpenChange() {
    this.hidden ? this.hide() : this.show();
  }

  @Watch('duration')
  handleDurationChange() {
    this.restartAutoHide();
  }

  /** Emitted when the response opens. Calling `event.preventDefault()` will prevent it from being opened. */
  @Event() eventShow: EventEmitter;

  /** Emitted after the response opens and all transitions are complete. */
  @Event() eventAfterShow: EventEmitter;

  /** Emitted when the response closes. Calling `event.preventDefault()` will prevent it from being closed. */
  @Event() eventHide: EventEmitter;

  /** Emitted after the response closes and all transitions are complete. */
  @Event() eventAfterHide: EventEmitter;

  connectedCallback() {
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
  }

  componentDidLoad() {
    // Show on init if not hidden
    if (!this.hidden) {
      this.show();
    }
  }

  /** Shows the response. */
  @Method()
  async show() {
    // Prevent subsequent calls to the method, whether manually or triggered
    // by the `hidden` watcher
    if (this.isShowing) {
      return;
    }

    const eventShow = this.eventShow.emit();
    if (eventShow.defaultPrevented) {
      this.hidden = true;
      return;
    }

    this.host.hidden = false;
    /* this.handleMessage(); */
    this.host.clientWidth; // force a reflow
    this.isShowing = true;
    this.hidden = false;

    if (this.duration < Infinity) {
      this.autoHideTimeout = setTimeout(() => this.hide(), this.duration);
    }
  }

  /** Hides the response */
  @Method()
  async hide() {
    // Prevent subsequent calls to the method, whether manually or triggered by the `open` watcher
    if (!this.isShowing) {
      return;
    }

    const eventHide = this.eventHide.emit();
    if (eventHide.defaultPrevented) {
      this.hidden = false;
      return;
    }

    clearTimeout(this.autoHideTimeout);
    this.isShowing = false;
    this.hidden = true;
  }

  /**
   * Displays the response as a toast notification. This will move the response out of its position in the DOM and, when
   * dismissed, it will be removed from the DOM completely. By storing a reference to the response, you can reuse it by
   * calling this method again. The returned promise will resolve after the response is hidden.
   */
  @Method()
  async toast() {
    return new Promise(resolve => {
      if (!toastStack.parentElement) {
        document.body.append(toastStack);
      }

      toastStack.append(this.host);
      this.show();

      this.host.addEventListener(
        'eventAfterHide',
        () => {
          this.host.remove();
          resolve(true);

          // Remove the toast stack from the DOM when there are no more responses
          if (toastStack.querySelector('h-response') === null) {
            toastStack.remove();
          }
        },
        { once: true }
      );
    });
  }

  handleCloseClick() {
    this.hide();
  }

  handleMouseMove() {
    this.restartAutoHide();
  }

  handleTransitionEnd(event: TransitionEvent) {
    const target = event.target as HTMLElement;

    // Ensure we only emit one event when the target element is no longer visible
    if (event.propertyName === 'opacity' && target.classList.contains('response')) {
      this.host.hidden = this.hidden;
      this.hidden ? this.eventAfterHide.emit() : this.eventAfterShow.emit();
    }
  }

  // handleMessage() {
  //   const slot = this.host.shadowRoot.querySelector('slot:not([name="icon"]') as HTMLSlotElement;
  //   const nodes = slot.assignedNodes({ flatten: false });
//
  //   [...nodes].map((node) => {
  //     const n = (node as HTMLElement);
//
  //     if (n.nodeType === Node.ELEMENT_NODE) {
  //       if (
  //         this.reason.valueMissing === true
  //         && n.getAttribute('name') === 'error-value-missing'
  //       ) {
  //         n.classList.add('visible');
  //       } else if (
  //         this.reason.typeMismatch === true
  //         && n.getAttribute('name') === 'error-type-mismatch'
  //       ) {
  //         n.classList.add('visible');
  //       } else {
  //         n.classList.remove('visible');
  //       }
  //     }
  //   });
  // }

  restartAutoHide() {
    clearTimeout(this.autoHideTimeout);
    if (!this.hidden && this.duration < Infinity) {
      this.autoHideTimeout = setTimeout(() => this.hide(), this.duration);
    }
  }

  render() {
    return (
      <Host hidden>
        <div
          ref={el => (this.response = el)}
          part="base"
          class={{
            response: true,
            'response--open': !this.hidden,
            'response--closable': this.closable,
            'response--success': this.type === 'success',
            'response--info': this.type === 'info',
            'response--warning': this.type === 'warning',
            'response--error': this.type === 'error'
          }}
          role="response"
          aria-live="assertive"
          aria-atomic="true"
          aria-hidden={this.hidden}
          onMouseMove={this.handleMouseMove}
          onTransitionEnd={this.handleTransitionEnd}
        >
          <span part="icon" class="response__icon">
            <slot name="icon" />
          </span>

          <span part="message" class="response__message">
            <slot></slot>
          </span>

          {this.closable && (
            <span class="response__close">
              <h-icon-button part="close-button" name="x" onClick={this.handleCloseClick} />
            </span>
          )}
        </div>
      </Host>
    );
  }

}
