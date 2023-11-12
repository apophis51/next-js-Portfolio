// reference https://playwright.dev/docs/writing-tests

//good commands:
//  npx playwright test --headed
// npx playwright test
//npx playwright test --ui


// To run a single test file pass in the name of the test file that you want to run.

// npx playwright test landing-page.spec.ts

//npx playwright codegen to find elements

import { test, expect } from '@playwright/test';


// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });


// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });

