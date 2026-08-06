import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class NavbarPage extends BasePage {
  readonly dropdownButton: Locator;
  readonly logoutButton: Locator;


  constructor(page: Page) {
    super(page);
    this.dropdownButton = page.locator('[data-test="nav-user-menu"]');
    this.logoutButton = page.locator('[data-test="nav-sign-out"]');
  }

  async clickDropdown(): Promise<void> {
    await this.dropdownButton.click();
  }

  async clickLogout(): Promise<void> {
    await this.logoutButton.click();
  }

  async logout(): Promise<void> {
    await this.clickDropdown();
    await this.clickLogout();
  }
}