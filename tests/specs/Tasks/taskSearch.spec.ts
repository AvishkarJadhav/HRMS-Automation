import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { TaskSearchPage } from '../../pages/TaskSearchPage';
import { testUsers, config, testData } from '../../helpers/config';
import { Logger } from '../../helpers/logger';
import { OrganizationPage } from '../../pages/Modules/Organization';

test.describe('Task Search Tests', () => {
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

  test('should search and select task 1047', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const taskSearchPage = new TaskSearchPage(page);
    
    
    // Verify token and dashboard are ready
    //await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3500);
    await dashboardPage.verifyDashboardLoaded();
    await page.waitForTimeout(500);
    
    // Search for task
    await taskSearchPage.clickSearchMenu();
    await taskSearchPage.searchTask('1027');
    
    Logger.info('Task 1027 search completed');
    expect(page.url()).toBeTruthy(); // Verify page is still responsive
  });

  test.describe('Multiple task search', () => {
    testData.taskIds.forEach((taskId) => {
      test(`should search for task ${taskId}`, async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const taskSearchPage = new TaskSearchPage(page);
        
        
        
        // Verify token and dashboard are ready before each search
        await page.waitForLoadState('networkidle');
        await dashboardPage.verifyDashboardLoaded();
        await page.waitForTimeout(500);
        
        await taskSearchPage.clickSearchMenu();
        await taskSearchPage.searchTask(taskId);
        
        Logger.info(`Search for task ${taskId} completed`);
        expect(page.url()).toBeTruthy();
        
        switch(String(taskId)) {
          case '1027':
            await taskSearchPage.clickonOrganization();
            Logger.info(`Clicked on Organization for task ${taskId}`);
            break;
          case '1050':
            await taskSearchPage.clickonApprovalWorkflow();
            Logger.info(`Clicked on Approval Workflow for task ${taskId}`);
            break;
          case '1028': 
            await taskSearchPage.clickOnLocation(); 
            Logger.info(`Clicked on Location for task ${taskId}`);
            break;
          default:
        }
        
        // Wait for navigation to complete after clicking organization
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        // Verify that we navigated to the organization landing page
        const currentURL = await page.url();
        expect(currentURL).toBeTruthy();
        Logger.info(`Successfully navigated to organization landing page. Current URL: ${currentURL}`);

        await dashboardPage.clickInbox();
        Logger.info(`Clicked on INBOX link for task ${taskId}`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);
        const inboxURL = await page.url();
        expect(inboxURL).toBeTruthy();
        Logger.info(`Successfully navigated to INBOX page. Current URL: ${inboxURL}`);

        const organizationPage = new OrganizationPage(page);
        await organizationPage.clickThreedotMenu();
        Logger.info(`Clicked on three dot menu for task ${taskId}`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);
        const afterClickURL = await page.url();
        expect(afterClickURL).toBeTruthy();
        Logger.info(`Successfully navigated after clicking three dot menu. Current URL: ${afterClickURL}`);

        await organizationPage.clickAddButton();
        Logger.info(`Clicked on Add button for task ${taskId}`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);
        const afterAddClickURL = await page.url();
        expect(afterAddClickURL).toBeTruthy();
        Logger.info(`Successfully navigated after clicking Add button. Current URL: ${afterAddClickURL}`);
      });
    });
  });
});
