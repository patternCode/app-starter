import { Component, Element, Host,Prop, h } from "@stencil/core";
import { href } from "stencil-router-v2";
import { transitionDuration } from "../../../utils/transition";
import { AppState } from "../../../store/app.store";

@Component({
  tag: 'o-header',
  styleUrl: 'o-header.css',
  shadow: true,
})
export class OHeader {

  private _scrollInView: boolean;

  private _scrollLastTop: number;

  private _scrollLastTimestamp: number;

  @Element()
  host: HTMLOHeaderElement;

  @Prop({ mutable: true })
  reduced: boolean;

  /**
   * Called every time the element is inserted into the DOM.
   * @public
   */
  public connectedCallback(): void {
    window.addEventListener('scroll', () => {
      this._updateScrollState();
    }, false);
  }

  private _updateScrollState() {
    const now = performance.now();
    const scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    const windowHeight = window.innerHeight;
    const top = window.pageYOffset || document.documentElement.scrollTop;
    const headerHeight = this.host.offsetHeight;

    // scroll direction down
    if (top > this._scrollLastTop) {
      if (top >= scrollHeight - windowHeight) {
        return;
      }

      if (top >= headerHeight) {
        if (this._scrollInView) {
          this.host.style.transform = `translate3d(0, ${-headerHeight}px, 0)`;
          this.host.style.transitionDuration =  transitionDuration(
            top,
            this._scrollLastTop,
            now,
            this._scrollLastTimestamp
          ) + 'ms';
          this._scrollInView = false;
        }
      } else {
        if (top >= 0 && this._scrollInView) {
          this.host.style.transform = `translate3d(0, ${-top}px, 0)`;
          this.host.style.transitionDuration = '0ms';
          if (top === 0) {
            this._scrollInView = true;
          }
        }
      }
    }
    // scroll direction up
    else if (top < this._scrollLastTop) {
      if (top > headerHeight) {
        if (!this._scrollInView) {
          this.host.style.transform = `translate3d(0, 0, 0)`;
          this.host.style.transitionDuration =  transitionDuration(
            top,
            this._scrollLastTop,
            now,
            this._scrollLastTimestamp
          ) + 'ms';
          this._scrollInView = true;
        }
      } else {
        if (this.host.style.transform !== `translate3d(0px, 0px, 0px)`) {
          this.host.style.transform = `translate3d(0, ${-top}px, 0)`;
          this.host.style.transitionDuration =  transitionDuration(
            top,
            this._scrollLastTop,
            now,
            this._scrollLastTimestamp
          ) + 'ms';
        }
      }
    }

    this._scrollLastTop = top;
    this._scrollLastTimestamp = now;
  }

  render() {

    return (
      <Host>
        <header>
          <a {...href('/')} class="link-logo">App Starter</a>
          {!this.reduced
            ? [
            <app-search></app-search>,
            <div class="nav-tools">
              <a {...href(AppState.isAuthenticated ? '/profile/stencil' : '/login')}
                 class="link-icon"
              >
                <a-icon name="person-outline" size="large"></a-icon>
              </a>
              <a {...href(AppState.isAuthenticated ? '/profile/stencil' : '/login')}
                 class="link-icon">
                <a-icon name="mail-outline" size="large"></a-icon>
              </a>
              <a {...href(AppState.isAuthenticated ? '/profile/stencil' : '/login')}
                 class="link-icon">
                <a-icon name="heart-outline" size="large"></a-icon>
              </a>
              <a {...href(AppState.isAuthenticated ? '/profile/stencil' : '/login')}
                 class="link-icon">
                <a-icon name="cart-outline" size="large"></a-icon>
              </a>
            </div>
            ]
            : ''
          }
          <a {...href(AppState.isAuthenticated ? '/profile/stencil' : '/login')}
             class="link-offer">
            <span>Sei <b>Tutor!</b></span>
            <span>Jetzt anmelden</span>
          </a>
        </header>
      </Host>
    );
  }

}
