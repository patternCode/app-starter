import { newE2EPage } from '@stencil/core/testing';

describe('o-login', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<o-login></o-login>');

    const element = await page.find('o-login');
    expect(element).toHaveClass('hydrated');
  });
});
