import { test, expect, chromium } from '@playwright/test';
import { CataloguePage } from '../../../Sprint_2___Catalogue/automatisation/pages/catalogue.page';
import { CartPage } from '../../../Sprint_3___Panier/automatisation/pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { RegisterPage } from '../../../Sprint_1___Access-management/automatisation/pages/register.page';
import { TEST_USER, URLS } from '../fixtures/test-data';

test.describe('Sign In dans le checkout', () => {

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
  });

  // TC-001 - Vérifier que la section Sign In est accessible depuis le checkout
  test('TC-001 - Vérifier que la section Sign In est accessible depuis le checkout', { tag: '@smoke' }, async () => {
    await expect(checkoutPage.signInEmailInput).toBeVisible();
    await expect(checkoutPage.signInPasswordInput).toBeVisible();
    await expect(checkoutPage.loginSubmitButton).toBeVisible();
  });

  // TC-002 - Login avec credentials valides (accès vers Billing Address)
  test('TC-002 - Login avec credentials valides (accès vers Billing Address)', { tag: '@smoke' }, async () => {
    await checkoutPage.signInAndProceed(TEST_USER.email, TEST_USER.password);
    await checkoutPage.page.waitForTimeout(500);

    await expect(checkoutPage.billingAddressInput).toBeVisible();
  });

  // TC-003 - Login avec credentials invalides
  test('TC-003 - Login avec credentials invalides', { tag: '@regression' }, async () => {
    await checkoutPage.signIn(TEST_USER.email, 'MauvaisMdp!999');
    await checkoutPage.page.waitForTimeout(500);

    await expect(checkoutPage.loginErrorMessage).toBeVisible();
    await expect(checkoutPage.loginErrorMessage).toContainText('Invalid email or password');
  });

  // TC-004 - Register depuis le checkout (redirection vers Billing Address)
  test('TC-004 - Register depuis le checkout (redirection vers Billing Address)', { tag: '@regression' }, async ({ page }) => {
    await checkoutPage.registerLink.click();
    await checkoutPage.page.waitForTimeout(500);

    const registerPage = new RegisterPage(page);
    await registerPage.fillForm({
      ...TEST_USER,
      email: `yassine${Date.now()}@test.com`
    });
    await checkoutPage.page.waitForTimeout(500);

    // Résultat attendu > retour dans le parcours checkout, accès à Billing Address
    expect(page.url()).not.toContain('/auth/login');
    await expect(checkoutPage.billingAddressInput).toBeVisible();
  });

});