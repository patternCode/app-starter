import { newE2EPage } from '@stencil/core/testing';

describe('o-header', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<o-header></o-header>');

    const element = await page.find('o-header');
    expect(element).toHaveClass('hydrated');
  });
});
