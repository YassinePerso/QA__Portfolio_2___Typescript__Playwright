import { test, expect } from '@playwright/test';
import { CataloguePage } from '../pages/catalogue.page';
import { URLS } from '../fixtures/test-data';

test.describe('Filtre par marque et Sustainability', () => {

  let cataloguePage: CataloguePage;

  test.beforeEach(async ({ page }) => {
    cataloguePage = new CataloguePage(page);
    await cataloguePage.navigate(URLS.catalogue);
    await cataloguePage.waitForPageLoad();
    await cataloguePage.productNames.first().waitFor({ state: 'visible', timeout: 10000 });
  });

  // TC-019 - Vérifier la présence des checkboxes de marques
  test('TC-019 - Vérifier la présence des checkboxes de marques', { tag: '@smoke' }, async () => {
    await expect(cataloguePage.brand1).toBeVisible();
    await expect(cataloguePage.brand2).toBeVisible();
  });

  // TC-020 - Cocher une marque - seuls ses produits affichés
  test('TC-020 - Cocher une marque - seuls ses produits affichés', { tag: '@regression' }, async () => {
    const countBefore = await cataloguePage.getProductCount();

    await cataloguePage.brand2.check();
    await cataloguePage.page.waitForTimeout(500);
    const countAfter = await cataloguePage.getProductCount();

    expect(countAfter).toBeGreaterThan(0);
    expect(countAfter).toBeLessThan(countBefore);
  });

  // TC-021 - Cocher plusieurs marques - produits combinés
  test('TC-021 - Cocher plusieurs marques - produits combinés', { tag: '@regression' }, async () => {
    await cataloguePage.brand1.check();
    await cataloguePage.page.waitForTimeout(500);
    const countBrand1Only = await cataloguePage.getProductCount();

    await cataloguePage.brand2.check();
    await cataloguePage.page.waitForTimeout(500);
    const countCombined = await cataloguePage.getProductCount();

    expect(countCombined).toBeGreaterThanOrEqual(countBrand1Only);
  });

  // TC-022 - Décocher une marque - filtre retiré
  test('TC-022 - Décocher une marque - filtre retiré', { tag: '@regression' }, async () => {
    const countBefore = await cataloguePage.getProductCount();

    await cataloguePage.brand1.check();
    await cataloguePage.page.waitForTimeout(500);

    await cataloguePage.brand1.uncheck();
    await cataloguePage.page.waitForTimeout(500);
    const countAfter = await cataloguePage.getProductCount();

    expect(countAfter).toBe(countBefore);
  });

  // TC-023 - Vérifier présence checkbox Sustainability
  test('TC-023 - Vérifier présence checkbox Sustainability', { tag: '@smoke' }, async () => {
    await expect(cataloguePage.ecoFriendlyFilter).toBeVisible();
  });

  // TC-024 - Cocher eco-friendly - seuls produits éco affichés
  test('TC-024 - Cocher eco-friendly - seuls produits éco affichés', { tag: '@regression' }, async () => {
    await cataloguePage.ecoFriendlyFilter.check();
    await cataloguePage.page.waitForTimeout(500);

    const ratings = await cataloguePage.getCo2Ratings();
    const allEcoFriendly = ratings.every(rating => rating.trim() === 'A');

    expect(allEcoFriendly).toBe(true);
  });

});