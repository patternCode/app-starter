import { newSpecPage } from '@stencil/core/testing';
import { AIcon } from '../a-icon';

describe('a-icon', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AIcon],
      html: `<a-icon></a-icon>`,
    });
    expect(page.root).toEqualHtml(`
      <a-icon>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </a-icon>
    `);
  });
});
