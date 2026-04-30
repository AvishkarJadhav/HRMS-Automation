// import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//   await page.goto('https://test.groniva.net/login');
//   await page.getByRole('button').nth(2).click();
//   await page.getByRole('textbox', { name: 'Enter Email Address' }).click();
//   await page.getByRole('textbox', { name: 'Enter Email Address' }).fill('chetank@girdmail.com');
//   await page.getByRole('textbox', { name: 'Password' }).click();
//   await page.waitForTimeout(3000); // Waits for 3 seconds
//   await page.getByRole('textbox', { name: 'Password' }).fill('1');
//   await page.getByRole('button', { name: 'Sign In' }).click();
//   await page.waitForTimeout(3000); // Waits for 3 seconds
//   await page.goto('https://test.groniva.net/app/global-dashboards/ess-dashboard');
//   await page.waitForTimeout(3000); // Waits for 3 seconds
//   await expect(page.locator('app-header')).toContainText('Welcome Chetan');
// });