import { newE2EPage } from '@stencil/core/testing';

describe('m-response', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<m-response></m-response>');

    const element = await page.find('m-response');
    expect(element).toHaveClass('hydrated');
  });
});
