import test from "@playwright/test";
import { config, testUsers } from "../../../helpers/config";
import { Logger } from "../../../helpers/logger";
import { LoginPage } from "../../../pages/LoginPage";
import { OrganizationPage } from "../../../pages/Modules/Organization";
import { TaskSearchPage } from "../../../pages/TaskSearchPage";
import { DashboardPage } from "../../../pages/DashboardPage";




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
});
});
