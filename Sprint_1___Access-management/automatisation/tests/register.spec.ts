import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/register.page';
import { TEST_USER, URLS } from '../fixtures/test-data';

test.describe('Register', () => {

  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.navigate(URLS.register);
    await registerPage.waitForPageLoad();
  });

  // TC-001 → Vérifier la présence des champs obligatoires
  test('TC-001 - Vérifier la présence des champs obligatoires', { tag: '@smoke' }, async () => {
    await expect(registerPage.firstnameInput).toBeVisible();
    await expect(registerPage.lastnameInput).toBeVisible();
    await expect(registerPage.birthdateInput).toBeVisible();
    await expect(registerPage.countrySelect).toBeVisible();
    await expect(registerPage.postcodeInput).toBeVisible();
    await expect(registerPage.addressInput).toBeVisible();
    await expect(registerPage.cityInput).toBeVisible();
    await expect(registerPage.stateInput).toBeVisible();
    await expect(registerPage.phoneInput).toBeVisible();
    await expect(registerPage.emailInput).toBeVisible();
    await expect(registerPage.passwordInput).toBeVisible();
    await expect(registerPage.submitButton).toBeVisible();
  });

  // TC-002 → Register avec données valides
  test('TC-002 - Register avec données valides', { tag: '@smoke' }, async () => {
    await registerPage.fillForm({...TEST_USER, email: `yassine${Date.now()}@test.com`});
    await expect(registerPage.page).toHaveURL(URLS.login, { timeout: 15000 });
  });

  // TC-003 → Register avec email déjà utilisé
  test('TC-003 - Register avec email déjà utilisé', { tag: '@regression' }, async () => {

    const uniqueEmail = `test.${Date.now()}@test.com`;

    await registerPage.fillForm({ ...TEST_USER, email: uniqueEmail });
    await registerPage.page.waitForURL(URLS.login, { timeout: 15000 });
    await registerPage.navigate(URLS.register);
    await registerPage.waitForPageLoad();
    await registerPage.fillForm({ ...TEST_USER, email: uniqueEmail });

    await expect(registerPage.page.locator('[data-test="register-error"]')).toBeVisible();
    await expect(registerPage.page.locator('[data-test="register-error"]')).toContainText('User already registered');
  });

  // TC-004 → Register avec email mal formaté 
  test('TC-004 - Register avec email mal formaté', { tag: '@regression' }, async () => {
    await registerPage.fillForm({ ...TEST_USER, email: 'yassine@' });
    await expect(registerPage.page.locator('[data-test="email-error"]')).toBeVisible();
    await expect(registerPage.page.locator('[data-test="email-error"]')).toContainText('E-mail format is invalid.');
  });

  // TC-005 → Register avec champs obligatoires vides
  test('TC-005 - Register avec champs obligatoires vides', { tag: '@regression' }, async () => {
    await registerPage.fillForm({
      ...TEST_USER,
      firstname: '',
      email: `existant${Date.now()}@test.com`
    });
    await expect(registerPage.page.locator('[data-test="first-name-error"]')).toBeVisible();
    await expect(registerPage.page.locator('[data-test="first-name-error"]')).toContainText('First name is required.');
  });

  // TC-006 → Register avec date de naissance vide
  test('TC-006 - Register avec date de naissance vide', { tag: '@regression' }, async () => {
    await registerPage.fillForm({
      ...TEST_USER,
      birthdate: '',
      email: `existant${Date.now()}@test.com`
    });
    await expect(registerPage.page.locator('[data-test="dob-error"]')).toBeVisible();
    await expect(registerPage.page.locator('[data-test="dob-error"]')).toContainText('Date of Birth is required.');
  });

  // TC-007 → Mot de passe 8 caractères
  test('TC-007 - Mot de passe 8 caractères', { tag: '@regression' }, async () => {
    await registerPage.fillForm({
      ...TEST_USER,
      email: `yassine${Date.now()}@test.com`,
      password: 'Abcd123!' // 8 caractères
    });
    await expect(registerPage.page.locator('[data-test="password-error"]')).toBeVisible();
    await expect(registerPage.page.locator('[data-test="password-error"]')).toContainText('Password must be minimal 10 characters long.');
  });

  // TC-008 → Mot de passe 9 caractères
  test('TC-008 - Mot de passe 9 caractères', { tag: '@regression' }, async () => {
    await registerPage.fillForm({
      ...TEST_USER,
      email: `yassine${Date.now()}@test.com`,
      password: 'Abcd123!9' // 9 caractères
    });
    await expect(registerPage.page.locator('[data-test="password-error"]')).toBeVisible();
    await expect(registerPage.page.locator('[data-test="password-error"]')).toContainText('Password must be minimal 10 characters long.');
  });

  // TC-009 → Mot de passe 10 caractères
  test('TC-009 - Mot de passe 10 caractères', { tag: '@regression' }, async () => {
    await registerPage.fillForm({
      ...TEST_USER,
      email: `yassine${Date.now()}@test.com`,
      password: 'Abcd123!90' // 10 caractères
    });
    await expect(registerPage.page).toHaveURL(URLS.login, { timeout: 15000 });
  });

  // TC-010 → Mot de passe 11 caractères
  test('TC-010 - Mot de passe 11 caractères', { tag: '@regression' }, async () => {
    await registerPage.fillForm({
      ...TEST_USER,
      email: `yassine${Date.now()}@test.com`,
      password: 'Abcd123!901' // 11 caractères
    });
    await expect(registerPage.page).toHaveURL(URLS.login, { timeout: 15000 });
  });

});