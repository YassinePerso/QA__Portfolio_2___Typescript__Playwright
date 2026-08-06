import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ForgotPasswordPage } from '../pages/forgot-password.page';
import { URLS } from '../fixtures/test-data';

test.describe('Forgot your password', () => {

  let loginPage: LoginPage;
  let forgotPasswordPage: ForgotPasswordPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    forgotPasswordPage = new ForgotPasswordPage(page);
    await loginPage.navigate(URLS.login);
    await loginPage.waitForPageLoad();
  });

  // TC-019 - Lien Forgot your password visible sur la page Login
  test('TC-019 - Lien Forgot your password visible sur la page Login', { tag: '@smoke' }, async () => {
    await expect(loginPage.forgotPasswordLink).toBeVisible();
  });

  // TC-020 - Email valide enregistré > réinitialisation initiée
  // Reste MANUEL > nécessite vérification externe (email réel)

  // TC-021 - Email inexistant > message d'erreur
  test('TC-021 - Email inexistant', { tag: '@regression' }, async () => {
    await loginPage.forgotPasswordLink.click();
    await forgotPasswordPage.requestReset('inconnu@test.com');
    const bodyText = await forgotPasswordPage.page.locator('body').innerText();
    expect(bodyText).not.toContain('successfully updated');
  });

  // TC-022 - Champ email vide
  test('TC-022 - Champ email vide', { tag: '@regression' }, async () => {
    await loginPage.forgotPasswordLink.click();
    await forgotPasswordPage.clickSubmit();
    const bodyText = await forgotPasswordPage.page.locator('body').innerText();
    expect(bodyText).not.toContain('successfully updated');
  });

});