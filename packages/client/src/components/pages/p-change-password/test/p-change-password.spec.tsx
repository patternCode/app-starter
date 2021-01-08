import { newSpecPage } from '@stencil/core/testing';
import { PChangePassword } from '../p-change-password';

describe('p-change-password', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PChangePassword],
      html: `<p-change-password></p-change-password>`,
    });
    expect(page.root).toEqualHtml(`
      <p-change-password>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </p-change-password>
    `);
  });
});
