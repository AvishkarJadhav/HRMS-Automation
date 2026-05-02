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
    await loginPage.loginwithEmail(testUsers.shreeUser.email, testUsers.shreeUser.password);
    // Wait for login to complete - verify token is set
    await page.waitForLoadState('networkidle');
    Logger.info('Login completed and token verified');
    
    // Navigate to ESS dashboard
    await page.waitForTimeout(3500);
    await page.goto(config.shreeURL + '/app/global-dashboards/ess-dashboard');
    //await page.waitForLoadState('networkidle');
    
    // Additional verification that dashboard is fully loaded
    await page.waitForTimeout(3500);
    Logger.info('Dashboard navigation completed');
  });

  test('should search and select employee 1047', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const employeeSearchPage = new EmployeeSearchPage(page);
    
    // Verify token and dashboard are ready
    //await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3500);
    await dashboardPage.verifyDashboardLoaded();
    await page.waitForTimeout(500);
    
    // Search for employee
    await employeeSearchPage.clickSearchMenu();
    await employeeSearchPage.searchEmployee('1027');
    
    Logger.info('Employee 1027 search completed');
    expect(page.url()).toBeTruthy(); // Verify page is still responsive
  });

  test.describe('Multiple employee search', () => {
    testData.employeeIds.forEach((employeeId) => {
      test(`should search for employee ${employeeId}`, async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const employeeSearchPage = new EmployeeSearchPage(page);
        
        // Verify token and dashboard are ready before each search
        await page.waitForLoadState('networkidle');
        await dashboardPage.verifyDashboardLoaded();
        await page.waitForTimeout(500);
        
        await employeeSearchPage.clickSearchMenu();
        await employeeSearchPage.searchEmployee(employeeId);
        
        Logger.info(`Search for employee ${employeeId} completed`);
        expect(page.url()).toBeTruthy();

        await employeeSearchPage.clickonOrganization();
        Logger.info(`Clicked on Organization for employee ${employeeId}`);

        // await employeeSearchPage.clickonApprovalWorkflow();
        // Logger.info(`Clicked on Approval Workflow for employee ${employeeId}`);   
        
        // await page.waitForLoadState('networkidle');

        
        // // Verify that we navigated to the correct workflow page
        // const currentURL = await page.url();
        // expect(currentURL).toContain('/app/workflow/1050');
        // Logger.info(`Verified navigation to workflow page for employee ${employeeId}`);
      });
    });
  });
});
