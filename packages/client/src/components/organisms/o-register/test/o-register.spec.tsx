import { newSpecPage } from '@stencil/core/testing';
import { ORegister } from '../o-register';

describe('o-register', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ORegister],
      html: `<o-register></o-register>`,
    });
    expect(page.root).toEqualHtml(`
      <o-register>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </o-register>
    `);
  });
});
