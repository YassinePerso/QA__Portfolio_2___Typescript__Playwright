import { test, expect, chromium } from '@playwright/test';
import { CataloguePage } from '../../../Sprint_2___Catalogue/automatisation/pages/catalogue.page';
import { CartPage } from '../../../Sprint_3___Panier/automatisation/pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { RegisterPage } from '../../../Sprint_1___Access-management/automatisation/pages/register.page';
import { TEST_USER, URLS } from '../fixtures/test-data';

test.describe('Billing Address', () => {

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
  });

  // TC-005 - Vérifier la présence des 5 champs obligatoires
  test('TC-005 - Vérifier la présence des 5 champs obligatoires', { tag: '@smoke' }, async () => {
    await expect(checkoutPage.billingAddressInput).toBeVisible();
    await expect(checkoutPage.billingCityInput).toBeVisible();
    await expect(checkoutPage.billingStateInput).toBeVisible();
    await expect(checkoutPage.billingCountryInput).toBeVisible();
    await expect(checkoutPage.billingPostcodeInput).toBeVisible();
  });

  // TC-006 - Vérifier le titre de la section Billing Address
  test('TC-006 - Vérifier le titre de la section Billing Address', { tag: '@regression' }, async ({ page }) => {
    const heading = page.locator('h1, h2, h3', { hasText: /adress|address/i }).first();
    const titleText = (await heading.textContent())?.trim();
    expect(titleText).toBe('Billing Address');
  });

  // TC-007 - Champs obligatoires vides
  test('TC-007 - Champs obligatoires vides', { tag: '@regression' }, async () => {
    await expect(checkoutPage.proceedToCheckoutStep3).toBeDisabled(); // Le bouton est désactivé tant que les champs obligatoires sont vides
  });

  // TC-008 - Formulaire complet (passage vers Payment)
  test('TC-008 - Formulaire complet (passage vers Payment)', { tag: '@smoke' }, async () => {
    await checkoutPage.fillBillingAddress({
      address: TEST_USER.address,
      city: TEST_USER.city,
      state: TEST_USER.state,
      country: TEST_USER.country,
      postcode: TEST_USER.postcode,
    });
    await checkoutPage.proceedToCheckoutStep3.click();
    await checkoutPage.page.waitForTimeout(500);

    await expect(checkoutPage.billingAddressInput).not.toBeVisible();
  });

});