import { newSpecPage } from '@stencil/core/testing';
import { OLogin } from '../o-login';

describe('c-login', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OLogin],
      html: `<o-login></o-login>`,
    });
    expect(page.root).toEqualHtml(`
      <o-login>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </o-login>
    `);
  });
});
