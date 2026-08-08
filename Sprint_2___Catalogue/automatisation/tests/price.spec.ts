import { test, expect } from '@playwright/test';
import { CataloguePage } from '../pages/catalogue.page';
import { URLS } from '../fixtures/test-data';

test.describe('Filtre par fourchette de prix', () => {

  let cataloguePage: CataloguePage;

  test.beforeEach(async ({ page }) => {
    cataloguePage = new CataloguePage(page);
    await cataloguePage.navigate(URLS.catalogue);
    await cataloguePage.waitForPageLoad();
  });

  // TC-025 - Vérifier présence du slider de prix
  test('TC-025 - Vérifier présence du slider de prix', { tag: '@smoke' }, async () => {
    await expect(cataloguePage.priceSliderMin).toBeVisible();
    await expect(cataloguePage.priceSliderMax).toBeVisible();
  });

  // TC-026 - Modifier valeur min - produits filtrés correctement
  test('TC-026 - Modifier valeur min - produits filtrés correctement', { tag: '@regression' }, async () => {
    await cataloguePage.setSliderValue(cataloguePage.priceSliderMin, 50);
    await cataloguePage.page.waitForTimeout(500);

    const prices = await cataloguePage.getProductPrices();
    const allAboveMin = prices.every(price => price >= 50);

    expect(allAboveMin).toBe(true);
  });

  // TC-027 - Modifier valeur max - produits filtrés correctement
  test('TC-027 - Modifier valeur max - produits filtrés correctement', { tag: '@regression' }, async () => {
    await cataloguePage.setSliderValue(cataloguePage.priceSliderMax, 20);
    await cataloguePage.page.waitForTimeout(500);

    const prices = await cataloguePage.getProductPrices();
    const allBelowMax = prices.every(price => price <= 20);

    expect(allBelowMax).toBe(true);
  });

  // TC-028 - Valeurs limites (1€ et 200€) - comportement stable
  test('TC-028 - Valeurs limites (1€ et 200€) - comportement stable', { tag: '@regression' }, async () => {
    await cataloguePage.setSliderValue(cataloguePage.priceSliderMin, 1);
    await cataloguePage.setSliderValue(cataloguePage.priceSliderMax, 200);
    await cataloguePage.page.waitForTimeout(500);

    const count = await cataloguePage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

});