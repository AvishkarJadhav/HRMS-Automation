import { Locator, Page , expect } from "@playwright/test";
import { BasePage } from "../BasePage";     
import { Logger } from "../../helpers/logger";
import { config } from "../../helpers/config";

export class LocationPage extends BasePage { 
    
readonly OrganizationName =this.page.locator('div').filter({ hasText: /^Search Organization$/ }).first();
readonly BranchLocationName = this.page.getByRole('textbox', { name: 'Branch/Location Name*' });
readonly Code = this.page.getByRole('textbox', { name: 'Code*', exact: true });
readonly LocationType = this.page.locator('div').filter({ hasText: /^Search Type$/ }).first();
readonly AddressLine1 = this.page.getByRole('textbox', { name: 'Address Line-1*' });
readonly AddressLine2 = this.page.getByRole('textbox', { name: 'Address Line-2' });
readonly Landmark = this.page.getByRole('textbox', { name: 'Landmark' });
readonly Pincode = this.page.getByRole('textbox', { name: 'Pincode*' });
readonly City = this.page.locator('div').filter({ hasText: /^Search City$/ }).first();
readonly Status = this.page.locator('div').filter({ hasText: /^Select Status$/ }).first();

readonly ResetButton = this.page.getByRole('button', { name: 'Reset' });
readonly SaveButton = this.page.getByRole('button', { name: 'Save' });


async SelectOrganization(organizationName: string) {
    Logger.info(`Selecting organization: ${organizationName}`);
    await this.click(this.OrganizationName, 'Organization Name Dropdown');
    const optionLocator = this.page.locator('div[role="option"]').filter({ hasText: organizationName }).first();
    await this.click(optionLocator, `Organization Option: ${organizationName}`);
}


async fillBranchLocationName(branchLocationName: string) {
    await this.fillText(this.BranchLocationName, branchLocationName, 'Branch/Location Name');


}

}
