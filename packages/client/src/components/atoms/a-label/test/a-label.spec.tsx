import { newSpecPage } from '@stencil/core/testing';
import { ALabel } from '../a-label';

describe('c-label', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ALabel],
      html: `<a-label></a-label>`,
    });
    expect(page.root).toEqualHtml(`
      <a-label>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </a-label>
    `);
  });
});
