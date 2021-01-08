import { newE2EPage } from '@stencil/core/testing';

describe('a-image', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<a-image></a-image>');

    const element = await page.find('a-image');
    expect(element).toHaveClass('hydrated');
  });
});
