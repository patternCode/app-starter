import { newSpecPage } from '@stencil/core/testing';
import { OForgotPassword } from '../o-forgot-password';

describe('c-forgot-password', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OForgotPassword],
      html: `<o-forgot-password></o-forgot-password>`,
    });
    expect(page.root).toEqualHtml(`
      <o-forgot-password>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </o-forgot-password>
    `);
  });
});
