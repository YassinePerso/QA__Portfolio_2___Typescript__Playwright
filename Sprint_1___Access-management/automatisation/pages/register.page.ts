import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export interface RegisterFormData {
  firstname: string;
  lastname: string;
  birthdate: string;
  address: string;
  postcode: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  password: string;
}

export class RegisterPage extends BasePage {
  readonly firstnameInput: Locator;
  readonly lastnameInput: Locator;
  readonly birthdateInput: Locator;
  readonly addressInput: Locator;
  readonly postcodeInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly countrySelect: Locator;
  readonly phoneInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstnameInput = page.locator('[data-test="first-name"]');
    this.lastnameInput = page.locator('[data-test="last-name"]');
    this.birthdateInput = page.locator('[data-test="dob"]');
    this.addressInput = page.locator('[data-test="address"]');
    this.postcodeInput = page.locator('[data-test="postcode"]');
    this.cityInput = page.locator('[data-test="city"]');
    this.stateInput = page.locator('[data-test="state"]');
    this.countrySelect = page.locator('[data-test="country"]');
    this.phoneInput = page.locator('[data-test="phone"]');
    this.emailInput = page.locator('[data-test="email"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.submitButton = page.locator('[data-test="register-submit"]');
  }

 

  async fillForm(data: RegisterFormData): Promise<void> {
    await this.firstnameInput.fill(data.firstname);
    await this.lastnameInput.fill(data.lastname);
    await this.birthdateInput.fill(data.birthdate);
    await this.addressInput.fill(data.address);
    await this.postcodeInput.fill(data.postcode);
    await this.cityInput.fill(data.city);
    await this.stateInput.fill(data.state);
    await this.countrySelect.click();
    await this.countrySelect.selectOption({ label: data.country });
    await this.countrySelect.blur();
    await this.phoneInput.fill(data.phone);
    await this.emailInput.fill(data.email);
    await this.passwordInput.fill(data.password);
    await this.submitButton.click();
  }
}