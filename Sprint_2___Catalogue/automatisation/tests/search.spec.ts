import { test, expect } from '@playwright/test';
import { CataloguePage } from '../pages/catalogue.page';
import { URLS } from '../fixtures/test-data';

test.describe('Recherche produit', () => {

  let cataloguePage: CataloguePage;

  test.beforeEach(async ({ page }) => {
    cataloguePage = new CataloguePage(page);
    await cataloguePage.navigate(URLS.catalogue);
    await cataloguePage.waitForPageLoad();
  });

  // TC-001 - Vérifier la présence de la barre de recherche
  test('TC-001 - Vérifier la présence de la barre de recherche', { tag: '@smoke' }, async () => {
    await expect(cataloguePage.searchInput).toBeVisible();
  });

  // TC-002 - Recherche avec terme valide
  test('TC-002 - Recherche avec terme valide', { tag: '@smoke' }, async () => {
    await cataloguePage.search('Combination Pliers');
    const count = await cataloguePage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  // TC-003 - Recherche avec terme inexistant
  test('TC-003 - Recherche avec terme inexistant', { tag: '@regression' }, async () => {
    await cataloguePage.search('produitquinexistepasxyz123');
    const count = await cataloguePage.getProductCount();
    expect(count).toBe(0);
  });

  // TC-004 - Recherche vide
  test('TC-004 - Recherche vide', { tag: '@regression' }, async () => {
    const countBefore = await cataloguePage.getProductCount();
    await cataloguePage.search('');
    const countAfter = await cataloguePage.getProductCount();
    expect(countAfter).toBe(countBefore);
    expect(countAfter).toBeGreaterThan(0);
  });

  // TC-005 - Bouton de recherche présent
  test('TC-005 - Bouton de recherche présent', { tag: '@smoke' }, async () => {
    await expect(cataloguePage.searchButton).toBeVisible();
    await expect(cataloguePage.searchButton).toBeEnabled();
  });

});