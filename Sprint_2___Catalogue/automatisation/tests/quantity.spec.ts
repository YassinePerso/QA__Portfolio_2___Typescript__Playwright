import { test, expect } from '@playwright/test';
import { CataloguePage } from '../pages/catalogue.page';
import { URLS } from '../fixtures/test-data';

test.describe('Sélecteur de quantité (page produit)', () => {

  let cataloguePage: CataloguePage;

  test.beforeEach(async ({ page }) => {
    cataloguePage = new CataloguePage(page);
    await cataloguePage.navigate(URLS.catalogue);
    await cataloguePage.waitForPageLoad();
    await cataloguePage.productNames.first().click();
    await cataloguePage.page.waitForTimeout(500);
  });

  // TC-029 - Vérifier présence du sélecteur de quantité
  test('TC-029 - Vérifier présence du sélecteur de quantité', { tag: '@smoke' }, async () => {
    await expect(cataloguePage.quantityInput).toBeVisible();
    await expect(cataloguePage.quantityIncrease).toBeVisible();
    await expect(cataloguePage.quantityDecrease).toBeVisible();
  });

  // TC-030 - Cliquer sur + (quantité incrémente de 1)
  test('TC-030 - Cliquer sur + (quantité incrémente de 1)', { tag: '@regression' }, async () => {
    const before = Number(await cataloguePage.quantityInput.inputValue());
    await cataloguePage.quantityIncrease.click();
    await cataloguePage.page.waitForTimeout(300);
    const after = Number(await cataloguePage.quantityInput.inputValue());

    expect(after).toBe(before + 1);
  });

  // TC-031 - Cliquer sur - (quantité décrémente de 1)
  test('TC-031 - Cliquer sur - (quantité décrémente de 1)', { tag: '@regression' }, async () => {
    await cataloguePage.quantityInput.fill('3');
    const before = Number(await cataloguePage.quantityInput.inputValue());

    await cataloguePage.quantityDecrease.click();
    await cataloguePage.page.waitForTimeout(300);
    const after = Number(await cataloguePage.quantityInput.inputValue());

    expect(after).toBe(before - 1);
  });

  // TC-032 - Quantité minimum - impossible de descendre sous 1
  test('TC-032 - Quantité minimum - impossible de descendre sous 1', { tag: '@regression' }, async () => {
    await cataloguePage.quantityDecrease.click();
    await cataloguePage.page.waitForTimeout(300);
    const value = Number(await cataloguePage.quantityInput.inputValue());

    expect(value).toBeGreaterThanOrEqual(1);
  });

});