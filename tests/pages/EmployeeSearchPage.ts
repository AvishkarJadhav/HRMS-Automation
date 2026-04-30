import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../helpers/logger';

export class EmployeeSearchPage extends BasePage {
  readonly searchMenuDiv = this.page.locator('div').filter({ hasText: /^Search Menu$/ }).first();
  readonly searchCombobox = this.page.getByRole('combobox').first();
  
  async clickSearchMenu() {
    Logger.info(`Clicking search menu`);
    await this.click(this.searchMenuDiv, 'Search Menu');
  }

  async searchEmployee(employeeId: string) {
    Logger.info(`Searching for employee: ${employeeId}`);
    await this.click(this.searchCombobox, 'Search combobox');
    await this.fillText(this.searchCombobox, employeeId, 'Employee ID');
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(1000); // Wait for results
  }

  async selectEmployee(employeeId: string) {
    Logger.info(`Selecting employee: ${employeeId}`);
    
    // Wait for the employee option to appear and click it
    const employeeOption = this.page.locator('div').filter({ 
      hasText: new RegExp(`Employee ${employeeId}`) 
    }).first();
    
    await this.waitForElement(employeeOption);
    await this.click(employeeOption, `Employee ${employeeId}`);
  }

  async searchAndSelectEmployee(employeeId: string) {
    Logger.info(`Searching and selecting employee: ${employeeId}`);
    await this.searchEmployee(employeeId);
    await this.selectEmployee(employeeId);
  }
}
