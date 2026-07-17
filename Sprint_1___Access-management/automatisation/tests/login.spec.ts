import { test, expect, chromium } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';
import { TEST_USER, URLS } from '../fixtures/test-data';

test.describe('Login', () => {

  let loginPage: LoginPage;

  test.beforeAll(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({ locale: 'fr-FR' });
    const page = await context.newPage();
    const registerPage = new RegisterPage(page);

    await registerPage.navigate(URLS.register);
    await registerPage.waitForPageLoad();
    await registerPage.fillForm(TEST_USER);

    try {
      await page.waitForURL(`**${URLS.login}`, { timeout: 10000 });
    } catch {
      console.log('Compte déjà existant — on continue');
    }

    await browser.close();
  });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate(URLS.login);
    await loginPage.waitForPageLoad();
  });

  // TC-08 → Vérifier la présence des champs email et mot de passe
  test('TC-08 - Vérifier la présence des champs email et mot de passe', { tag: '@smoke' }, async () => {
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();
  });

  // TC-09 → Email inexistant affiche un message d'erreur
  // Ce test échoue intentionnellement - BUG-002 documenté dans Jira
  // Le message s'affiche en anglais au lieu du français attendu
  test('TC-09 - Email inexistant affiche un message d\'erreur', { tag: '@regression' }, async () => {
    await loginPage.login('inconnu@test.com', TEST_USER.password);
    await expect(loginPage.page.locator('[data-test="login-error"]')).toBeVisible();
    await expect(loginPage.page.locator('[data-test="login-error"]')).toContainText('E-mail ou mot de passe non valide');
  });

  // TC-10 → Mauvais mot de passe affiche un message d'erreur
  // Ce test échoue intentionnellement - BUG-002 documenté dans Jira
  // Le message s'affiche en anglais au lieu du français attendu
  test('TC-10 - Mauvais mot de passe affiche un message d\'erreur', { tag: '@regression' }, async () => {
    await loginPage.login(TEST_USER.email, 'MauvaisMdp!999');
    await expect(loginPage.page.locator('[data-test="login-error"]')).toBeVisible();
    await expect(loginPage.page.locator('[data-test="login-error"]')).toContainText('E-mail ou mot de passe non valide');
  });

  // TC-11 → Email vide bloque la soumission
  test('TC-11 - Email vide bloque la soumission', { tag: '@regression' }, async () => {
    await loginPage.login('', TEST_USER.password);
    await expect(loginPage.page.locator('[data-test="email-error"]')).toBeVisible();
    await expect(loginPage.page.locator('[data-test="email-error"]')).toContainText('L\'email est requis');
  });

  // TC-12 → Mot de passe vide bloque la soumission
  test('TC-12 - Mot de passe vide bloque la soumission', { tag: '@regression' }, async () => {
    await loginPage.login(TEST_USER.email, '');
    await expect(loginPage.page.locator('[data-test="password-error"]')).toBeVisible();
    await expect(loginPage.page.locator('[data-test="password-error"]')).toContainText('Le mot de passe est requis');
  });

  // TC-13 → Email mal formaté bloque la soumission
  test('TC-13 - Email mal formaté bloque la soumission', { tag: '@regression' }, async () => {
    await loginPage.login('yassine@', TEST_USER.password);
    await expect(loginPage.page.locator('[data-test="email-error"]')).toBeVisible();
    await expect(loginPage.page.locator('[data-test="email-error"]')).toContainText('Le format de l\'email est invalide');
  });

  // TC-14 → Login réussi redirige vers /account
  test('TC-14 - Login réussi redirige vers /account', { tag: '@smoke' }, async () => {
    await loginPage.login(TEST_USER.email, TEST_USER.password);
    await expect(loginPage.page).toHaveURL(/account/);
  });

  // TC-15 → Élément propre à /account affiché après login
  test('TC-15 - Élément propre à /account affiché après login', { tag: '@smoke' }, async () => {
    await loginPage.login(TEST_USER.email, TEST_USER.password);
    await expect(loginPage.page.locator('[data-test="page-title"]')).toBeVisible();
  });

});