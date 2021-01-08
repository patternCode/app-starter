import {
  Component,
  Element,
  Host,
  Prop,
  State,
  h
} from '@stencil/core';

@Component({
  tag: 'a-image',
  styleUrl: 'a-image.css',
  shadow: true,
})
export class AImage {
  private observer: IntersectionObserver | null;

  private isIntersecting = ({isIntersecting}: any) => {
    return isIntersecting;
  };

  @Element()
  host: HTMLAImageElement;

  @Prop()
  src = {
    default: '',
    default2x: '',
    tablet: '',
    tablet2x: '',
    desktop: '',
    desktop2x: ''
  };

  @Prop()
  alt: string = '';

  @Prop()
  ioRootMargin: string = '0px';

  @State()
  intersecting: boolean = false;

  @State()
  loaded: boolean = false;

  connectedCallback() {
    // if IntersectionObserver is available, initialize it.
    this.initIntersectionObserver();
  }

  disconnectedCallback() {
    this.disconnectObserver();
  }

  /**
   * Sets the `intersecting` property when the element is on screen.
   * @param  {[IntersectionObserverEntry]} entries
   * @protected
   */
  observerCallback(entries: any) {
    if (entries.some(this.isIntersecting)) {
      this.intersecting = true;
    }
  }

  /**
   * Initializes the IntersectionObserver when the element instantiates.
   * @protected
   */
  protected initIntersectionObserver() {
    if ('loading' in HTMLImageElement.prototype) {
      return;
    }

    if ('IntersectionObserver' in window) {
      // Short-circuit if observer has already initialized.
      if (this.observer) {
        return;
      }

      this.observer =
        new IntersectionObserver(
          this.observerCallback,
          {
            rootMargin: this.ioRootMargin
          }
        );

      return this.observer.observe(this.host);
    } else {
      // if IntersectionObserver is unavailable, simply load the image.
      this.intersecting = true;
      return;
    }
  }

  /**
   * Disconnects and unloads the IntersectionObserver.
   * @protected
   */
  protected disconnectObserver() {
    if (this.observer) {
      this.observer.disconnect();
    }

    this.observer = null;
  }

  /**
   * Sets the `loaded` property when the image is finished loading.
   * @protected
   */
  onLoad(_event: any) {
    this.loaded = true;
  }

  render() {
    return (
      <Host role="presentation">
        <div id="placeholder" aria-hidden={!!this.intersecting}>
          <slot name="placeholder"></slot>
        </div>
        <picture id="picture">
          ${this.intersecting && this.src.desktop
          ? <source media="(min-width: 1025px)"
                    srcSet={`${this.src.desktop} ${this.src.desktop2x ? `, ${this.src.desktop2x} 2x` : ''}`}
            />
          : null}
          ${this.intersecting && this.src.tablet
          ? <source media="(min-width: 768px)"
                    srcSet={`${this.src.tablet} ${this.src.tablet2x ? `, ${this.src.tablet2x} 2x` : ''}`}
            />
          : null}
          ${this.intersecting && this.src.default
          ? <img id="image"
                 src={this.src.default}
                 srcSet={this.src.default2x ? `${this.src.default2x} 2x` : null}
                 alt={this.alt}
                 aria-hidden={!this.intersecting}
                 loading="lazy"
                 onLoad={this.onLoad}
            />
          : null}
        </picture>
      </Host>
    );
  }

}
