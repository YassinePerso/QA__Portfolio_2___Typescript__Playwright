import { test, expect } from '@playwright/test';
import { CataloguePage } from '../pages/catalogue.page';
import { URLS } from '../fixtures/test-data';

test.describe('Filtre par catégorie', () => {

  let cataloguePage: CataloguePage;


  test.beforeEach(async ({ page }) => {
    cataloguePage = new CataloguePage(page);
    await cataloguePage.navigate(URLS.catalogue);
    await cataloguePage.waitForPageLoad();
    await cataloguePage.productNames.first().waitFor({ state: 'visible', timeout: 10000 });
  });

  // TC-013 - Vérifier la présence des checkboxes de catégories
  test('TC-013 - Vérifier la présence des checkboxes de catégories', { tag: '@smoke' }, async () => {
    await expect(cataloguePage.categoryHammer).toBeVisible();
    await expect(cataloguePage.categoryHandSaw).toBeVisible();
  });

  // TC-014 - Cocher une catégorie - seuls les produits affichés
  test('TC-014 - Cocher une catégorie', { tag: '@regression' }, async () => {
    const countBefore = await cataloguePage.getProductCount();

    await cataloguePage.categoryHammer.check();
    await cataloguePage.page.waitForTimeout(1000);
    const countAfter = await cataloguePage.getProductCount();

    expect(countAfter).toBeGreaterThan(0);
    expect(countAfter).toBeLessThan(countBefore);
  });

  // TC-015 - Cocher plusieurs catégories (produits combinés)
  test('TC-015 - Cocher plusieurs catégories (produits combinés)', { tag: '@regression' }, async () => {
    await cataloguePage.categoryHammer.check();
    await cataloguePage.page.waitForTimeout(1000);
    const countHammerOnly = await cataloguePage.getProductCount();

    await cataloguePage.categoryHandSaw.check();
    await cataloguePage.page.waitForTimeout(1000); //Delai pour que le filtre soit appliqué et que le nombre de produits soit mis à jour
    const countCombined = await cataloguePage.getProductCount();

    expect(countCombined).toBeGreaterThanOrEqual(countHammerOnly);
  });

  // TC-016 - Décocher une catégorie (filtre retiré)
  test('TC-016 - Décocher une catégorie', { tag: '@regression' }, async () => {
    const countBefore = await cataloguePage.getProductCount();

    await cataloguePage.categoryHammer.check();
    await cataloguePage.page.waitForTimeout(1000);

    await cataloguePage.categoryHammer.uncheck();
    await cataloguePage.page.waitForTimeout(1000);
    const countAfter = await cataloguePage.getProductCount();

    expect(countAfter).toBe(countBefore);
  });

  // TC-017 - Nav catégorie valide (redirection correcte)
  test('TC-017 - Nav catégorie valide (redirection correcte)', { tag: '@regression' }, async ({ page }) => {
    await cataloguePage.navCategoriesMenu.click();
    await cataloguePage.navChainsaws.click();
    await expect(page.locator('text=404')).not.toBeVisible();
    await expect(cataloguePage.productNames.first()).toBeVisible();
  });

  // TC-018 - Aucune catégorie UNDEFINED dans l'interface
  test('TC-018 - Aucune catégorie UNDEFINED dans l\'interface', { tag: '@regression' }, async ({ page }) => {
    const categoryLabels = await page.locator('[data-test="nav-robotic-tools"]').allTextContents();
    const hasUndefined = categoryLabels.some(label => label.toUpperCase().includes('UNDEFINED'));
    expect(hasUndefined).toBe(false);
  });

});