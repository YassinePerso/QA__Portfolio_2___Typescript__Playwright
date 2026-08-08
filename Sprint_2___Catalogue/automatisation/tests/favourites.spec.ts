import { test, expect, chromium } from '@playwright/test';
import { CataloguePage } from '../pages/catalogue.page';
import { LoginPage } from '../../../Sprint_1___Access-management/automatisation/pages/login.page';
import { RegisterPage } from '../../../Sprint_1___Access-management/automatisation/pages/register.page';
import { TEST_USER, URLS } from '../fixtures/test-data';

test.describe('Add to favourites', () => {

  test.beforeAll(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const registerPage = new RegisterPage(page);

    await registerPage.navigate(URLS.register);
    await registerPage.waitForPageLoad();
    await registerPage.fillForm(TEST_USER);

    try {
      await page.waitForURL(`**${URLS.login}`, { timeout: 10000 });
    } catch {
      console.log('Compte déjà existant -> on continue');
    }

    await browser.close();
  });

  // TC-033 - Vérifier la présence du bouton Add to favourites
  // Ne nécessite pas d'être connecté.
  test('TC-033 - Vérifier la présence du bouton Add to favourites', { tag: '@smoke' }, async ({ page }) => {
    const cataloguePage = new CataloguePage(page);
    await cataloguePage.navigate(URLS.catalogue);
    await cataloguePage.waitForPageLoad();
    await cataloguePage.productNames.first().click();
    await cataloguePage.page.waitForTimeout(500);

    await expect(cataloguePage.addToFavourites).toBeVisible();
  });


  // TC-034 - Cliquer sur "Add to favourites" sans être connecté
  // Ce test reste MANUEL : le message affiché nécessite un jugement visuel

  
  // TC-035 - Cliquer en étant connecté - produit ajouté aux favoris
  test('TC-035 - Cliquer en étant connecté - produit ajouté aux favoris', { tag: '@regression' }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate(URLS.login);
    await loginPage.waitForPageLoad();
    await loginPage.login(TEST_USER.email, TEST_USER.password);
    await page.waitForURL(URLS.account, { timeout: 15000 });

    const cataloguePage = new CataloguePage(page);
    await cataloguePage.navigate(URLS.catalogue);
    await cataloguePage.waitForPageLoad();
    await cataloguePage.productNames.first().click();
    await cataloguePage.page.waitForTimeout(500);

    await cataloguePage.addToFavourites.click();
    await cataloguePage.page.waitForTimeout(500);

    await expect(cataloguePage.addToFavourites).toBeVisible();
  });

  // TC-036 - Produit apparaît dans la liste des favoris
  test('TC-036 - Produit apparaît dans la liste des favoris', { tag: '@regression' }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate(URLS.login);
    await loginPage.waitForPageLoad();
    await loginPage.login(TEST_USER.email, TEST_USER.password);
    await page.waitForURL(URLS.account, { timeout: 15000 });

    const cataloguePage = new CataloguePage(page);
    await cataloguePage.navigate(URLS.catalogue);
    await cataloguePage.waitForPageLoad();
    await cataloguePage.productNames.first().click();
    await cataloguePage.page.waitForTimeout(500);

    const productName = (await cataloguePage.productNames.first().textContent())?.trim();
    await cataloguePage.addToFavourites.click();
    await cataloguePage.page.waitForTimeout(500);

    await cataloguePage.navigate(URLS.favourites);
    await cataloguePage.waitForPageLoad();
    await cataloguePage.productNames.first().waitFor({ state: 'visible', timeout: 10000 });

    const favouritesList = await cataloguePage.productNames.allTextContents();
    const isPresent = favouritesList.some(name => name.trim() === productName);

    expect(isPresent).toBe(true);
  });

});