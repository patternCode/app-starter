import { newSpecPage } from '@stencil/core/testing';
import { AHelptext } from '../a-helptext';

describe('a-helptext', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AHelptext],
      html: `<a-helptext></a-helptext>`,
    });
    expect(page.root).toEqualHtml(`
      <a-helptext>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </a-helptext>
    `);
  });
});
