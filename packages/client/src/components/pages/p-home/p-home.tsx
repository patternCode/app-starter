import { Component, Host, h } from '@stencil/core';
import { href } from 'stencil-router-v2';

import { homeState } from '../../../store/home';

@Component({
  tag: 'p-home',
  styleUrl: 'p-home.css',
  shadow: true,
})
export class PHome {
  async componentWillLoad() {
    /* await Request.fetchHome()
      .then(res => res.json())
      .then(data => {
        homeState.tag = data.find(obj => obj.name === 'categories').tag;
        homeState.categories = data.find(obj => obj.name === 'categories').items;
      }); */
  }

  render() {
    return (
      <Host>
        <homeState.categories.tag></homeState.categories.tag>
        <c-grid class="section">
        <p>
          Welcome to the Stencil App Starter.
          You can use this starter to build entire apps all with
          web components using Stencil!
          Check out our docs on <a href='https://stenciljs.com'>stenciljs.com</a> to get started.
        </p>

        <a {...href('/profile/stencil')}>Profile page</a>
        </c-grid>
        <c-grid class="aside">
          Aside
        </c-grid>
      </Host>
    )
  }

}
