import { test, expect, chromium } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';
import { TEST_USER, URLS } from '../fixtures/test-data';

test.describe('Login', () => {

  let loginPage: LoginPage;

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

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate(URLS.login);
    await loginPage.waitForPageLoad();
  });

  // TC-011 - Vérifier la présence des champs email et mot de passe
  test('TC-011 - Vérifier la présence des champs email et mot de passe', { tag: '@smoke' }, async () => {
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();
  });

  // TC-012 - Login avec email inexistant
  test('TC-012 - Login avec email inexistant', { tag: '@regression' }, async () => {
    await loginPage.login('inconnu@test.com', TEST_USER.password);
    await expect(loginPage.page.locator('[data-test="login-error"]')).toBeVisible();
    await expect(loginPage.page.locator('[data-test="login-error"]')).toContainText('Invalid email or password');
  });

  // TC-013 - Login avec mauvais mot de passe
  test('TC-013 - Login avec mauvais mot de passe', { tag: '@regression' }, async () => {
    await loginPage.login(TEST_USER.email, 'MauvaisMdp!999');
    await expect(loginPage.page.locator('[data-test="login-error"]')).toBeVisible();
    await expect(loginPage.page.locator('[data-test="login-error"]')).toContainText('Invalid email or password');
  });

  // TC-014 - Login avec email vide
  // Le site n'a pas de validation dédiée au champ email vide, il affiche le même message générique que pour des identifiants invalides.
  test('TC-014 - Login avec email vide', { tag: '@regression' }, async () => {
    await loginPage.login('', TEST_USER.password);
    await expect(loginPage.page.locator('[data-test="login-error"]')).toBeVisible();
    await expect(loginPage.page.locator('[data-test="login-error"]')).toContainText('Invalid email or password');
  });

  // TC-015 - Login avec mot de passe vide
  // Même comportement générique que TC-014 (message unique, pas de validation par champ)
  test('TC-015 - Login avec mot de passe vide', { tag: '@regression' }, async () => {
    await loginPage.login(TEST_USER.email, '');
    await expect(loginPage.page.locator('[data-test="login-error"]')).toBeVisible();
    await expect(loginPage.page.locator('[data-test="login-error"]')).toContainText('Invalid email or password');
  });

  // TC-016 - Login avec email mal formaté
  // Même comportement générique que TC-014 et TC015
  test('TC-016 - Login avec email mal formaté', { tag: '@regression' }, async () => {
    await loginPage.login('yassine@', TEST_USER.password);
    await expect(loginPage.page.locator('[data-test="login-error"]')).toBeVisible();
    await expect(loginPage.page.locator('[data-test="login-error"]')).toContainText('Invalid email or password');
  });

  // TC-017 - Login réussi > redirection /account
  test('TC-017 - Login réussi > redirection /account', { tag: '@smoke' }, async () => {
    await loginPage.login(TEST_USER.email, TEST_USER.password);
    await expect(loginPage.page).toHaveURL(URLS.account, { timeout: 15000 });
  });

  // TC-018 - Élément propre à /account affiché après login
  test('TC-018 - Élément propre à /account affiché après login', { tag: '@smoke' }, async () => {
    await loginPage.login(TEST_USER.email, TEST_USER.password);
    await loginPage.page.waitForURL(URLS.account, { timeout: 15000 });
    await expect(loginPage.page.locator('[data-test="page-title"]')).toBeVisible();
  });

});