import { Locator, Page , expect } from "@playwright/test";
import { BasePage } from "../BasePage";     
import { Logger } from "../../helpers/logger";
import { config } from "../../helpers/config";





export class OrganizationPage extends BasePage {
 readonly threedotmenu = this.page.locator('#otherNavLink');
 readonly addbutton = this.page.getByRole('button', { name: ' Add' });
 readonly organizationNameInput = this.page.getByRole('textbox', { name: 'Organization Name*' });
 readonly shortNameInput = this.page.getByRole('textbox', { name: 'Short Name*' });
 readonly codeInput = this.page.getByRole('textbox', { name: 'Code*' });
 readonly legalTypeDropdown = this.page.locator('div').filter({ hasText: /^Select Legal Type$/ }).first();
 readonly industryTypeDropdown = this.page.locator('div').filter({ hasText: /^Select Industry Type$/ }).first();
 readonly statusDropdown = this.page.locator('div').filter({ hasText: /^Select Status$/ }).first();
 readonly shortDescriptionInput = this.page.getByRole('textbox', { name: 'Short Description' });
 readonly resetButton = this.page.getByRole('button', { name: 'Reset' });
 readonly saveButton = this.page.getByRole('button', { name: 'Save' });


 async clickThreedotMenu() {
    Logger.info(`Clicking three dot menu`);
    await this.click(this.threedotmenu, 'Three Dot Menu');
 }

 async clickAddButton() {
    Logger.info(`Clicking Add button`);
    await this.click(this.addbutton, 'Add Button'); 
 }

 async fillOrganizationForm(name: string, shortName: string, code: string) {
    Logger.info(`Filling organization form with name: ${name}, shortName: ${shortName}, code: ${code}`);
    await this.fillText(this.organizationNameInput, name, 'Organization Name');
    await this.fillText(this.shortNameInput, shortName, 'Short Name');
    await this.fillText(this.codeInput, code, 'Code');
 }

 async selectLegalType(legalType: string) {
    Logger.info(`Selecting legal type: ${legalType}`);
    await this.click(this.legalTypeDropdown, 'Legal Type Dropdown');
    const optionLocator = this.page.locator('div[role="option"]').filter({ hasText: legalType }).first();
    await this.click(optionLocator, `Legal Type Option: ${legalType}`);
 }

 async selectIndustryType(industryType: string) {
    Logger.info(`Selecting industry type: ${industryType}`);
    await this.click(this.industryTypeDropdown, 'Industry Type Dropdown');
    const optionLocator = this.page.locator('div[role="option"]').filter({ hasText: industryType }).first();
    await this.click(optionLocator, `Industry Type Option: ${industryType}`);
 } 
 
   async selectStatus(status: string) {
      Logger.info(`Selecting status: ${status}`);
      await this.click(this.statusDropdown, 'Status Dropdown');
      const optionLocator = this.page.locator('div[role="option"]').filter({ hasText: status }).first();
      await this.click(optionLocator, `Status Option: ${status}`);
   
   }

   async clickResetButton() {
    Logger.info(`Clicking Reset button`);
    await this.click(this.resetButton, 'Reset Button');
   }

   async clickSaveButton() {
    Logger.info(`Clicking Save button`);
    await this.click(this.saveButton, 'Save Button');
   }
 }
