import { newE2EPage } from '@stencil/core/testing';

describe('p-change-password', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<p-change-password></p-change-password>');

    const element = await page.find('p-change-password');
    expect(element).toHaveClass('hydrated');
  });
});
