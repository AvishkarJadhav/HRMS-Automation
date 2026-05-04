import { Page , expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Logger } from "../helpers/logger";

export class LogOutPage extends BasePage {
    readonly profileMenu = this.page.getByRole('button', { name: /profile/i });
    readonly logoutButton = this.page.getByRole('button', { name: /logout/i });


    async clickProfileMenu() {
        Logger.info(`Clicking profile menu`);
        await this.click(this.profileMenu, 'Profile Menu');
    }


    async clickLogout() {  
        Logger.info(`Clicking logout button`);
        await this.click(this.logoutButton, 'Logout Button');
    }


}
