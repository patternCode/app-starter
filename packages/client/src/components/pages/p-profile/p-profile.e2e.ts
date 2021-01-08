import { newE2EPage } from '@stencil/core/testing';

describe('p-profile', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<p-profile></p-profile>');

    const element = await page.find('p-profile');
    expect(element).toHaveClass('hydrated');
  });

  it('displays the specified name', async () => {
    const page = await newE2EPage({ url: '/profile/joseph' });

    const element = await page.find('p-profile ion-content p');
    expect(element.textContent).toContain('My name is Joseph.');
  });
});
