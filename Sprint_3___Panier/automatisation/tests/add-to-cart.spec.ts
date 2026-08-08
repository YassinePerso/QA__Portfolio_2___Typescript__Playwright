import { test, expect } from '@playwright/test';
import { CataloguePage } from '../../../Sprint_2___Catalogue/automatisation/pages/catalogue.page';
import { CartPage } from '../pages/cart.page';
import { URLS } from '../fixtures/test-data';

test.describe('Add to cart', () => {

  let cataloguePage: CataloguePage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    cataloguePage = new CataloguePage(page);
    cartPage = new CartPage(page);
    await cataloguePage.navigate(URLS.catalogue);
    await cataloguePage.waitForPageLoad();
    await cataloguePage.productNames.first().waitFor({ state: 'visible', timeout: 10000 });
  });

  // TC-001 - Vérifier la présence du bouton Add to cart
  test('TC-001 - Vérifier la présence du bouton Add to cart', { tag: '@smoke' }, async () => {
    await cataloguePage.productNames.first().click();
    await cataloguePage.page.waitForTimeout(500);

    await expect(cartPage.addToCartButton).toBeVisible();
  });

  // TC-002 - Ajouter un produit (présent dans le panier)
  test('TC-002 - Ajouter un produit (présent dans le panier)', { tag: '@smoke' }, async () => {
    const productName = (await cataloguePage.productNames.first().textContent())?.trim();
    await cataloguePage.productNames.first().click();
    await cataloguePage.page.waitForTimeout(500);

    await cartPage.addToCart();
    await cataloguePage.page.waitForTimeout(500);

    await cartPage.navigate(URLS.cart);
    await cartPage.waitForPageLoad();
    await cartPage.productTitles.first().waitFor({ state: 'visible', timeout: 10000 });

    const titlesInCart = await cartPage.getProductTitlesInCart();
    expect(titlesInCart.some(t => t.trim() === productName)).toBe(true);
  });

  // TC-004 - Ajouter plusieurs produits différents
  test('TC-004 - Ajouter plusieurs produits différents', { tag: '@regression' }, async () => {
    const firstProductName = (await cataloguePage.productNames.nth(0).textContent())?.trim();
    const secondProductName = (await cataloguePage.productNames.nth(1).textContent())?.trim();

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

    const titlesInCart = await cartPage.getProductTitlesInCart();
    expect(titlesInCart.some(t => t.trim() === firstProductName)).toBe(true);
    expect(titlesInCart.some(t => t.trim() === secondProductName)).toBe(true);
  });

  // TC-005 - Ajouter le même produit plusieurs fois
  test('TC-005 - Ajouter le même produit plusieurs fois', { tag: '@regression' }, async () => {
    const productName = (await cataloguePage.productNames.first().textContent())?.trim();

    await cataloguePage.productNames.first().click();
    await cataloguePage.page.waitForTimeout(500);
    await cartPage.addToCart();
    await cataloguePage.page.waitForTimeout(500);

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

    const titles = await cartPage.getProductTitlesInCart();
    const matchingLines = titles.filter(t => t.trim() === productName);

    // Une seule ligne attendue pour ce produit et non deux lignes distinctes)
    expect(matchingLines.length).toBe(1);

    const quantities = await cartPage.getProductQuantitiesInCart();
    const indexOfProduct = titles.findIndex(t => t.trim() === productName);
    expect(quantities[indexOfProduct]?.trim()).toBe('2');
  });

});