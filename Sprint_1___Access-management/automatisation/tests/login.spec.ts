import { test, expect, chromium } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';

test.describe('Login', () => {


  let loginPage: LoginPage;

    const testEmail = `qa.portfolio.test1@test.com`;
    const testPassword = 'QaP0rtf0li0!2026';

  test.beforeAll(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({ locale: 'fr-FR' });
    const page = await context.newPage();
    const registerPage = new RegisterPage(page);

    await registerPage.navigate('/auth/register');
    await registerPage.waitForPageLoad();
    await registerPage.fillForm({
      firstname: 'Yassine',
      lastname: 'Test',
      birthdate: '1990-01-01',
      country: 'France',
      postalcode: '75001',
      streetnumber: '42',
      streetname: 'Rue de la Paix',
      city: 'Paris',
      state: 'Île-de-France',
      phonenumber: '0600000000',
      email: testEmail,
      password: testPassword,
    });

    // Attendre la redirection vers /auth/login (register réussi)
    // Si le compte existe déjà, on ignore l'erreur
    try {
      await expect(page).toHaveURL(/auth\/login/);
    } catch (error) {
      console.log('Le compte existe déjà, on saute cette étape.');
    }

    await browser.close();
  });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate('/auth/login');
    await loginPage.waitForPageLoad();
  });

  // TC-08 -> Vérifier la présence des champs email et mot de passe
  test('TC-08 - Vérifier la présence des champs email et mot de passe', { tag: '@smoke' }, async () => {
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();
  });

  // TC-09 -> Email inexistant affiche un message d'erreur
  test('TC-09 - Email inexistant affiche un message d\'erreur', { tag: '@regression' }, async () => {
    await loginPage.login('inconnu@test.com', 'QaP0rtf0li0!2026');
    await expect(loginPage.page.locator('[data-test="login-error"]')).toBeVisible();
    await expect(loginPage.page.locator('[data-test="login-error"]')).toContainText('E-mail ou mot de passe non valide');
  });

  // TC-10 -> Mauvais mot de passe affiche un message d'erreur
  test('TC-10 - Mauvais mot de passe affiche un message d\'erreur', { tag: '@regression' }, async () => {
    await loginPage.login('valide@test.com', 'MauvaisMdp!999');
    await expect(loginPage.page.locator('[data-test="login-error"]')).toBeVisible();
    await expect(loginPage.page.locator('[data-test="login-error"]')).toContainText('E-mail ou mot de passe non valide');
  });

  // TC-11 -> Email vide bloque la soumission
  test('TC-11 - Email vide bloque la soumission', { tag: '@regression' }, async () => {
    await loginPage.login('', 'QaP0rtf0li0!2026');
    await expect(loginPage.page.locator('[data-test="email-error"]')).toBeVisible();
    await expect(loginPage.page.locator('[data-test="email-error"]')).toContainText('L\'email est requis');
  });

  // TC-12 -> Mot de passe vide bloque la soumission
  test('TC-12 - Mot de passe vide bloque la soumission', { tag: '@regression' }, async () => {
    await loginPage.login('valide@test.com', '');
    await expect(loginPage.page.locator('[data-test="password-error"]')).toBeVisible();
    await expect(loginPage.page.locator('[data-test="password-error"]')).toContainText('Le mot de passe est requis');
  });

  // TC-13 -> Email mal formaté bloque la soumission
  test('TC-13 - Email mal formaté bloque la soumission', { tag: '@regression' }, async () => {
    await loginPage.login('yassine@', 'QaP0rtf0li0!2026');
    await expect(loginPage.page.locator('[data-test="email-error"]')).toBeVisible();
    await expect(loginPage.page.locator('[data-test="email-error"]')).toContainText('Le format de l\'email est invalide');
  });

  // TC-14 -> Login réussi redirige vers /account
  // Nécessite un compte créé au préalable via beforeAll
  test('TC-14 - Login réussi redirige vers /account', { tag: '@smoke' }, async () => {
    await loginPage.login(testEmail, testPassword);
    await expect(loginPage.page).toHaveURL(/account/);
  });

  // TC-15 -> Vérifier qu'un élément propre à /account est affiché après login
  test('TC-15 - Élément propre à /account affiché après login', { tag: '@smoke' }, async () => {
    await loginPage.login(testEmail, testPassword);
    await expect(loginPage.page.locator('[data-test="page-title"]')).toBeVisible();
  });

});