import { test, expect } from '@playwright/test';
import { CataloguePage } from '../../../Sprint_2___Catalogue/automatisation/pages/catalogue.page';
import { CartPage } from '../pages/cart.page';
import { URLS } from '../fixtures/test-data';

test.describe('Proceed to checkout', () => {

  let cataloguePage: CataloguePage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    cataloguePage = new CataloguePage(page);
    cartPage = new CartPage(page);
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
  });

  // TC-017 - Vérifier la présence du bouton Proceed to checkout
  test('TC-017 - Vérifier la présence du bouton Proceed to checkout', { tag: '@smoke' }, async () => {
    await expect(cartPage.proceedToCheckoutButton).toBeVisible();
  });

  // TC-018 - Cliquer sur Proceed to checkout
  test('TC-018 - Cliquer sur Proceed to checkout', { tag: '@smoke' }, async ({ page }) => {
    await cartPage.proceedToCheckoutButton.click();
    await cartPage.page.waitForTimeout(500);

    await expect(page.locator('[data-test="login-submit"]')).toBeVisible();
  });

});