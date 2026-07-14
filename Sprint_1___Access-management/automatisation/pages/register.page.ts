import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class RegisterPage extends BasePage {
  readonly firstnameInput: Locator;
  readonly lastnameInput: Locator;
  readonly birthdateInput: Locator;
  readonly countrySelect: Locator;
  readonly postalcodeInput: Locator;
  readonly streetnumberInput: Locator;
  readonly streetnameInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly phonenumberInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstnameInput = page.getByPlaceholder('Prénom *');
    this.lastnameInput = page.getByPlaceholder('Votre nom de famille *');
    this.birthdateInput = page.getByPlaceholder('YYYY-MM-DD');
    this.countrySelect = page.getByRole('combobox');
    this.postalcodeInput = page.getByPlaceholder('Votre code postal *');
    this.streetnumberInput = page.getByPlaceholder('ex. 42 *');
    this.streetnameInput = page.getByPlaceholder('Votre rue *');
    this.cityInput = page.getByPlaceholder('Votre ville *');
    this.stateInput = page.getByPlaceholder('Votre état *');
    this.phonenumberInput = page.getByPlaceholder('Votre téléphone *');
    this.emailInput = page.getByPlaceholder('Votre email *');
    this.passwordInput = page.getByPlaceholder('Votre mot de passe');
    this.submitButton = page.locator('[data-test="register-submit"]');
  }

  // Method to fill the registration form with provided data in one go
  async fillForm(data: {
    firstname: string;
    lastname: string;
    birthdate: string;
    country: string;
    postalcode: string;
    streetnumber: string;
    streetname: string;
    city: string;
    state: string;
    phonenumber: string;
    email: string;
    password: string;
  }): Promise<void> {
    await this.firstnameInput.fill(data.firstname);
    await this.lastnameInput.fill(data.lastname);
    await this.birthdateInput.fill(data.birthdate);
    await this.countrySelect.selectOption(data.country);
    await this.postalcodeInput.fill(data.postalcode);
    await this.streetnumberInput.fill(data.streetnumber);
    await this.streetnameInput.fill(data.streetname);
    await this.cityInput.fill(data.city);
    await this.stateInput.fill(data.state);
    await this.phonenumberInput.fill(data.phonenumber);
    await this.emailInput.fill(data.email);
    await this.passwordInput.fill(data.password);
    await this.submitButton.click();
  }
}