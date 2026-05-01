import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../pages/DashboardPage';
import { config, testUsers } from '../../helpers/config';
import { Logger } from '../../helpers/logger';
import { LoginPage } from '../../pages/LoginPage';
import { time } from 'node:console';

test.describe('Dashboard Tests', () => {
     test.beforeEach(async ({ page }) => {
        Logger.info('Navigating to login page');
        await page.goto(config.shreeURL + '/login');
     });
       
  
  test('should login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.login(testUsers.shreeUser.mobile, testUsers.shreeUser.password);

    
    await page.waitForURL(/dashboard|ess-dashboard/, { timeout: 30000 });
    Logger.info('Login successful - dashboard URL confirmed');
    
    expect(page.url()).toMatch(/dashboard|ess-dashboard/);

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.verifyDashboardLoaded();
    Logger.info('Dashboard loaded successfully');

    await dashboardPage.verifySidebarMenu();
    Logger.info('Sidebar menu is visible');

    await dashboardPage.clicktoverifysidebarMenu();
    Logger.info('Sidebar menu click verified successfully');
   
  });

  test('should search menu with value 1027 and verify dropdown results', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    
    // Login first
    await loginPage.login(testUsers.shreeUser.mobile, testUsers.shreeUser.password);
    await page.waitForURL(/dashboard|ess-dashboard/, { timeout: 30000 });
    Logger.info('Login successful - dashboard URL confirmed');
    
    // Verify dashboard is loaded
    await dashboardPage.verifyDashboardLoaded();
    Logger.info('Dashboard loaded successfully');

    // Search for 1027 in the menu search
    await dashboardPage.searchInMenu('1027');
    Logger.info('Searched for 1027 in menu');

    // Wait for dropdown results to appear
    await page.waitForTimeout(3500);

    // Check if we have results or "No Data Found" message
    const hasResults = await dashboardPage.verifySearchResultsAppear();
    
    if (hasResults) {
      Logger.info('Search results found for 1027');
      // If results exist, verify the dropdown panel is visible and contains options
      await expect(dashboardPage.menuSearchDropdownPanel).toBeVisible();
      const resultCount = await dashboardPage.menuSearchOptions.count();
      Logger.info(`Total search results: ${resultCount}`);
    } else {
      Logger.info('No search results found for 1027');
      // Verify the "No Data Found" message appears
      await dashboardPage.verifyNoDataFound();
      Logger.info('Confirmed: No Data Found message is displayed');
    }
  });

  test('should search menu with organization and verify results appear', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    
    // Login first
    await loginPage.login(testUsers.shreeUser.mobile, testUsers.shreeUser.password);
    await page.waitForURL(/dashboard|ess-dashboard/, { timeout: 30000 });
    
    // Verify dashboard is loaded
    await dashboardPage.verifyDashboardLoaded();
    Logger.info('Dashboard loaded successfully');

    // Open menu and search for organization
    await dashboardPage.openMenu();
    await dashboardPage.clickMenuLink();
    
    // Search for organization
    await dashboardPage.searchInMenu('organization');
    Logger.info('Searched for organization in menu');

    // Wait for results
    await page.waitForTimeout(1500);

    // Verify results appear or no data found
    const hasResults = await dashboardPage.verifySearchResultsAppear();
    Logger.info(`Search returned results: ${hasResults}`);
    
    if (hasResults) {
      // Select the first result if available
      const firstResult = dashboardPage.menuSearchOptions.first();
      const resultText = await firstResult.textContent();
      Logger.info(`Selecting result: ${resultText}`);
      await dashboardPage.selectMenuResult(resultText || 'organization');
    } else {
      // Verify no data found message
      await dashboardPage.verifyNoDataFound();
    }
  });

   
  
// test('should open menu and navigate correctly', async ({ page }) => {
//     const dashboardPage = new DashboardPage(page);
//     await dashboardPage.openMenu();
//     await dashboardPage.clickMenuLink();
//     // add assertion for resulting page
// });
  
   
 
  // test( 'Login and navigate to Dashboard') Logger.info('Logging in with Shree user credentials');
  //       await page.fill('input[name="mobile"]', config.shreeURL);
  //       await page.fill('input[name="password"]', config.shreeURL);
  //       await page.click('button:has-text("Sign In")');
  //       Logger.info('Login successful, waiting for dashboard to load');
  //       await page.waitForURL(/dashboard|ess-dashboard/, { timeout: 30000 });
  //       await page.waitForLoadState('domcontentloaded');
  //  });

  
});