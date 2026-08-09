import { test, expect, chromium } from '@playwright/test';
import { CataloguePage } from '../../../Sprint_2___Catalogue/automatisation/pages/catalogue.page';
import { CartPage } from '../../../Sprint_3___Panier/automatisation/pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { RegisterPage } from '../../../Sprint_1___Access-management/automatisation/pages/register.page';
import { TEST_USER, URLS } from '../fixtures/test-data';

test.describe('Méthode de paiement', () => {

  let cataloguePage: CataloguePage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeAll(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const registerPage = new RegisterPage(page);

    await registerPage.navigate(URLS.register);
    await registerPage.waitForPageLoad();
    await registerPage.fillForm(TEST_USER);

    try {
      await page.waitForURL(`**${URLS.login}`, { timeout: 10000 });
    } catch {
      console.log('Compte déjà existant -> on continue');
    }

    await browser.close();
  });

  test.beforeEach(async ({ page }) => {
    cataloguePage = new CataloguePage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await cataloguePage.navigate(URLS.catalogue);
    await cataloguePage.waitForPageLoad();
    await cataloguePage.productNames.first().waitFor({ state: 'visible', timeout: 10000 });

    await cataloguePage.productNames.first().click();
    await cataloguePage.page.waitForTimeout(500);
    await cartPage.addToCart();
    await cataloguePage.page.waitForTimeout(500);

    await cartPage.navigate(URLS.cart);
    await cartPage.waitForPageLoad();
    await cartPage.productTitles.first().waitFor({ state: 'visible', timeout: 10000 });

    await cartPage.proceedToCheckoutButton.click();
    await cartPage.page.waitForTimeout(500);

    await checkoutPage.signInAndProceed(TEST_USER.email, TEST_USER.password);
    await checkoutPage.page.waitForTimeout(500);
    await checkoutPage.billingAddressInput.waitFor({ state: 'visible', timeout: 10000 });

    await checkoutPage.fillBillingAddress({
      address: TEST_USER.address,
      city: TEST_USER.city,
      state: TEST_USER.state,
      country: TEST_USER.country,
      postcode: TEST_USER.postcode,
    });
    await checkoutPage.page.waitForTimeout(1000);
    await checkoutPage.proceedToCheckoutStep3.waitFor({ state: 'visible', timeout: 10000 });
    await expect(checkoutPage.proceedToCheckoutStep3).toBeEnabled({ timeout: 10000 });
    await checkoutPage.proceedToCheckoutStep3.click();
    await checkoutPage.page.waitForTimeout(500);
    await checkoutPage.paymentMethodSelect.waitFor({ state: 'visible', timeout: 10000 });
  });

  // TC-009 - Vérifier la présence du select de méthode de paiement
  test('TC-009 - Vérifier la présence du select de méthode de paiement', { tag: '@smoke' }, async () => {
    await expect(checkoutPage.paymentMethodSelect).toBeVisible();
  });

  // TC-010 - Vérifier que toutes les options du select sont valides
  test('TC-010 - Vérifier que toutes les options du select sont valides', { tag: '@regression' }, async () => {
    const optionTexts = await checkoutPage.paymentMethodSelect.locator('option').allTextContents();
    const hasInvalidOption = optionTexts.some(text => /error|errror|missing/i.test(text));

    expect(hasInvalidOption).toBe(false);
  });

  // TC-011 - Sélectionner une méthode de paiement valide
  test('TC-011 - Sélectionner une méthode de paiement valide', { tag: '@smoke' }, async () => {
    const selectedValue = await checkoutPage.selectValidPaymentMethod();
    const currentValue = await checkoutPage.paymentMethodSelect.inputValue();

    expect(currentValue).toBe(selectedValue);
  });

});