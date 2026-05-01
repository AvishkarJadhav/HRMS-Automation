import { test } from '../../fixtures/auth.fixture';
import { expect } from '@playwright/test';
import { DashboardPage } from '../../pages/DashboardPage';
import { config } from '../../helpers/config';
import { Logger } from '../../helpers/logger';

test.describe('Dashboard Tests', () => {
     test.beforeEach(async ({ page }) => {
        Logger.info('Navigating to login page');
        await page.goto(config.shreeURL + '/login');
        Logger.info('Logging in with Shree user credentials');
        await page.fill('input[name="email"]', config.testUser.shreeEmail);
        // await page.fill('input[name="password"]', config.testUser.shreePassword);
        await page.click('button:has-text("Sign In")');
        Logger.info('Login successful, waiting for dashboard to load');
        await page.waitForURL(/dashboard|ess-dashboard/, { timeout: 30000 });
        await page.waitForLoadState('domcontentloaded');
   });

  
});