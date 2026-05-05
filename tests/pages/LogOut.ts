import { Page , expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Logger } from "../helpers/logger";

export class LogOutPage extends BasePage {
    readonly profileMenu = this.page.locator('.media').first();
    readonly logoutButton = this.page.getByRole('button', { name: ' Sign Out' });


    async clickProfileMenu() {
        Logger.info(`Clicking profile menu`);
        await this.click(this.profileMenu, 'Profile Menu');
    }


    async clickLogout() {  
        Logger.info(`Clicking logout button`);
        await this.click(this.logoutButton, 'Logout Button');
    }


}
