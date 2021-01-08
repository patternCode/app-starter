import { newE2EPage } from '@stencil/core/testing';

describe('o-forgot-password', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<o-forgot-password></o-forgot-password>');

    const element = await page.find('o-forgot-password');
    expect(element).toHaveClass('hydrated');
  });
});
