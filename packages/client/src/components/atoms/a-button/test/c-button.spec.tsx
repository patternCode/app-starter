import { newSpecPage } from '@stencil/core/testing';
import { AButton } from '../a-button';

describe('a-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AButton],
      html: `<a-button></a-button>`,
    });
    expect(page.root).toEqualHtml(`
      <a-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </a-button>
    `);
  });
});
