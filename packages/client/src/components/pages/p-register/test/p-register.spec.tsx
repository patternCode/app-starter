import { newSpecPage } from '@stencil/core/testing';
import { PRegister } from '../p-register';

describe('p-register', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PRegister],
      html: `<p-register></p-register>`,
    });
    expect(page.root).toEqualHtml(`
      <p-register>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </p-register>
    `);
  });
});
