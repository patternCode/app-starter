import { newSpecPage } from '@stencil/core/testing';
import { OHeader } from '../o-header';

describe('o-header', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OHeader],
      html: `<o-header></o-header>`,
    });
    expect(page.root).toEqualHtml(`
      <o-header>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </o-header>
    `);
  });
});
