import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { testUsers, config } from '../../helpers/config';
import { Logger } from '../../helpers/logger';
import { LogOutPage } from '../../pages/LogOut';

test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    Logger.info('Navigating to login page');
    await page.goto(config.shreeURL + '/login');
  });

  test('should display login page elements', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.verifyLoginPageLoaded();
    Logger.info('Login page verified successfully');
  });

  test('should login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.login(testUsers.shreeUser.mobile, testUsers.shreeUser.password);

    
    await page.waitForURL(/dashboard|ess-dashboard/, { timeout: 30000 });
    Logger.info('Login successful - dashboard URL confirmed');
    
    expect(page.url()).toMatch(/dashboard|ess-dashboard/);
  });

  test('should display welcome message after successful login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.login(testUsers.shreeUser.mobile, testUsers.shreeUser.password);
    await page.waitForURL(/dashboard|ess-dashboard/, { timeout: 30000 });
    await page.waitForLoadState('networkidle');

     // Give the page a moment to render
     await page.waitForTimeout(1000);

    const welcomeLocator = page.locator('text=Welcome Chetan');
    await expect(welcomeLocator).toBeVisible();
    Logger.info('Welcome message displayed');
  });

  test('should login with email ', async ({ page }) => {
    const loginPage = new LoginPage(page);  

    await loginPage.loginwithEmail(testUsers.shreeUser.email, testUsers.shreeUser.password);

    await page.waitForURL(/dashboard|ess-dashboard/, { timeout: 30000 });
    Logger.info('Login with email successful - dashboard URL confirmed');
    expect(page.url()).toMatch(/dashboard|ess-dashboard/);

    await page.goto(config.shreeURL + '/app/global-dashboards/ess-dashboard');

    await page.waitForURL(/dashboard|ess-dashboard/, { timeout: 30000 });
        await page.waitForLoadState('domcontentloaded');
    const welcomeLocator = page.locator('text=Welcome Chetan');
    await expect(welcomeLocator).toBeVisible();
    Logger.info('Welcome message displayed after email login');
    });

  test('verify user logged out after clicking logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginwithEmail(testUsers.shreeUser.email, testUsers.shreeUser.password);
    await page.waitForURL(/dashboard|ess-dashboard/, { timeout: 30000 });
    Logger.info('Login successful - dashboard URL confirmed');  

    // Navigate to ESS dashboard
    await page.waitForTimeout(3500);
    await page.goto(config.shreeURL + '/app/global-dashboards/ess-dashboard');
    await page.waitForLoadState('networkidle');
    Logger.info('Dashboard navigation completed');  

    // Click profile menu and logout
    const logOutPage = new LogOutPage(page);
    await logOutPage.clickProfileMenu();
    await logOutPage.clickLogout();
    await page.waitForURL(/login/, { timeout: 30000 });
    Logger.info('Logout successful - login URL confirmed');

  });


  test('Setup verification', async ({ page }) => {

    // This test is just to verify that the authentication setup is working correctly and that we can use the authenticated state in our tests.

    await page.goto(config.shreeURL + '/app/global-dashboards/ess-dashboard');
    await page.waitForURL(/dashboard|ess-dashboard/, { timeout: 30000 });
    Logger.info('Authenticated navigation successful - dashboard URL confirmed');
    expect(page.url()).toMatch(/dashboard|ess-dashboard/);
  });

});
