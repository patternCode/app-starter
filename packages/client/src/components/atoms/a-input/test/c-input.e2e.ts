import { newE2EPage } from '@stencil/core/testing';

describe('c-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<c-input></c-input>');

    const element = await page.find('c-input');
    expect(element).toHaveClass('hydrated');
  });
});
