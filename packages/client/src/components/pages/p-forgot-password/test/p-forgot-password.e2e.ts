import { newE2EPage } from '@stencil/core/testing';

describe('p-forgot-password', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<p-forgot-password></p-forgot-password>');

    const element = await page.find('p-forgot-password');
    expect(element).toHaveClass('hydrated');
  });
});
