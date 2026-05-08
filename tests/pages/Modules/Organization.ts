import { Page , expect } from "@playwright/test";
import { BasePage } from "../BasePage";     
import { Logger } from "../../helpers/logger";

export class OrganizationPage extends BasePage {
 readonly threedotmenu = this.page.locator('#otherNavLink');
 readonly addbutton = this.page.getByRole('button', { name: ' Add' });
 readonly organizationNameInput = this.page.getByRole('textbox', { name: 'Organization Name*' });
 readonly shortNameInput = this.page.getByRole('textbox', { name: 'Short Name*' });
 readonly codeInput = this.page.getByRole('textbox', { name: 'Code*' });
 readonly legalTypeDropdown = this.page.locator('div').filter({ hasText: /^Select Legal Type$/ }).first();
 readonly industryTypeDropdown = this.page.locator('div').filter({ hasText: /^Select Industry Type$/ }).first();
 readonly shortDescriptionInput = this.page.getByRole('textbox', { name: 'Short Description' });
 readonly saveButton = this.page.getByRole('button', { name: 'Save' });


 async clickThreedotMenu() {
    Logger.info(`Clicking three dot menu`);
    await this.click(this.threedotmenu, 'Three Dot Menu');
 }

 async clickAddButton() {
    Logger.info(`Clicking Add button`);
    await this.click(this.addbutton, 'Add Button'); 
 }
}
