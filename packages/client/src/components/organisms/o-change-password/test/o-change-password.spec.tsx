import { newSpecPage } from '@stencil/core/testing';
import { OChangePassword } from '../o-change-password';

describe('c-change-password', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OChangePassword],
      html: `<o-change-password></o-change-password>`,
    });
    expect(page.root).toEqualHtml(`
      <o-change-password>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </o-change-password>
    `);
  });
});
