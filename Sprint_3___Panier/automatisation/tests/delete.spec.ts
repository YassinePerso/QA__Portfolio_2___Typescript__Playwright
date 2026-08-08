import { test, expect } from '@playwright/test';
import { CataloguePage } from '../../../Sprint_2___Catalogue/automatisation/pages/catalogue.page';
import { CartPage } from '../pages/cart.page';
import { URLS } from '../fixtures/test-data';

test.describe('Suppression panier', () => {

  let cataloguePage: CataloguePage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    cataloguePage = new CataloguePage(page);
    cartPage = new CartPage(page);
    await cataloguePage.navigate(URLS.catalogue);
    await cataloguePage.waitForPageLoad();
    await cataloguePage.productNames.first().waitFor({ state: 'visible', timeout: 10000 });
  });

  // TC-013 - Vérifier la présence du bouton de suppression
  test('TC-013 - Vérifier la présence du bouton de suppression', { tag: '@smoke' }, async () => {
    await cataloguePage.productNames.first().click();
    await cataloguePage.page.waitForTimeout(500);
    await cartPage.addToCart();
    await cataloguePage.page.waitForTimeout(500);

    await cartPage.navigate(URLS.cart);
    await cartPage.waitForPageLoad();
    await cartPage.productTitles.first().waitFor({ state: 'visible', timeout: 10000 });

    await expect(cartPage.deleteButtons.first()).toBeVisible();
  });

  // TC-014 - Supprimer un produit parmi plusieurs
  test('TC-014 - Supprimer un produit parmi plusieurs', { tag: '@regression' }, async () => {
    const firstProductName = (await cataloguePage.productNames.nth(0).textContent())?.trim();

    await cataloguePage.productNames.nth(0).click();
    await cataloguePage.page.waitForTimeout(500);
    await cartPage.addToCart();
    await cataloguePage.page.waitForTimeout(500);

    await cataloguePage.navigate(URLS.catalogue);
    await cataloguePage.waitForPageLoad();
    await cataloguePage.productNames.first().waitFor({ state: 'visible', timeout: 10000 });

    await cataloguePage.productNames.nth(1).click();
    await cataloguePage.page.waitForTimeout(500);
    await cartPage.addToCart();
    await cataloguePage.page.waitForTimeout(500);

    await cartPage.navigate(URLS.cart);
    await cartPage.waitForPageLoad();
    await cartPage.productTitles.first().waitFor({ state: 'visible', timeout: 10000 });

    await cartPage.deleteButtons.first().click();
    await cartPage.page.waitForTimeout(500);

    const titlesAfter = await cartPage.getProductTitlesInCart();
    expect(titlesAfter.some(t => t.trim() === firstProductName)).toBe(false);
  });

  // TC-015 - Total du panier mis à jour après suppression
  test('TC-015 - Total du panier mis à jour après suppression', { tag: '@regression' }, async () => {
    await cataloguePage.productNames.nth(0).click();
    await cataloguePage.page.waitForTimeout(500);
    await cartPage.addToCart();
    await cataloguePage.page.waitForTimeout(500);

    await cataloguePage.navigate(URLS.catalogue);
    await cataloguePage.waitForPageLoad();
    await cataloguePage.productNames.first().waitFor({ state: 'visible', timeout: 10000 });

    await cataloguePage.productNames.nth(1).click();
    await cataloguePage.page.waitForTimeout(500);
    await cartPage.addToCart();
    await cataloguePage.page.waitForTimeout(500);

    await cartPage.navigate(URLS.cart);
    await cartPage.waitForPageLoad();
    await cartPage.productTitles.first().waitFor({ state: 'visible', timeout: 10000 });

    const totalBefore = await cartPage.getCartTotal();

    await cartPage.deleteButtons.first().click();
    await cartPage.page.waitForTimeout(500);

    const totalAfter = await cartPage.getCartTotal();
    expect(totalAfter).toBeLessThan(totalBefore);
  });

  // TC-016 - Supprimer le dernier produit
  test('TC-016 - Supprimer le dernier produit', { tag: '@regression' }, async () => {
    await cataloguePage.productNames.first().click();
    await cataloguePage.page.waitForTimeout(500);
    await cartPage.addToCart();
    await cataloguePage.page.waitForTimeout(500);

    await cartPage.navigate(URLS.cart);
    await cartPage.waitForPageLoad();
    await cartPage.productTitles.first().waitFor({ state: 'visible', timeout: 10000 });

    await cartPage.deleteButtons.first().click();
    await cartPage.page.waitForTimeout(500);

    const remainingProducts = await cartPage.productTitles.count();
    expect(remainingProducts).toBe(0);
  });

});