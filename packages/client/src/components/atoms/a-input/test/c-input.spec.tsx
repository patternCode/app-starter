import { newSpecPage } from '@stencil/core/testing';
import { AInput } from '../a-input';

describe('a-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AInput],
      html: `<a-input></-input>`,
    });
    expect(page.root).toEqualHtml(`
      <a-input>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </a-input>
    `);
  });
});
