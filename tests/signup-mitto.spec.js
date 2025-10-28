import { test, expect } from '@playwright/test';

test('Mitto signup', async ({ page }) => {

  // ARRANGE
  // Definisane stalne vrednosti, elementi stranice i podaci koji će se koristiti u testu
  const baseUrl = 'https://mitto.ch/';
  const email = 'YOUR_EMAIL';
  const password = 'YOUR_PASSWORD';
  const phoneNumber = 'YOUR_NUMBER';
  const emailVerificationCode = 'CODE_E';
  const phoneVerificationCode = 'CODE_P';
  const firstName = 'NAME';
  const lastName = 'LAST_NAME';
  const companyName = 'COMPANY';
  const country = 'COUNTRY';
  const currency = 'CURRENCY';
  const integration = 'INTEGRATION';
  const role = 'ROLE';
  const department = 'DEPARTMENT';

  const acceptCookiesBtn = page.getByRole('button', { name: 'Accept' });

  // ACT
  // 1. Otvori Mitto website i prihvati kolacice
  await page.goto(baseUrl);
  
  if (await acceptCookiesBtn.isVisible()) {
    await acceptCookiesBtn.click();
  }

  // 2. Klikni “Try for free”
  await page.locator('#menubar-175').getByRole('link', { name: 'Try for free' }).click();

  // 3. Popuni signup formu (email + password)
  await page.getByRole('textbox', { name: 'Email address' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('checkbox', { name: "I agree to Mitto's Terms &" }).check();

  // 4. Submituj signup formu
  await page.getByRole('button', { name: 'Sign up' }).click();

  // 5. Email verifikacija
  await page.getByRole('spinbutton', { name: 'Verification code' }).fill(emailVerificationCode);
  await page.getByRole('button', { name: 'Verify' }).click();

  // 6. Dodaj i potvrdi broj telefona
  await page.getByRole('button').filter({ hasText: '+' }).click();
  await page.getByRole('textbox', { name: 'Search' }).click();
  await page.getByRole('menuitem', { name: 'Serbia (Србија) +' }).click();
  await page.locator('#mat-input-3').fill(phoneNumber);
  await page.getByRole('button', { name: 'Send Code' }).click();
  await page.getByRole('textbox', { name: 'Verification code' }).fill(phoneVerificationCode);
  await page.getByRole('button', { name: 'Verify' }).click();

  // 7. Popuni informacije o profilu
  await page.getByRole('textbox', { name: 'First name' }).fill(firstName);
  await page.getByRole('textbox', { name: 'Last name' }).fill(lastName);
  await page.getByRole('combobox', { name: /Integration/i }).click();
  await page.getByRole('option', { name: integration }).click();
  await page.getByLabel('Country').getByText('Country').click();
  await page.getByRole('option', { name: country }).click();
  await page.getByLabel('Currency').getByText('Currency').click();
  await page.getByRole('option', { name: currency }).click();
  await page.getByRole('textbox', { name: 'Company name' }).fill(companyName);
  await page.getByLabel('Your role').getByText('Your role').click();
  await page.getByRole('option', { name: role }).click();
  await page.getByText(department).click();

  // 8. Screenshot pre zavrsetka
  await page.screenshot({ path: 'mitto_signup.png', fullPage: true });

  // 9. Submituj profile setup
  await page.getByRole('button', { name: "Let's get started" }).click();

  // ASSERT
  // Proveri da li je korisnik uspešno preusmeren na kontrolnu tablu
  await expect(page).toHaveURL('https://dashboard.mitto.ch/home');
  console.log('Mitto signup completed successfully and screenshot saved as mitto_signup.png');
});
