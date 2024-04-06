import { test, expect } from '@playwright/test';


test('Programming Blog Link Renders', async ({ page }) => {
  await page.goto('http://localhost:3000/WorkSearchApp');
  await page.waitForTimeout(1000);

  await page.getByLabel('text', { name: 'Programming Blogs' }).click();

  const locator = page.getByRole('link', { name: 'Make Your Own JavaScriptLoader loader.jpg Creating your own loader in webpack allows you to customize the transformation or processing of specific types of files during the build process. Here\'s an overview of how you can create your own loader: Set up a n' })

  await page.waitForTimeout(5000);


  await expect(locator).toContainText(`Creating your own loader in webpack allows you to customize the transformation or processing of specific types of files during the build process. Here's an overview of how you can create your own loader:`);
});