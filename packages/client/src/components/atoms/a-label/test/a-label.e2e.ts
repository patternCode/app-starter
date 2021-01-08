import { newE2EPage } from '@stencil/core/testing';

describe('a-label', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<a-label></a-label>');

    const element = await page.find('a-label');
    expect(element).toHaveClass('hydrated');
  });
});
