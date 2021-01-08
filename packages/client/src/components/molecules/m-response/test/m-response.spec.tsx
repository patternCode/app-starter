import { newSpecPage } from '@stencil/core/testing';
import { MResponse } from '../m-response';

describe('m-response', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MResponse],
      html: `<m-response></m-response>`,
    });
    expect(page.root).toEqualHtml(`
      <m-response>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </m-response>
    `);
  });
});
