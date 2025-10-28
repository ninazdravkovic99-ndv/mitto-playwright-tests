import { test, expect } from '@playwright/test';

test('Mitto sign in', async ({
    page
}) => {

    // ARRANGE
    // Definisane stalne vrednosti, elementi stranice i podaci koji će se koristiti u testu
    const baseUrl = 'https://mitto.ch/';
    const email = 'ninazdravkovic99@gmail.com';
    const password = 'VelikaSifra123#@';
    const dashboardUrl = 'https://dashboard.mitto.ch/home';
    const screenshotPath = 'mitto_signin.png';

    const acceptCookiesBtn = page.getByRole('button', {
        name: 'Accept'
    });
    const signInLink = page.locator('#menubar-175').getByRole('link', {
        name: 'Sign in'
    });
    const emailField = page.getByRole('textbox', {
        name: 'Email address'
    });
    const passwordField = page.getByRole('textbox', {
        name: 'Password'
    });
    const loginButton = page.getByRole('button', {
        name: 'Log in'
    });

    // ACT
    // 1. Otvori Mitto website
    await page.goto(baseUrl);

    // 2. Prihvati kolacice
    if (await acceptCookiesBtn.isVisible()) {
        await acceptCookiesBtn.click();
    }

    // 3. Klikni Sign-in i popuni signin formu (email + password)
    await signInLink.click();
    await emailField.fill(email);
    await passwordField.fill(password);

    // 4. Screenshot
    await page.screenshot({
        path: screenshotPath,
        fullPage: true
    });

    // 5. Submituj Sing-in
    await loginButton.click();

    // ASSERT
    // Proveri da li je korisnik uspešno preusmeren na kontrolnu tablu
    await expect(page).toHaveURL(dashboardUrl);
    console.log(`Mitto sign-in completed successfully and screenshot saved as mitto_signin.png`);
});