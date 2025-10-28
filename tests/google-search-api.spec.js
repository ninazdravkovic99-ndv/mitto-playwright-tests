import { test, expect } from '@playwright/test';

test('Google Custom Search API → click first result → screenshot', async ({ page }) => {

  // ARRANGE
  // Definisani podaci koji će se koristiti u testu i postavke konfiguracije
  const apiKey = 'YOUR_API_KEY';           // Zameni sa svojim stvarnim API key
  const cx = 'YOUR_SEARCH_ENGINE_ID';      // Zameniti sa ID-jem vašeg pretraživača
  const query = 'mitto';
  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}`;

  // ACT
  // 1. Preuzmi rezultate pretrage
  const response = await fetch(url);
  const data = await response.json();

  // 2. Uzmi prbi rezultat (ako postoji)
  const firstResult = data.items?.[0];
  if (!firstResult) {
    console.log('No search results found');
    return;
  }

  const firstResultUrl = firstResult.link;
  const firstResultTitle = firstResult.title;
  console.log('First result:', firstResultTitle, firstResultUrl);

  // 3. Otvori prvi rezultat i uzmi screenshot
  await page.goto(firstResultUrl);
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'mitto_result_api.png', fullPage: true });

  // ASSERT
  // Potvrdi da su očekivani rezultati ispunjeni
  expect(firstResultUrl).toBeTruthy(); // Proveri da li URL postoji
  expect(firstResultTitle).toBeTruthy(); // Proveri da li naslov postoji
  console.log('Screenshot saved as mitto_result_api.png');
});
