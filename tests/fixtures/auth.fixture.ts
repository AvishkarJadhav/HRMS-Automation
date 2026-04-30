import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { config, testUsers } from '../helpers/config';
import { Logger } from '../helpers/logger';

type CustomFixtures = {
  authenticatedPage: Page;
  shreeAuthenticatedPage: Page;
};

import { Page } from '@playwright/test';

export const test = base.extend<CustomFixtures>({
  authenticatedPage: async ({ page }, use) => {
    Logger.info('Setting up authenticated session');
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo(config.shreeURL + '/login');
    await loginPage.login(testUsers.testUser.email, testUsers.testUser.password);
    Logger.success('User authenticated successfully');
    await use(page);
  },

  shreeAuthenticatedPage: async ({ page }, use) => {
    Logger.info('Setting up Shree authenticated session');
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo(config.shreeURL + '/login');
    await loginPage.login(testUsers.shreeUser.email, testUsers.shreeUser.password);
    Logger.success('Shree user authenticated successfully');
    await use(page);
  },
});

export { expect };
