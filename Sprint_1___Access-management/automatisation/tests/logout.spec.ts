import { test, expect, chromium } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { NavbarPage } from '../pages/navbar.page';
import { RegisterPage } from '../pages/register.page';

test.describe('Logout', () => {

  let loginPage: LoginPage;
  let navbarPage: NavbarPage;

  const testEmail = 'qa.portfolio.test@test.com';
  const testPassword = 'QaP0rtf0li0!2026';

  test.beforeAll(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({ locale: 'fr-FR' });
    const page = await context.newPage();
    const register = new RegisterPage(page);

    await register.navigate('/auth/register');
    await register.waitForPageLoad();
    await register.fillForm({
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

    try {
      await page.waitForURL('**/auth/login', { timeout: 10000 });
    } catch {
      console.log('Compte déjà existant — on continue');
    }

    await browser.close();
  });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    navbarPage = new NavbarPage(page);
    await loginPage.navigate('/auth/login');
    await loginPage.waitForPageLoad();
    await loginPage.login(testEmail, testPassword);
    await page.waitForURL('**/account', { timeout: 10000 });
  });

  // TC-16 -> Vérifier la présence du bouton déconnexion
  test('TC-16 - Vérifier la présence du bouton déconnexion', { tag: '@smoke' }, async () => {
    await navbarPage.dropdownButton.click();
    await expect(navbarPage.logoutButton).toBeVisible();
  });

  // TC-17 -> Logout redirige vers la page d'accueil ou login
  test('TC-17 - Logout redirige vers la page d\'accueil ou login', { tag: '@smoke' }, async () => {
    await navbarPage.logout();
    await expect(navbarPage.page).toHaveURL(/auth\/login|home/);
  });

  // TC-18 -> Accès /account après logout impossible
  test('TC-18 - Accès /account après logout impossible', { tag: '@regression' }, async () => {
    await navbarPage.logout();
    await navbarPage.page.goto('/account');
    await expect(navbarPage.page).toHaveURL(/auth\/login/);
  });

});