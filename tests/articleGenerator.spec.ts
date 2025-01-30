import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 800,
    width: 1500
  }
});

test('New User has between 0 and 12 free generations', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  const numberRegex = /\b([0-9]|1[0-2])\b/;

  await expect(page.locator('body')).toContainText(numberRegex);
});


test('New Api key generation works with johnDoe', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByLabel('Email address or username').click();
    await page.getByLabel('Email address or username').fill('johndoe@afakeemail.com');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.getByLabel('Password', { exact: true }).click();
    await page.getByLabel('Password', { exact: true }).fill('123');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.waitForNavigation();
    await page.getByRole('link', { name: 'Web Apps' }).locator('button').click();
    await page.locator('div:nth-child(2) > .card-body > .card-actions > a > .btn').click();
    
    // Generate first API key and get its text content
    await page.getByRole('button', { name: 'Generate New API Key' }).click();
    const firstApiKeyText = await page.locator('body').textContent();
  
    // Generate second API key and get its text content
    await page.getByRole('button', { name: 'Generate New API Key' }).click();
    const secondApiKeyText = await page.locator('body').textContent();
  
    // Check if the texts are different
    await expect(firstApiKeyText).not.toEqual(secondApiKeyText);
  });