import { test, expect } from '@playwright/test';

test('Google search for mitto', async ({ page }) => {
  // ARRANGE
  // Definiši podatke i elemente stranice (selektore) koji će biti korišćeni tokom testiranja
  const googleUrl = 'https://www.google.com';
  const searchQuery = 'mitto';
  const searchBoxSelector = '#APjFqb';
  const cookieAcceptButton = page.locator('button', { hasText: /accept|agree/i });

  // ACT
  // 1. Otovori Google stranicu
  await page.goto(googleUrl);

  // 2. Prihvati kolacice (ako se pojavi popup)
  if (await cookieAcceptButton.isVisible()) {
    await cookieAcceptButton.click();
  }

  // 3. Unesi upit za pretragu
  const searchBox = page.locator(searchBoxSelector);
  await searchBox.fill(searchQuery);

  // 4. Screenshot pre pretrage
  await page.screenshot({ path: 'mitto_search.png', fullPage: true });

  // 5. Pokreni pretragu
  await searchBox.press('Enter');

  // 6. Zaustavi test da bi se ručno rešili CAPTCHA, ukoliko je potrebno
  await page.pause();

  // 7. Screenshot nakon pretrage
  await page.screenshot({ path: 'mitto_result.png', fullPage: true });

  // ASSERT
  // Potvrdi da search box i dalje sadrzi upit
  await expect(searchBox).toHaveValue(searchQuery);

  // Po želji proveri vidljivost rezultata
  const results = page.locator('h3'); // uobičajeni naslovi rezultata pretrage na Google-u
  await expect(results.first()).toBeVisible();

  console.log('Screenshots saved: mitto_search.png, mitto_result.png');
});
