import { newE2EPage } from '@stencil/core/testing';

describe('o-change-password', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<o-change-password></o-change-password>');

    const element = await page.find('o-change-password');
    expect(element).toHaveClass('hydrated');
  });
});
