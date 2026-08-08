import { test, expect } from '@playwright/test';
import { CataloguePage } from '../../../Sprint_2___Catalogue/automatisation/pages/catalogue.page';
import { CartPage } from '../pages/cart.page';
import { URLS } from '../fixtures/test-data';

test.describe('Total panier', () => {

  let cataloguePage: CataloguePage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    cataloguePage = new CataloguePage(page);
    cartPage = new CartPage(page);
    await cataloguePage.navigate(URLS.catalogue);
    await cataloguePage.waitForPageLoad();
    await cataloguePage.productNames.first().waitFor({ state: 'visible', timeout: 10000 });
  });

  // TC-010 - Total par ligne correct (prix × quantité initiale)
  test('TC-010 - Total par ligne correct (prix × quantité initiale)', { tag: '@regression' }, async () => {
    const unitPrices = await cataloguePage.getProductPrices();
    const unitPrice = unitPrices[0];

    await cataloguePage.productNames.first().click();
    await cataloguePage.page.waitForTimeout(500);
    await cartPage.addToCart();
    await cataloguePage.page.waitForTimeout(500);

    await cartPage.navigate(URLS.cart);
    await cartPage.waitForPageLoad();
    await cartPage.linePrices.first().waitFor({ state: 'visible', timeout: 10000 });

    const linePrices = await cartPage.getLinePrices();
    // Quantité initiale = 1, donc le total de ligne doit égaler le prix unitaire
    expect(linePrices[0]).toBeCloseTo(unitPrice, 2);
  });

  // TC-011 - Modifier la quantité (total par ligne mis à jour)
  test('TC-011 - Modifier la quantité (total par ligne mis à jour)', { tag: '@regression' }, async () => {
    const unitPrices = await cataloguePage.getProductPrices();
    const unitPrice = unitPrices[0];

    await cataloguePage.productNames.first().click();
    await cataloguePage.page.waitForTimeout(500);
    await cartPage.addToCart();
    await cataloguePage.page.waitForTimeout(500);

    await cartPage.navigate(URLS.cart);
    await cartPage.waitForPageLoad();
    await cartPage.productQuantities.first().waitFor({ state: 'visible', timeout: 10000 });

    await cartPage.productQuantities.first().fill('3');
    await cartPage.productQuantities.first().press('Tab');
    await cartPage.page.waitForTimeout(500);

    const linePrices = await cartPage.getLinePrices();
    expect(linePrices[0]).toBeCloseTo(unitPrice * 3, 2);
  });

  // TC-012 - Total général = somme de tous les totaux par ligne
  test('TC-012 - Total général = somme de tous les totaux par ligne', { tag: '@regression' }, async () => {
    // Ajoute deux produits différents pour avoir plusieurs lignes
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
    await cartPage.linePrices.first().waitFor({ state: 'visible', timeout: 10000 });

    const linePrices = await cartPage.getLinePrices();
    const sumOfLines = linePrices.reduce((sum, price) => sum + price, 0);
    const total = await cartPage.getCartTotal();

    expect(total).toBeCloseTo(sumOfLines, 2);
  });

});