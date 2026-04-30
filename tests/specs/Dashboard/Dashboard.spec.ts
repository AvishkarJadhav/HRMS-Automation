import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../pages/DashboardPage';
import { config } from '../../helpers/config';
import { Logger } from '../../helpers/logger';


test.describe('Dashboard Tests', () => {
  test.beforeEach(async ({ page }) => {
    Logger.info('Navigating to login page');
    await page.goto(config.shreeURL + '/login');
  });


});