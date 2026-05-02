// import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//   await page.goto('https://shree.groniva.net/login');
//   await page.getByRole('button').nth(2).click();
//   await page.getByRole('textbox', { name: 'Enter Email Address' }).click();
//   await page.getByRole('textbox', { name: 'Enter Email Address' }).fill('ckoranne89@gmail.com');
//   await page.getByRole('textbox', { name: 'Password' }).click();
//   await page.waitForTimeout(3000); // Waits for 3 seconds
//   await page.getByRole('textbox', { name: 'Password' }).click({
//     modifiers: ['ControlOrMeta']/
    
//   });
//   await page.waitForTimeout(3000); // Waits for 3 seconds
//   await page.getByRole('textbox', { name: 'Password' }).press('ControlOrMeta+c');
//   await page.getByRole('textbox', { name: 'Password' }).fill('Shree@123');
//   await page.locator('i').click();
//   await page.locator('i').click();
//   await page.getByRole('button', { name: 'Sign In' }).click();
//   await page.waitForTimeout(3000); // Waits for 3 seconds
//   await page.goto('https://shree.groniva.net/app/global-dashboards/ess-dashboard');
//   await expect(page.locator('h4')).toContainText('Ess Dashboard');
// });