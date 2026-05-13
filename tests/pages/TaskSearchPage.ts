import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../helpers/logger';

export class TaskSearchPage extends BasePage {
  readonly searchMenuDiv = this.page.locator('div').filter({ hasText: /^Search Menu$/ }).first();
  readonly searchCombobox = this.page.getByRole('combobox').first();
  readonly approvalWorkflow = this.page.locator('div').filter({ hasText: /^Approval Workflow 1050$/ }).nth(5);
  readonly organization = this.page.locator('div').filter({ hasText: /^Organization 1027$/ }).nth(5);
  readonly employeeOnboardingPolicy = this.page.getByRole('option', { name: 'EMPLOYEE Employee Onboarding' });
  readonly location = this.page.locator('div').filter({ hasText: /^Location 1028$/ }).nth(5);

  async clickSearchMenu() {
    Logger.info(`Clicking search menu`);
    await this.click(this.searchMenuDiv, 'Search Menu');
  }

  async searchTask(taskId: string) {
    Logger.info(`Searching for employee: ${taskId}`);
    await this.click(this.searchCombobox, 'Search combobox');
    await this.fillText(this.searchCombobox, taskId, 'Employee ID');
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(1000); // Wait for results
  }

  async selectTask(taskId: string) {
    Logger.info(`Selecting employee: ${taskId}`);
    
    // Wait for the employee option to appear and click it
    const employeeOption = this.page.locator('div').filter({ 
      hasText: new RegExp(`Employee ${taskId}`) 
    }).first();
    
    await this.waitForElement(employeeOption);
    await this.click(employeeOption, `Employee ${taskId}`);
  }

  async searchAndselectTask(taskId: string) {
    Logger.info(`Searching and selecting employee: ${taskId}`);
    await this.searchTask(taskId);
    await this.selectTask(taskId);
  }

  async clickonApprovalWorkflow() {
    Logger.info(`Clicking on Approval Workflow`);
    await this.click(this.approvalWorkflow, 'Approval Workflow 1050');
  }
  async clickonOrganization() {
    Logger.info(`Clicking on Organization`);
    await this.click(this.organization, 'Organization 1027');
    // Wait for the click to trigger navigation
    await this.page.waitForTimeout(1000);
  }

  async clickOnLocation() {
    Logger.info(`Clicking on Location`);
    await this.click(this.location, 'Location 1028');
    // Wait for the click to trigger navigation
    await this.page.waitForTimeout(1000);
  }
  async clickOnEmployeeOnboardingPolicy() {
    Logger.info(`Clicking on Employee Onboarding Policy`);
    const onboardingPolicy = this.page.locator('div').filter({ hasText: /^Employee Onboarding Policy 1117$/ }).nth(5);
    await this.click(onboardingPolicy, 'Employee Onboarding Policy 1117');
    // Wait for the click to trigger navigation
    await this.page.waitForTimeout(1000);
  }
  async clickOnOrganizationAndWaitForNavigation() {
    Logger.info(`Clicking on Organization and waiting for navigation`);
    // Start waiting for navigation before clicking
    const navigationPromise = this.page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {});
    await this.click(this.organization, 'Organization 1027');
    await navigationPromise;
    Logger.info(`Navigation completed after clicking Organization`);
  }
}
