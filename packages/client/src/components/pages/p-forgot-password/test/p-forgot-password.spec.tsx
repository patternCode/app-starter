import { newSpecPage } from '@stencil/core/testing';
import { PForgotPassword } from '../p-forgot-password';

describe('p-forgot-password', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PForgotPassword],
      html: `<p-forgot-password></p-forgot-password>`,
    });
    expect(page.root).toEqualHtml(`
      <p-forgot-password>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </p-forgot-password>
    `);
  });
});
