import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../helpers/logger';

export class DashboardPage extends BasePage {
  readonly welcomeMessage = this.page.locator('text=Welcome User');
  readonly menuButton = this.page.getByRole('button').first();
  readonly menuLink = this.page.getByRole('link', { name: /menu/i });
  readonly dashboardTitle = this.page.locator('h4');

  async verifyWelcomeMessage(userName: string) {
    Logger.info(`Verifying welcome message for user: ${userName}`);
    await expect(this.welcomeMessage).toContainText(`Welcome ${userName}`);
  }

  async verifyDashboardTitle(title: string) {
    Logger.info(`Verifying dashboard title: ${title}`);
    await expect(this.dashboardTitle).toContainText(title);
  }

  async openMenu() {
    Logger.info(`Opening menu`);
    await this.click(this.menuButton, 'Menu button');
  }

  async clickMenuLink() {
    Logger.info(`Clicking menu link`);
    await this.click(this.menuLink, 'Menu link');
  }

  async verifyDashboardLoaded() {
    Logger.info(`Verifying dashboard is loaded`);
    await this.waitForLoadState('domcontentloaded');
    await expect(this.welcomeMessage).toBeVisible();
  }
}
