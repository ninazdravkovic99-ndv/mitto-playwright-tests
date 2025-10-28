# Mitto Automated Tests

## Overview
This repository contains automated UI tests for the [Mitto](https://mitto.ch/) website using [Playwright](https://playwright.dev/).  
The tests cover key user flows such as Google search, sign-in, sign-up, and verification.  

All tests follow the **AAA (Arrange-Act-Assert) pattern** and include dynamic handling of popups and screenshots for better debugging.

---

## Table of Contents
1. [Google Search Test](#1-google-search-test)
2. [Google Search API Test](#2-google-search-api-test)
3. [Mitto Sign-Up Test](#3-mitto-sign-up-test)
4. [Mitto Sign-In Test](#4-mitto-sign-in-test)
5. [How to Run All Tests](#how-to-run-all-tests)
6. [Notes](#notes)
7. [Additional Notes](#problem-i-ran-into)

---

## 1. Google Search Test

- **File:** `tests/google-search.spec.js`

- **Description:** Search “mitto” on Google and take screenshots of search results.

- **Test Data:**
  - Search Query: `mitto`
  - Screenshot Paths: `mitto_search.png`, `mitto_result.png`

- **Steps:**
  1. Navigate to Google.
  2. Accept cookies if popup appears.
  3. Enter search query.
  4. Submit search.
  5. Pause for manual CAPTCHA if needed.
  6. Take screenshots.

- **Expected Result:** Google search results appear and screenshots are captured.

## 2. Google Search API Test
- **File:** `tests/google-search-api.spec.js`  
- **Description:** Query Google Custom Search API, extract the first result, navigate to it, and take a screenshot.  
- **Test Data:**
  - API Key: `YOUR_API_KEY`
  - Search Engine ID: `YOUR_SEARCH_ENGINE_ID`
  - Search Query: `mitto`
  - Screenshot Path: `mitto_result_api.png`
- **Steps:**
  1. Call Google Custom Search API with query.
  2. Extract first result URL and title.
  3. Navigate to the first result.
  4. Take a screenshot.

- **Expected Result:** First result page loads and screenshot is saved. This is my way to bypass the CAPTCHA, so no manual intervention is required.

## 3. Mitto Sign-Up Test

- **File:** `tests/mitto-signup.spec.js`

- **Description:** Verify new user sign-up flow including email & phone verification and dashboard access.

- **Test Data:**  
  Email, Password, Name, Phone, Company, Role, Integration, Country, Currency

- **Screenshot:** `mitto_signup.png`

- **Steps:**
  1. Open Mitto homepage and accept cookies.
  2. Click "Try for free".
  3. Fill out sign-up form with email, password, and terms agreement.
  4. Fill email and phone verification codes.
  5. Enter personal and company details.
  6. Select integration, country, and currency.
  7. Take a screenshot.
  8. Submit form and verify navigation to dashboard.

- **Expected Result:** User is signed up successfully, dashboard is accessible, screenshot is saved.

## 4. Mitto Sign-In Test

- **File:** `tests/mitto-signin.spec.js`

- **Description:** Verify successful sign-in to Mitto and navigation to the dashboard.

- **Test Data:**
  - Email: `YOUR_EMAIL`
  - Password: `YOUR_PASSWORD`
  - Dashboard URL: `https://dashboard.mitto.ch/home`
  - Screenshot: `mitto_signin.png`

- **Steps:**
  1. Open Mitto homepage.
  2. Accept cookie popup if visible.
  3. Click "Sign in" link.
  4. Fill email and password fields.
  5. Take a screenshot.
  6. Click "Log in".
  7. Assert navigation to dashboard.

- **Expected Result:** User is logged in and screenshot is saved.

## 5. How to Run All Tests

Run all tests headless:
npx playwright test

Run a specific test file in headed mode
npx playwright test tests/mitto-signin.spec.js --headed

## 6. Notes

- Replace placeholders such as `YOUR_EMAIL`, `YOUR_PASSWORD`, `YOUR_API_KEY`, and `YOUR_SEARCH_ENGINE_ID` with real values.
- Screenshots are saved in the project root folder.
- Tests automatically handle cookie popups and optional CAPTCHAs.
- Ensure Playwright is installed and configured:

    npm install -D @playwright/test
    npx playwright install

- Tests follow the AAA pattern for clarity: Arrange → Act → Assert.

## 7. Additional Notes

- Signup Test pokazuje kako sam se ja prijavila, medjutim da bi se bilo ko drugi prijavio i da bi test radio podrazumevalo bi se da vec unapred imaju sve podatke (kodove). Moralo bi da se pauzira testiranje i manuelno popune i izaberu potrebne opcije, a potom da se nastavi testiranje kao za CAPTCHA za Google Search.