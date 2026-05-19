import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { DashboardPage } from '../../../pages/DashboardPage';
import { Logger } from '../../../helpers/logger';
import { orgDetails, testUsers } from '../../../helpers/config';
import { TaskSearchPage } from '../../../pages/TaskSearchPage';
import { LocationPage } from '../../../pages/Modules/Location';
import { OrganizationPage } from '../../../pages/Modules/Organization';



test.describe('Add Location Module Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://shree.groniva.net/login');
        const loginPage = new LoginPage(page);
    }); 


    test('should navigate to add location module', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);  
        const taskSearchPage = new TaskSearchPage(page);
        const locationPage = new LocationPage(page);
        const organizationPage = new OrganizationPage(page);

        
            await loginPage.loginwithEmail(testUsers.shreeUser.email, testUsers.shreeUser.password);
            await page.waitForURL(/dashboard|ess-dashboard/, { timeout: 30000 });
            Logger.info('Login successful - dashboard URL confirmed');  
        
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(3500);
            await dashboardPage.verifyDashboardLoaded();
            Logger.info('Dashboard loaded successfully');


            await taskSearchPage.clickSearchMenu();
            await taskSearchPage.searchTask('1028');
            Logger.info('Searched for employee 1028  in menu');

            await taskSearchPage.clickOnLocation();
            Logger.info('Clicked on Location and waited for navigation');


            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(2000);
            const afterClickURL = await page.url();
            expect(afterClickURL).toBeTruthy();
            Logger.info(`Successfully navigated to Location module. Current URL: ${afterClickURL}`);

            await locationPage.expecttobeVisible(); 
            Logger.info('Add Location form is visible');

            await organizationPage.clickThreedotMenu();
            Logger.info('Clicked on three dot menu in Location module');

            await organizationPage.clickAddButton();
            Logger.info('Clicked on Add button in Location module');
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(2000);
            const afterAddClickURL = await page.url();
            expect(afterAddClickURL).toBeTruthy();
            Logger.info(`Successfully navigated after clicking Add button. Current URL: ${afterAddClickURL}`);  

        
            await locationPage.FillOrgName({ organizationName: orgDetails.name });
            Logger.info(`Filled organization name: ${orgDetails.name} in Location form`);   
    });

 });
