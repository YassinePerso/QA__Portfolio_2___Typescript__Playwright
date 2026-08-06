import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { NavbarPage } from '../pages/navbar.page';
import { TEST_USER, URLS } from '../fixtures/test-data';

test.describe('Menu utilisateur connecté', () => {

  let loginPage: LoginPage;
  let navbarPage: NavbarPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    navbarPage = new NavbarPage(page);
    await loginPage.navigate(URLS.login);
    await loginPage.waitForPageLoad();
    await loginPage.login(TEST_USER.email, TEST_USER.password);
    await page.waitForURL(`**${URLS.account}`, { timeout: 15000 });
  });

  // TC-027 - Nom de l'utilisateur affiché dans le menu après connexion
  test('TC-027 - Nom de l\'utilisateur affiché dans le menu après connexion', { tag: '@regression' }, async () => {
    await expect(navbarPage.dropdownButton).toContainText(TEST_USER.firstname);
  });

  // TC-028 - Option de déconnexion visible dans le menu
  test('TC-028 - Option de déconnexion visible dans le menu', { tag: '@smoke' }, async () => {
    await navbarPage.clickDropdown();
    await expect(navbarPage.logoutButton).toBeVisible();
  });

});