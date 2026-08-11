# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Sprint_2___Catalogue/automatisation/tests/category.spec.ts >> Filtre par catégorie >> TC-017 - Nav catégorie valide (redirection correcte)
- Location: Sprint_2___Catalogue/automatisation/tests/category.spec.ts:63:3

# Error details

```
Error: expect(locator).not.toBeVisible() failed

Locator:  locator('text=404')
Expected: not visible
Received: visible
Timeout:  5000ms

Call log:
  - Expect "not toBeVisible" with timeout 5000ms
  - waiting for locator('text=404')
    13 × locator resolved to <h1>404 Error</h1>
       - unexpected value "visible"

```

```yaml
- heading "404 Error" [level=1]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { CataloguePage } from '../pages/catalogue.page';
  3  | import { URLS } from '../fixtures/test-data';
  4  | 
  5  | test.describe('Filtre par catégorie', () => {
  6  | 
  7  |   let cataloguePage: CataloguePage;
  8  | 
  9  | 
  10 |   test.beforeEach(async ({ page }) => {
  11 |     cataloguePage = new CataloguePage(page);
  12 |     await cataloguePage.navigate(URLS.catalogue);
  13 |     await cataloguePage.waitForPageLoad();
  14 |     await cataloguePage.productNames.first().waitFor({ state: 'visible', timeout: 10000 });
  15 |   });
  16 | 
  17 |   // TC-013 - Vérifier la présence des checkboxes de catégories
  18 |   test('TC-013 - Vérifier la présence des checkboxes de catégories', { tag: '@smoke' }, async () => {
  19 |     await expect(cataloguePage.categoryHammer).toBeVisible();
  20 |     await expect(cataloguePage.categoryHandSaw).toBeVisible();
  21 |   });
  22 | 
  23 |   // TC-014 - Cocher une catégorie - seuls les produits affichés
  24 |   test('TC-014 - Cocher une catégorie', { tag: '@regression' }, async () => {
  25 |     const countBefore = await cataloguePage.getProductCount();
  26 | 
  27 |     await cataloguePage.categoryHammer.check();
  28 |     await cataloguePage.page.waitForTimeout(1000);
  29 |     const countAfter = await cataloguePage.getProductCount();
  30 | 
  31 |     expect(countAfter).toBeGreaterThan(0);
  32 |     expect(countAfter).toBeLessThan(countBefore);
  33 |   });
  34 | 
  35 |   // TC-015 - Cocher plusieurs catégories (produits combinés)
  36 |   test('TC-015 - Cocher plusieurs catégories (produits combinés)', { tag: '@regression' }, async () => {
  37 |     await cataloguePage.categoryHammer.check();
  38 |     await cataloguePage.page.waitForTimeout(1000);
  39 |     const countHammerOnly = await cataloguePage.getProductCount();
  40 | 
  41 |     await cataloguePage.categoryHandSaw.check();
  42 |     await cataloguePage.page.waitForTimeout(1000); //Delai pour que le filtre soit appliqué et que le nombre de produits soit mis à jour
  43 |     const countCombined = await cataloguePage.getProductCount();
  44 | 
  45 |     expect(countCombined).toBeGreaterThanOrEqual(countHammerOnly);
  46 |   });
  47 | 
  48 |   // TC-016 - Décocher une catégorie (filtre retiré)
  49 |   test('TC-016 - Décocher une catégorie', { tag: '@regression' }, async () => {
  50 |     const countBefore = await cataloguePage.getProductCount();
  51 | 
  52 |     await cataloguePage.categoryHammer.check();
  53 |     await cataloguePage.page.waitForTimeout(1000);
  54 | 
  55 |     await cataloguePage.categoryHammer.uncheck();
  56 |     await cataloguePage.page.waitForTimeout(1000);
  57 |     const countAfter = await cataloguePage.getProductCount();
  58 | 
  59 |     expect(countAfter).toBe(countBefore);
  60 |   });
  61 | 
  62 |   // TC-017 - Nav catégorie valide (redirection correcte)
  63 |   test('TC-017 - Nav catégorie valide (redirection correcte)', { tag: '@regression' }, async ({ page }) => {
  64 |     await cataloguePage.navCategoriesMenu.click();
  65 |     await cataloguePage.navChainsaws.click();
> 66 |     await expect(page.locator('text=404')).not.toBeVisible();
     |                                                ^ Error: expect(locator).not.toBeVisible() failed
  67 |     await expect(cataloguePage.productNames.first()).toBeVisible();
  68 |   });
  69 | 
  70 |   // TC-018 - Aucune catégorie UNDEFINED dans l'interface
  71 |   test('TC-018 - Aucune catégorie UNDEFINED dans l\'interface', { tag: '@regression' }, async ({ page }) => {
  72 |     const categoryLabels = await page.locator('[data-test="nav-robotic-tools"]').allTextContents();
  73 |     const hasUndefined = categoryLabels.some(label => label.toUpperCase().includes('UNDEFINED'));
  74 |     expect(hasUndefined).toBe(false);
  75 |   });
  76 | 
  77 | });
```