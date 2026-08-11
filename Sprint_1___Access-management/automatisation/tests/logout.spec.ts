import { test, expect, chromium } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { NavbarPage } from '../pages/navbar.page';
import { RegisterPage } from '../pages/register.page';
import { TEST_USER, URLS } from '../fixtures/test-data';

test.describe('Logout', () => {

  let loginPage: LoginPage;
  let navbarPage: NavbarPage;

  test.beforeAll(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const register = new RegisterPage(page);

    await register.navigate(URLS.register);
    await register.waitForPageLoad();
    await register.fillForm(TEST_USER);

    try {
      await page.waitForURL(`**${URLS.login}`, { timeout: 15000 });
      await page.waitForTimeout(2000); // Attendre que le compte soit bien enregistré
    } catch {
      console.log('Compte déjà existant > on continue');
    }

    await browser.close();
  });

  // beforeEach pour se connecter avant chaque test de logout
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    navbarPage = new NavbarPage(page);
    await loginPage.navigate(URLS.login);
    await loginPage.waitForPageLoad();
    await loginPage.login(TEST_USER.email, TEST_USER.password);
    await page.waitForURL(`**${URLS.account}`, { timeout: 15000 });
    await page.waitForLoadState('networkidle');
  });

  // TC-023 → Vérifier la présence du bouton de déconnexion
  test('TC-023 - Vérifier la présence du bouton de déconnexion', { tag: '@smoke' }, async () => {
    await navbarPage.dropdownButton.click();
    await expect(navbarPage.logoutButton).toBeVisible();
  });

  // TC-024 → Logout → redirection vers /auth/login
  test('TC-024 - Logout → redirection vers /auth/login', { tag: '@smoke' }, async () => {
    await navbarPage.logout();
    await expect(navbarPage.page).toHaveURL(/auth\/login/);
  });

  // TC-025 → Session détruite après logout
  test('TC-025 - Session détruite après logout', { tag: '@regression' }, async ({ page }) => {
    await navbarPage.logout();
    await page.goto(URLS.account);
    await expect(page).toHaveURL(URLS.login);
  });

  // TC-026 → Accès /account après logout → impossible
  test('TC-026 - Accès /account après logout → impossible', { tag: '@regression' }, async () => {
    await navbarPage.logout();
    await navbarPage.page.goto(URLS.account);
    await expect(navbarPage.page).toHaveURL(/auth\/login/);
  });

});