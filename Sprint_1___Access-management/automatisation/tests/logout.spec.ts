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
    const context = await browser.newContext({ locale: 'fr-FR' });
    const page = await context.newPage();
    const register = new RegisterPage(page);

    await register.navigate(URLS.register);
    await register.waitForPageLoad();
    await register.fillForm(TEST_USER);

    try {
      await page.waitForURL(`**${URLS.login}`, { timeout: 10000 });
    } catch {
      console.log('Compte déjà existant —> on continue');
    }

    await browser.close();
  });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    navbarPage = new NavbarPage(page);
    await loginPage.navigate(URLS.login);
    await loginPage.waitForPageLoad();
    await loginPage.login(TEST_USER.email, TEST_USER.password);
    await page.waitForURL(`**${URLS.account}`, { timeout: 10000 });
  });

  // TC-16 → Vérifier la présence du bouton déconnexion
  test('TC-16 - Vérifier la présence du bouton déconnexion', { tag: '@smoke' }, async () => {
    await navbarPage.dropdownButton.click();
    await expect(navbarPage.logoutButton).toBeVisible();
  });

  // TC-17 → Logout redirige vers la page d'accueil ou login
  test('TC-17 - Logout redirige vers la page d\'accueil ou login', { tag: '@smoke' }, async () => {
    await navbarPage.logout();
    await expect(navbarPage.page).toHaveURL(/auth\/login|home/);
  });

  // TC-18 → Accès /account après logout impossible
  test('TC-18 - Accès /account après logout impossible', { tag: '@regression' }, async () => {
    await navbarPage.logout();
    await navbarPage.page.goto(URLS.account);
    await expect(navbarPage.page).toHaveURL(/auth\/login/);
  });

});