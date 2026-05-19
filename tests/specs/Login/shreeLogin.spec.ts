import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { testUsers, config } from '../../helpers/config';
import { Logger } from '../../helpers/logger';

test.describe('Shree User Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    Logger.info('Navigating to Shree login page');
    await page.goto(config.shreeURL + '/login');
  });

  test('should login Shree user successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.login(testUsers.shreeUser.mobile, testUsers.shreeUser.Mpass);
    
    // Wait for dashboard
    await page.waitForURL(/dashboard|ess-dashboard/, { timeout: 30000 });
    Logger.info('Shree user login successful');
    
    expect(page.url()).toMatch(/dashboard|ess-dashboard/);
  });

  test('should display dashboard after Shree user login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    
    await loginPage.login(testUsers.shreeUser.mobile, testUsers.shreeUser.Mpass);
    await page.waitForURL(/ess-dashboard/, { timeout: 30000 });
    
    await dashboardPage.verifyDashboardTitle('Ess Dashboard');
    Logger.info('Dashboard title verified for Shree user');
  });
});
