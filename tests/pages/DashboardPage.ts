import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../helpers/logger';

export class DashboardPage extends BasePage {
  [x: string]: any;
  readonly welcomeMessage = this.page.locator('text=/Welcome .*/');
  readonly menuButton = this.page.getByRole('button').first();
  readonly menuLink = this.page.getByRole('link', { name: /menu/i });
  readonly dashboardTitle = this.page.locator('role=heading[level=4]');
  readonly sidebarMenu = this.page.locator("//div[@id='sidebar-menu']");

  
  // ng-select dropdown panel locators
  readonly menuSearchInput = this.page.locator('ng-select.user-search1 input[role="combobox"]');
  readonly menuSearchDropdownPanel = this.page.locator('ng-select.user-search1 [role="listbox"]');
  readonly menuSearchOptions = this.page.locator('ng-select.user-search1 [role="option"]:not(.ng-option-disabled)');
  readonly noDataFoundMessage = this.page.locator('ng-select.user-search1 .ng-option-disabled').first();
  
  async verifyWelcomeMessage(userName: string) {
    Logger.info(`Verifying welcome message for user: ${userName}`);
    await expect(this.welcomeMessage).toContainText(`Welcome ${userName}`);
  }

  async verifyDashboardTitle(title: string) {
    Logger.info(`Verifying dashboard title: ${title}`);
    await expect(this.dashboardTitle).toContainText(title);
  }

  async verifySidebarMenu() {
    Logger.info(`Verifying sidebar menu is visible`);
    await expect(this.sidebarMenu).toBeVisible();
  }

  async clicktoverifysidebarMenu() {
    Logger.info(`Clicking to verify sidebar menu`);
    await this.click(this.sidebarMenu, 'Sidebar menu');
    await expect(this.sidebarMenu).toBeVisible();
  }

  async openMenu() {
    Logger.info(`Opening menu`);
    await this.click(this.menuButton, 'Menu button');
  }

  async clickMenuLink() {
    Logger.info(`Clicking menu link`);
    await this.click(this.menuLink, 'Menu link');
  }
  
  async searchInMenu(query: string) {
    Logger.info(`Searching in menu for: ${query}`);
    
    if (query.length < 2) {
      Logger.info(`Query is less than 2 characters, expanding to show message`);
    }
    
    // Click the input to focus and open dropdown
    await this.click(this.menuSearchInput, 'Menu search input');
    
    // Clear any existing text
    await this.menuSearchInput.clear();
    
    // Type the search query
    await this.menuSearchInput.type(query, { delay: 50 });
    
    Logger.info(`Typed "${query}" in menu search`);
    
    // Wait for dropdown panel to be visible
    await this.waitForElement(this.menuSearchDropdownPanel, 5000);
    
    Logger.info(`Dropdown panel is now visible`);
  }

  async selectMenuResult(resultText: string) {
    Logger.info(`Selecting menu result: ${resultText}`);
    
    // Find the specific option by text
    const option = this.menuSearchOptions.locator(`text=${resultText}`).first();
    await this.waitForElement(option);
    await this.click(option, `Menu result: ${resultText}`);
  }

  async verifyNoDataFound() {
    Logger.info(`Verifying no data found message`);
    await expect(this.noDataFoundMessage).toBeVisible();
  }

  async verifySearchResultsAppear() {
    Logger.info(`Verifying search results appear`);
    // Make sure dropdown is visible first
    await expect(this.menuSearchDropdownPanel).toBeVisible();
    const resultsCount = await this.menuSearchOptions.count();
    Logger.info(`Found ${resultsCount} search results`);
    return resultsCount > 0;
  }

  async verifyDashboardLoaded() {
    Logger.info(`Verifying dashboard is loaded`);
    await this.waitForLoadState('domcontentloaded');
    await expect(this.welcomeMessage).toBeVisible();
  }
}
