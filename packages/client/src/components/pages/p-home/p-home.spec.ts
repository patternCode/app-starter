import { PHome } from './p-home';
import { newSpecPage } from '@stencil/core/testing';

describe('p-home', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [PHome],
      html: '<p-home></p-home>',
    });
    expect(root.querySelector('ion-title').textContent).toEqual('Home');
  });
});
