import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../../Sprint_1___Access-management/automatisation/pages/base.page';

export class CheckoutPage extends BasePage {
  readonly signInEmailInput: Locator;
  readonly signInPasswordInput: Locator;
  readonly loginSubmitButton: Locator;
  readonly loginErrorMessage: Locator;
  readonly registerLink: Locator;
  readonly billingAddressInput: Locator;
  readonly proceedToCheckoutStep2: Locator;
  readonly billingCityInput: Locator;
  readonly billingStateInput: Locator;
  readonly billingCountryInput: Locator;
  readonly billingPostcodeInput: Locator;
  readonly proceedToCheckoutStep3: Locator;
  readonly paymentMethodSelect: Locator;
  readonly accountNameInput: Locator;
  readonly accountNumberInput: Locator;
  readonly finishButton: Locator;
  readonly paymentSuccessMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.signInEmailInput = page.locator('[data-test="email"]');
    this.signInPasswordInput = page.locator('[data-test="password"]');
    this.loginSubmitButton = page.locator('[data-test="login-submit"]');
    // Pas de data-test disponible : ciblage par classe CSS
    this.loginErrorMessage = page.locator('.alert-danger .help-block');
    // Pas de data-test disponible : ciblage par texte
    this.registerLink = page.getByText('Register your account');
    this.billingAddressInput = page.locator('[data-test="address"]');
    this.proceedToCheckoutStep2 = page.locator('[data-test="proceed-2"]');
    this.billingCityInput = page.locator('[data-test="city"]');
    this.billingStateInput = page.locator('[data-test="state"]');
    this.billingCountryInput = page.locator('[data-test="country"]');
    this.billingPostcodeInput = page.locator('[data-test="postcode"]');
    this.proceedToCheckoutStep3 = page.locator('[data-test="proceed-3"]');
    this.paymentMethodSelect = page.locator('[data-test="payment-method"]');
    this.accountNameInput = page.locator('[data-test="account-name"]');
    this.accountNumberInput = page.locator('[data-test="account-number"]');
    this.finishButton = page.locator('[data-test="finish"]');
    // Pas de data-test disponible : ciblage par classe CSS
    this.paymentSuccessMessage = page.locator('.alert-success .help-block');
  }

  async fillBillingAddress(data: { address: string; city: string; state: string; country: string; postcode: string }): Promise<void> {
    await this.billingAddressInput.fill(data.address);
    await this.billingCityInput.fill(data.city);
    await this.billingStateInput.fill(data.state);
    await this.billingCountryInput.fill(data.country);
    await this.billingPostcodeInput.fill(data.postcode);
  }

  // Sélectionne la première méthode de paiement valide (évite l'option
  // invalide connue "Errror 304 - Missing Payment Gateway", BUG-003).
  async selectValidPaymentMethod(): Promise<string> {
    const options = await this.paymentMethodSelect.locator('option').all();
    for (const option of options) {
      const text = (await option.textContent()) ?? '';
      const value = await option.getAttribute('value');
      if (value && !/error|errror|missing/i.test(text)) {
        await this.paymentMethodSelect.selectOption(value);
        return value;
      }
    }
    throw new Error('Aucune méthode de paiement valide trouvée');
  }

  // Après connexion, un message de confirmation s'affiche avec un second
  // bouton "Proceed to checkout" (proceed-2) à cliquer pour accéder à Billing Address.
  async signInAndProceed(email: string, password: string): Promise<void> {
    await this.signIn(email, password);
    await this.page.waitForTimeout(500);
    await this.proceedToCheckoutStep2.click();
  }

  async signIn(email: string, password: string): Promise<void> {
    await this.signInEmailInput.fill(email);
    await this.signInPasswordInput.fill(password);
    await this.loginSubmitButton.click();
  }
}