import { test as setup, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';        // ← ADD THIS
import { LoginPage } from '../pages/LoginPage';
import { testUsers } from '../helpers/config';

dotenv.config();

// Recreate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);  // ← ADD THIS
const __dirname = path.dirname(__filename);          // ← ADD THIS

const authFile = path.join(__dirname, '../../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  const email = testUsers.shreeUser.email;
  const password = testUsers.shreeUser.password;

  // if (!email || !password) {
  //   throw new Error('Missing SHREE_USER_EMAIL or SHREE_USER_PASSWORD in environment variables');
  // }

  fs.mkdirSync(path.dirname(authFile), { recursive: true });

  const loginPage = new LoginPage(page);
  await page.goto('https://shree.groniva.net/login');
  await loginPage.verifyLoginPageLoaded();
  await loginPage.loginwithEmail(testUsers.shreeUser.email, testUsers.shreeUser.password);

  await page.waitForURL(/dashboard|ess-dashboard/, { timeout: 30000 });
  await expect(page).not.toHaveURL(/login/);

  await page.context().storageState({ path: authFile });
  console.log(`Auth state saved to ${authFile}`);
});