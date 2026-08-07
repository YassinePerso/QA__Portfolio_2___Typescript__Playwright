import { test, expect } from '@playwright/test';
import { CataloguePage } from '../pages/catalogue.page';
import { URLS } from '../fixtures/test-data';

test.describe('Tri des produits', () => {

  let cataloguePage: CataloguePage;

  test.beforeEach(async ({ page }) => {
    cataloguePage = new CataloguePage(page);
    await cataloguePage.navigate(URLS.catalogue);
    await cataloguePage.waitForPageLoad();
  });

  // TC-006 - Vérifier la présence du select de tri
  test('TC-006 - Vérifier la présence du select de tri', { tag: '@smoke' }, async () => {
    await expect(cataloguePage.sortSelect).toBeVisible();
  });

  // TC-007 - Tri des noms de produits (A-Z)
  test('TC-007 - Tri des noms de produits (A-Z)', { tag: '@regression' }, async () => {
    await cataloguePage.sortBy('name,desc');
    const names = await cataloguePage.getProductNamesText();
    const sorted = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sorted);
  });

  // TC-008 - Tri des noms de produits (Z-A)
  test('TC-008 - Tri des noms de produits (Z-A)', { tag: '@regression' }, async () => {
    await cataloguePage.sortBy('name,asc');
    const names = await cataloguePage.getProductNamesText();
    const sorted = [...names].sort((a, b) => b.localeCompare(a));
    expect(names).toEqual(sorted);
  });

  // TC-009 - Tri Price (High-Low)
  test('TC-009 - Tri Price (High-Low)', { tag: '@regression' }, async () => {
    await cataloguePage.sortBy('price,asc');
    const prices = await cataloguePage.getProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });

  // TC-010 - Tri Price (Low-High)
  test('TC-010 - Tri Price (Low-High)', { tag: '@regression' }, async () => {
    await cataloguePage.sortBy('price,desc');
    const prices = await cataloguePage.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  // TC-011 - Tri CO₂ Rating (Best First)
  test('TC-011 - Tri CO₂ Rating (Best First)', { tag: '@regression' }, async () => {
    await cataloguePage.sortBy('co2_rating,desc');
    const bestFirst = await cataloguePage.getCo2Ratings();

    await cataloguePage.sortBy('co2_rating,asc');
    const worstFirst = await cataloguePage.getCo2Ratings();

    expect(bestFirst).toEqual([...worstFirst].reverse());
  });

  // TC-012 - Tri CO₂ Rating (Worst First)
  test('TC-012 - Tri CO₂ Rating (Worst First)', { tag: '@regression' }, async () => {
    await cataloguePage.sortBy('co2_rating,asc');
    const worstFirst = await cataloguePage.getCo2Ratings();

    await cataloguePage.sortBy('co2_rating,desc');
    const bestFirst = await cataloguePage.getCo2Ratings();

    expect(worstFirst).toEqual([...bestFirst].reverse());
  });

});