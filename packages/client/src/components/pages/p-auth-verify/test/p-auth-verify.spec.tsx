import { newSpecPage } from '@stencil/core/testing';
import { PAuthVerify } from '../p-auth-verify';

describe('p-auth-verify', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PAuthVerify],
      html: `<p-auth-verify></p-auth-verify>`,
    });
    expect(page.root).toEqualHtml(`
      <p-auth-verify>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </p-auth-verify>
    `);
  });
});
