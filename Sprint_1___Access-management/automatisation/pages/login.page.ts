import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly forgotPasswordLink: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('[data-test="email"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.submitButton = page.locator('[data-test="login-submit"]');
    this.forgotPasswordLink = page.locator('[data-test="forgot-password-link"]');
  }

  // Fill email input
  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  // Fill password input
  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }
  
  // Click on submit button
  async clickSubmit(): Promise<void> {
    await this.submitButton.click();
  }

  // Complete login action
  async login(email: string, password: string): Promise<void> {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickSubmit();
  }
}