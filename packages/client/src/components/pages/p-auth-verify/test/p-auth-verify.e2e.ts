import { newE2EPage } from '@stencil/core/testing';

describe('p-auth-verify', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<p-auth-verify></p-auth-verify>');

    const element = await page.find('p-auth-verify');
    expect(element).toHaveClass('hydrated');
  });
});
