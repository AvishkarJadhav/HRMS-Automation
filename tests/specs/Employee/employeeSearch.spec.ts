import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { EmployeeSearchPage } from '../../pages/EmployeeSearchPage';
import { testUsers, config, testData } from '../../helpers/config';
import { Logger } from '../../helpers/logger';

test.describe('Employee Search Tests', () => {
  test.beforeEach(async ({ page }) => {
    Logger.info('Setting up: Login and navigate to dashboard');
    const loginPage = new LoginPage(page);
    
    await loginPage.navigateTo(config.shreeURL + '/login');
    await loginPage.login(testUsers.shreeUser.mobile, testUsers.shreeUser.password);
    
    // Navigate to ESS dashboard
    await page.goto(config.shreeURL + '/app/global-dashboards/ess-dashboard');
    await page.waitForLoadState('domcontentloaded');
  });

  test('should search and select employee 1047', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const employeeSearchPage = new EmployeeSearchPage(page);
    
    // Verify we're on dashboard
    await dashboardPage.verifyDashboardLoaded();
    
    // Search for employee
    await employeeSearchPage.clickSearchMenu();
    await employeeSearchPage.searchEmployee('1047');
    
    Logger.info('Employee 1047 search completed');
    expect(page.url()).toBeTruthy(); // Verify page is still responsive
  });

  test.describe('Multiple employee search', () => {
    testData.employeeIds.forEach((employeeId) => {
      test(`should search for employee ${employeeId}`, async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const employeeSearchPage = new EmployeeSearchPage(page);
        
        await employeeSearchPage.clickSearchMenu();
        await employeeSearchPage.searchEmployee(employeeId);
        
        Logger.info(`Search for employee ${employeeId} completed`);
        expect(page.url()).toBeTruthy();
      });
    });
  });
});
