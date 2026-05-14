import test, { Page , expect } from "@playwright/test";
import { OrganizationPage } from "../../../pages/Modules/Organization";
import { LoginPage } from "../../../pages/LoginPage";
import { DashboardPage } from "../../../pages/DashboardPage";
import { testUsers, config } from "../../../helpers/config";
import { Logger } from "../../../helpers/logger";   
import { TaskSearchPage } from "../../../pages/TaskSearchPage";




test.describe('Organization Module Tests', () => {
    test.beforeEach(async ({ page }) => {
        Logger.info('Navigating to login page');
        await page.goto(config.shreeURL + '/login');
        const loginPage = new LoginPage(page);
    });


test('should navigate to organization module', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page); 
    const taskSearchPage = new TaskSearchPage(page); 
    const organizationPage = new OrganizationPage(page);

    await loginPage.loginwithEmail(testUsers.shreeUser.email, testUsers.shreeUser.password);
    await page.waitForURL(/dashboard|ess-dashboard/, { timeout: 30000 });
    Logger.info('Login successful - dashboard URL confirmed');  

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3500);
    await dashboardPage.verifyDashboardLoaded();
    Logger.info('Dashboard loaded successfully');

    await dashboardPage.verifyDashboardLoaded();
    await page.waitForTimeout(500); 
    await taskSearchPage.clickSearchMenu();
    await taskSearchPage.searchTask('1027');
    Logger.info('Searched for employee 1027 in menu'); 
    
    await taskSearchPage.clickOnOrganizationAndWaitForNavigation();
    Logger.info('Clicked on Organization and waited for navigation'); 

    await organizationPage.clickThreedotMenu();
    Logger.info('Clicked on three dot menu in Organization module');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    const afterClickURL = await page.url();
    expect(afterClickURL).toBeTruthy();
    Logger.info(`Successfully navigated after clicking three dot menu. Current URL: ${afterClickURL}`); 

    await organizationPage.clickAddButton();
    Logger.info('Clicked on Add button in Organization module');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    const afterAddClickURL = await page.url();
    expect(afterAddClickURL).toBeTruthy();
    Logger.info(`Successfully navigated after clicking Add button. Current URL: ${afterAddClickURL}`);

    
    
  });



    

});

