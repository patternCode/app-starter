import { newSpecPage } from '@stencil/core/testing';
import { AImage } from '../a-image';

describe('c-image', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AImage],
      html: `<a-image></a-image>`,
    });
    expect(page.root).toEqualHtml(`
      <a-image>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </a-image>
    `);
  });
});
