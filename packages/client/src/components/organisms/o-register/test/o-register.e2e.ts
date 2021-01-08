import { newE2EPage } from '@stencil/core/testing';

describe('o-register', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<o-register></o-register>');

    const element = await page.find('o-register');
    expect(element).toHaveClass('hydrated');
  });
});
