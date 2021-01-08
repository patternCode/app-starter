import { newE2EPage } from '@stencil/core/testing';

describe('c-helptext', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<c-helptext></c-helptext>');

    const element = await page.find('c-helptext');
    expect(element).toHaveClass('hydrated');
  });
});
