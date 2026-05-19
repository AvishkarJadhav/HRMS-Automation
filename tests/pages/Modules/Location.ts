import { Locator, Page , expect } from "@playwright/test";
import { BasePage } from "../BasePage";     
import { Logger } from "../../helpers/logger";
import { config } from "../../helpers/config";

export class LocationPage extends BasePage { 
 readonly AddLocationHeading = this.page.getByRole('heading', { name: 'Location' });
    
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

async fillLocationForm(
    organizationName: string,
    branchLocationName: string,
    code: string,
    locationType: string,
    addressLine1: string,
    addressLine2: string,
    landmark: string,
    pincode: string,
    city: string,
    status: string
) {
    Logger.info('Filling out Location form');
    await this.BranchLocationName.fill(branchLocationName);
    await this.Code.fill(code);
    await this.LocationType.click();
    await this.page.getByText(locationType).click();
    await this.AddressLine1.fill(addressLine1);
    await this.AddressLine2.fill(addressLine2);
    await this.Landmark.fill(landmark);
    await this.Pincode.fill(pincode);
    await this.City.click();
    await this.page.getByText(city).click();
    await this.Status.click();
    await this.page.getByText(status).click();
} 

async FillOrgName(OrgDetails: { organizationName: string }) {
    Logger.info(`Filling text for organization name: ${OrgDetails.organizationName}`);
    await this.page.locator('ng-select').filter({ hasText: /Search Organization/ }).click();
    await this.page.keyboard.type('Groniva');
    await this.page.locator('.ng-option').filter({ hasText: 'Groniva' }).click();


}

async expecttobeVisible() {
    Logger.info('Verifying Location form is visible');
    await expect(this.AddLocationHeading).toBeVisible({ timeout: config.timeout }); 
}

}
