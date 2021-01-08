import { newSpecPage } from '@stencil/core/testing';
import { PLogin } from '../p-login';

describe('p-login', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PLogin],
      html: `<p-login></p-login>`,
    });
    expect(page.root).toEqualHtml(`
      <p-login>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </p-login>
    `);
  });
});
