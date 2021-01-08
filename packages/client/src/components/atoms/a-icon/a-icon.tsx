import {
  Build,
  Component,
  Element,
  Host, Prop,
  State,
  Watch,
  h
} from '@stencil/core';
import { IconService } from '../../../services/icon.service';
import { getName, getUrl } from '../../../utils/utils';

const createColorClasses = (color: string | undefined) => {
  return color
    ? {
        'color': true,
        [`color-${color}`]: true,
      }
    : null;
};

@Component({
  tag: 'a-icon',
  styleUrl: 'a-icon.css',
  shadow: true,
  assetsDirs: ['svg']
})
export class AIcon {

  private io?: IntersectionObserver;

  @Element()
  el!: HTMLElement;

  @State()
  private svgContent?: string;
  @State()
  private isVisible = false;

  /**
   * The color to use for the background of the item.
   */
  @Prop()
  color?: string;

  /**
   * Specifies the label to use for accessibility. Defaults to the icon name.
   */
  @Prop({ mutable: true, reflect: true })
  ariaLabel?: string;

  /**
   * Set the icon to hidden, respectively `true`, to remove it from the accessibility tree.
   */
  @Prop({ reflect: true })
  ariaHidden?: string;

  /**
   * Specifies whether the icon should horizontally flip when `dir` is `"rtl"`.
   */
  @Prop()
  flipRtl?: boolean;

  /**
   * Specifies which icon to use from the built-in set of icons.
   */
  @Prop()
  name?: string;

  /**
   * Specifies the exact `src` of an SVG file to use.
   */
  @Prop()
  src?: string;

  /**
   * A combination of both `name` and `src`. If a `src` url is detected
   * it will set the `src` property. Otherwise it assumes it's a built-in named
   * SVG and set the `name` property.
   */
  @Prop()
  icon?: 'string';

  /**
   * The size of the icon.
   * Available options are: `"small"` and `"large"`.
   */
  @Prop()
  size?: 'small' | 'large';

  /**
   * If enabled, ion-icon will be loaded lazily when it's visible in the
   * viewport.
   * Default, `false`.
   */
  @Prop()
  lazy = false;

  connectedCallback() {
    // purposely do not return the promise here because loading
    // the svg file should not hold up loading the app
    // only load the svg if it's visible
    this.waitUntilVisible(this.el, '50px', () => {
      this.isVisible = true;
      this.loadIcon();
    });
  }

  disconnectedCallback() {
    if (this.io) {
      this.io.disconnect();
      this.io = undefined;
    }
  }

  private waitUntilVisible(el: HTMLElement, rootMargin: string, cb: () => void) {
    if (Build.isBrowser && this.lazy && typeof window !== 'undefined' && (window as any).IntersectionObserver) {
      const io = (this.io = new (window as any).IntersectionObserver(
        (data: IntersectionObserverEntry[]) => {
          if (data[0].isIntersecting) {
            io.disconnect();
            this.io = undefined;
            cb();
          }
        },
        { rootMargin },
      ));

      io.observe(el);
    } else {
      // browser doesn't support IntersectionObserver
      // so just fallback to always show it
      cb();
    }
  }

  @Watch('name')
  @Watch('src')
  @Watch('icon')
  async loadIcon() {
    if (Build.isBrowser && this.isVisible) {
      const url = getUrl(this);
      if (url) {
        if (IconService.iconContent.has(url)) {
          // sync if it's already loaded
          this.svgContent = IconService.iconContent.get(url);
        } else {
          // async if it hasn't been loaded
          new IconService(url).getSvgContent()
            .then(() => this.svgContent = IconService.iconContent.get(url));
        }
      }
    }

    if (!this.ariaLabel && this.ariaHidden !== 'true') {
      const label = getName(this.name, this.icon);
      // user did not provide a label
      // come up with the label based on the icon name
      if (label) {
        this.ariaLabel = label.replace(/\-/g, ' ');
      }
    }
  }

  render() {
    const flipRtl =
      this.flipRtl ||
      (this.ariaLabel &&
        (this.ariaLabel.indexOf('arrow') > -1 || this.ariaLabel.indexOf('chevron') > -1) &&
        this.flipRtl !== false);

    return (
      <Host
        role="img"
        class={{
          ...createColorClasses(this.color),
          [`icon-${this.size}`]: !!this.size,
          'flip-rtl': !!flipRtl && (this.el.ownerDocument as Document).dir === 'rtl',
        }}
      >
        {Build.isBrowser && this.svgContent ? (
          <div class="icon-inner" innerHTML={this.svgContent}></div>
        ) : (
          <div class="icon-inner"></div>
        )}
      </Host>
    );
  }

}
