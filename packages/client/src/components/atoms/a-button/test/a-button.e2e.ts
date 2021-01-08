import { newE2EPage } from '@stencil/core/testing';

describe('a-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<a-button></a-button>');

    const element = await page.find('a-button');
    expect(element).toHaveClass('hydrated');
  });
});
