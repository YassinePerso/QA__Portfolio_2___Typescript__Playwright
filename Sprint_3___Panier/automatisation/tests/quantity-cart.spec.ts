import { test, expect } from '@playwright/test';
import { CataloguePage } from '../../../Sprint_2___Catalogue/automatisation/pages/catalogue.page';
import { CartPage } from '../pages/cart.page';
import { URLS } from '../fixtures/test-data';

test.describe('Quantité panier', () => {

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
    await cartPage.productQuantities.first().waitFor({ state: 'visible', timeout: 10000 });
  });

  // TC-006 - Vérifier la présence du champ de quantité
  test('TC-006 - Vérifier la présence du champ de quantité', { tag: '@smoke' }, async () => {
    await expect(cartPage.productQuantities.first()).toBeVisible();
  });

  // TC-007 - Modifier la quantité (mise à jour correcte)
  test('TC-007 - Modifier la quantité (mise à jour correcte)', { tag: '@regression' }, async () => {
    await cartPage.productQuantities.first().fill('5');
    await cartPage.productQuantities.first().press('Tab'); // déclenche l'événement Tab pour changer le focus et mettre à jour la quantité
    await cartPage.page.waitForTimeout(500);

    const value = await cartPage.productQuantities.first().inputValue();
    expect(value).toBe('5');
  });

  // TC-008 - Quantité à 0 (soumission bloquée ou remise à 1)
  test('TC-008 - Quantité à 0 (soumission bloquée ou remise à 1)', { tag: '@regression' }, async () => {
    await cartPage.productQuantities.first().fill('0');
    await cartPage.productQuantities.first().press('Tab');
    await cartPage.page.waitForTimeout(500);

    const value = await cartPage.productQuantities.first().inputValue();
    // Comportement attendu > soit bloqué (reste à une valeur >= 1) soit remis à 1
    expect(Number(value)).toBeGreaterThanOrEqual(1);
  });

  // TC-009 - Quantité négative (soumission bloquée)
  test('TC-009 - Quantité négative (soumission bloquée)', { tag: '@regression' }, async () => {
    await cartPage.productQuantities.first().fill('-5');
    await cartPage.productQuantities.first().press('Tab');
    await cartPage.page.waitForTimeout(500);

    const value = await cartPage.productQuantities.first().inputValue();
    expect(Number(value)).toBeGreaterThanOrEqual(0);
  });

});