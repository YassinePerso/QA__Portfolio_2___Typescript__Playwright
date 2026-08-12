# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Sprint_2___Catalogue/automatisation/tests/favourites.spec.ts >> Add to favourites >> TC-035 - Cliquer en étant connecté - produit ajouté aux favoris
- Location: Sprint_2___Catalogue/automatisation/tests/favourites.spec.ts:46:3

# Error details

```
Error: browserType.launch: Executable doesn't exist at /home/yass/.cache/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell
╔════════════════════════════════════════════════════════════╗
║ Looks like Playwright was just installed or updated.       ║
║ Please run the following command to download new browsers: ║
║                                                            ║
║     npx playwright install                                 ║
║                                                            ║
║ <3 Playwright Team                                         ║
╚════════════════════════════════════════════════════════════╝
```

# Test source

```ts
  1  | import { test, expect, chromium } from '@playwright/test';
  2  | import { CataloguePage } from '../pages/catalogue.page';
  3  | import { LoginPage } from '../../../Sprint_1___Access-management/automatisation/pages/login.page';
  4  | import { RegisterPage } from '../../../Sprint_1___Access-management/automatisation/pages/register.page';
  5  | import { TEST_USER, URLS } from '../fixtures/test-data';
  6  | 
  7  | test.describe('Add to favourites', () => {
  8  | 
  9  |   test.beforeAll(async () => {
> 10 |     const browser = await chromium.launch();
     |                                    ^ Error: browserType.launch: Executable doesn't exist at /home/yass/.cache/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell
  11 |     const context = await browser.newContext();
  12 |     const page = await context.newPage();
  13 |     const registerPage = new RegisterPage(page);
  14 | 
  15 |     await registerPage.navigate(URLS.register);
  16 |     await registerPage.waitForPageLoad();
  17 |     await registerPage.fillForm(TEST_USER);
  18 | 
  19 |     try {
  20 |       await page.waitForURL(`**${URLS.login}`, { timeout: 10000 });
  21 |     } catch {
  22 |       console.log('Compte déjà existant -> on continue');
  23 |     }
  24 | 
  25 |     await browser.close();
  26 |   });
  27 | 
  28 |   // TC-033 - Vérifier la présence du bouton Add to favourites
  29 |   // Ne nécessite pas d'être connecté.
  30 |   test('TC-033 - Vérifier la présence du bouton Add to favourites', { tag: '@smoke' }, async ({ page }) => {
  31 |     const cataloguePage = new CataloguePage(page);
  32 |     await cataloguePage.navigate(URLS.catalogue);
  33 |     await cataloguePage.waitForPageLoad();
  34 |     await cataloguePage.productNames.first().click();
  35 |     await cataloguePage.page.waitForTimeout(500);
  36 | 
  37 |     await expect(cataloguePage.addToFavourites).toBeVisible();
  38 |   });
  39 | 
  40 | 
  41 |   // TC-034 - Cliquer sur "Add to favourites" sans être connecté
  42 |   // Ce test reste MANUEL : le message affiché nécessite un jugement visuel
  43 | 
  44 |   
  45 |   // TC-035 - Cliquer en étant connecté - produit ajouté aux favoris
  46 |   test('TC-035 - Cliquer en étant connecté - produit ajouté aux favoris', { tag: '@regression' }, async ({ page }) => {
  47 |     const loginPage = new LoginPage(page);
  48 |     await loginPage.navigate(URLS.login);
  49 |     await loginPage.waitForPageLoad();
  50 |     await loginPage.login(TEST_USER.email, TEST_USER.password);
  51 |     await page.waitForURL(URLS.account, { timeout: 15000 });
  52 | 
  53 |     const cataloguePage = new CataloguePage(page);
  54 |     await cataloguePage.navigate(URLS.catalogue);
  55 |     await cataloguePage.waitForPageLoad();
  56 |     await cataloguePage.productNames.first().click();
  57 |     await cataloguePage.page.waitForTimeout(500);
  58 | 
  59 |     await cataloguePage.addToFavourites.click();
  60 |     await cataloguePage.page.waitForTimeout(500);
  61 | 
  62 |     await expect(cataloguePage.addToFavourites).toBeVisible();
  63 |   });
  64 | 
  65 |   // TC-036 - Produit apparaît dans la liste des favoris
  66 |   test('TC-036 - Produit apparaît dans la liste des favoris', { tag: '@regression' }, async ({ page }) => {
  67 |     const loginPage = new LoginPage(page);
  68 |     await loginPage.navigate(URLS.login);
  69 |     await loginPage.waitForPageLoad();
  70 |     await loginPage.login(TEST_USER.email, TEST_USER.password);
  71 |     await page.waitForURL(URLS.account, { timeout: 15000 });
  72 | 
  73 |     const cataloguePage = new CataloguePage(page);
  74 |     await cataloguePage.navigate(URLS.catalogue);
  75 |     await cataloguePage.waitForPageLoad();
  76 |     await cataloguePage.productNames.first().click();
  77 |     await cataloguePage.page.waitForTimeout(500);
  78 | 
  79 |     const productName = (await cataloguePage.productNames.first().textContent())?.trim();
  80 |     await cataloguePage.addToFavourites.click();
  81 |     await cataloguePage.page.waitForTimeout(500);
  82 | 
  83 |     await cataloguePage.navigate(URLS.favourites);
  84 |     await cataloguePage.waitForPageLoad();
  85 |     await cataloguePage.productNames.first().waitFor({ state: 'visible', timeout: 10000 });
  86 | 
  87 |     const favouritesList = await cataloguePage.productNames.allTextContents();
  88 |     const isPresent = favouritesList.some(name => name.trim() === productName);
  89 | 
  90 |     expect(isPresent).toBe(true);
  91 |   });
  92 | 
  93 | });
```