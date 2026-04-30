import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../helpers/logger';

export class LoginPage extends BasePage {

  readonly mobileField = this.page.getByPlaceholder('Enter Mobile Number');
  readonly passwordField = this.page.getByRole('textbox', { name: /password/i });
  readonly signInButton = this.page.getByRole('button', { name: /sign in/i });
  readonly emailButton = this.page.getByRole('button').nth(2);
  readonly emailField = this.page.getByRole('textbox', { name: 'Enter Email Address' });

 // readonly MobilePassField = this.page.getByRole('textbox', { name: 'Password' });

  async login(mobile: string, password: string) {
    Logger.info(`Attempting to login with mobile: ${mobile}`);

    await this.fillText(this.mobileField, mobile, 'Mobile field');
    await expect(this.passwordField).toBeVisible({ timeout: 10000 });
    await this.fillText(this.passwordField, password, 'Password field');
    await expect(this.signInButton).toBeEnabled({ timeout: 10000 });
    await this.click(this.signInButton, 'Sign In button');

    Logger.info(`Login initiated`);
  }

    async loginwithEmail(email: string, password: string) {
    Logger.info(`Attempting to login with email: ${email}`);

    await this.click(this.emailButton, 'Email button');
    await this.fillText(this.emailField, email, 'Email field');
    await expect(this.passwordField).toBeVisible({ timeout: 10000 });
    await this.fillText(this.passwordField, password, 'Password field');
    await expect(this.signInButton).toBeEnabled({ timeout: 10000 });
    await this.click(this.signInButton, 'Sign In button');

    Logger.info(`Login initiated`);
  }

  async verifyLoginPageLoaded() {
    Logger.info(`Verifying login page is loaded`);
    await expect(this.mobileField).toBeVisible();
    await expect(this.signInButton).toBeVisible();
  }

  async verifyErrorMessage(errorText: string) {
    Logger.info(`Checking for error message: ${errorText}`);
    const errorLocator = this.page.locator(`text=${errorText}`);
    await expect(errorLocator).toBeVisible();
  }
}
