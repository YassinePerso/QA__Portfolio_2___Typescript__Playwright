import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ForgotPasswordPage extends BasePage {
  readonly emailInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('[data-test="email"]');
    this.submitButton = page.locator('[data-test="forgot-password-submit"]');
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async clickSubmit(): Promise<void> {
    await this.submitButton.click();
  }

  async requestReset(email: string): Promise<void> {
    await this.fillEmail(email);
    await this.clickSubmit();
  }
}