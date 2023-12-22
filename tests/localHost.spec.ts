// reference https://playwright.dev/docs/writing-tests

//good commands:
//  npx playwright test --headed
// npx playwright test
//npx playwright test --ui


// To run a single test file pass in the name of the test file that you want to run.

// npx playwright test landing-page.spec.ts

//npx playwright codegen to find elements

import { test, expect } from '@playwright/test';

test('First Programming Blog Renders', async ({ page }) => {
  await page.goto('https://malcmind.com/ProgrammingBlogs');
  await page.waitForTimeout(1000);

  await page.getByRole('link', { name: 'Make Your Own' }).click();
  await page.waitForTimeout(1000);

  await expect(page.getByText('Creating your own loader in')).toBeVisible();
});