import { newE2EPage } from '@stencil/core/testing';

describe('a-icon', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<a-icon></a-icon>');

    const element = await page.find('c-icon');
    expect(element).toHaveClass('hydrated');
  });
});
