import { Page, Locator, expect } from '@playwright/test';
import { Logger } from '../helpers/logger';
import { config } from '../helpers/config';

export class BasePage {
  constructor(protected page: Page) {}

  async navigateTo(url: string) {
    Logger.info(`Navigating to ${url}`);
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async waitForElement(locator: Locator, timeout: number = config.timeout) {
   // Logger.debug(`Waiting for element to be visible`);
    await locator.waitFor({ state: 'visible', timeout });
  }

  async click(locator: Locator, description: string = 'element') {
    Logger.info(`Clicking on ${description}`);
    await this.waitForElement(locator);
    await locator.click();
  }

  async fillText(locator: Locator, text: string, description: string = 'field') {
    Logger.info(`Filling ${description} with value`);
    await this.waitForElement(locator);
    await locator.clear();
    await locator.fill(text);
  }

  async typeText(locator: Locator, text: string, description: string = 'field') {
    Logger.info(`Typing in ${description}`);
    await this.waitForElement(locator);
    await locator.type(text);
  }

  async getText(locator: Locator): Promise<string> {
    Logger.info(`Getting text from element`);
    await this.waitForElement(locator);
    return await locator.textContent() || '';
  }

  async isVisible(locator: Locator): Promise<boolean> {
    try {
      await this.waitForElement(locator, 5000);
      return true;
    } catch {
      return false;
    }
  }

  async waitForURL(urlPattern: RegExp, timeout: number = config.navigationTimeout) {
    Logger.info(`Waiting for URL to match pattern`);
    await this.page.waitForURL(urlPattern, { timeout });
  }

  async getCurrentURL(): Promise<string> {
    return this.page.url();
  }

  async takeScreenshot(name: string) {
    const fileName = `screenshots/${name}-${Date.now()}.png`;
    Logger.info(`Taking screenshot: ${fileName}`);
    await this.page.screenshot({ path: fileName });
  }

  async waitForLoadState(state: 'load' | 'domcontentloaded' | 'networkidle' = 'domcontentloaded') {
   // Logger.debug(`Waiting for page load state: ${state}`);
    await this.page.waitForLoadState(state);
  }
}
