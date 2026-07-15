import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/register.page';

 test.describe('Register', () => {

  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.navigate('/auth/register');
    await registerPage.waitForPageLoad();
  });
  
  // TC-01 -> Vérifie la présence des champs obligatoires
  test('TC-01 - Vérifier la présence des champs obligatoires', { tag: '@smoke' }, async () => {

    // Assertions
    await expect(registerPage.firstnameInput).toBeVisible();
    await expect(registerPage.lastnameInput).toBeVisible();
    await expect(registerPage.birthdateInput).toBeVisible();
    await expect(registerPage.countrySelect).toBeVisible();
    await expect(registerPage.postalcodeInput).toBeVisible();
    await expect(registerPage.streetnumberInput).toBeVisible();
    await expect(registerPage.streetnameInput).toBeVisible();
    await expect(registerPage.cityInput).toBeVisible();
    await expect(registerPage.stateInput).toBeVisible();
    await expect(registerPage.phonenumberInput).toBeVisible();
    await expect(registerPage.emailInput).toBeVisible();
    await expect(registerPage.passwordInput).toBeVisible();
    await expect(registerPage.submitButton).toBeVisible();
  });
  
  // TC-02 -> Email sans @
  test('TC-02 - Email sans @', { tag: '@regression' }, async () => {

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
      email: 'yassinegmail.com',
      password: 'QaP0rtf0li0!2026',
    });

    await expect(registerPage.page.locator('[data-test="email-error"]')).toBeVisible();
    await expect(registerPage.page.locator('[data-test="email-error"]')).toContainText('Le format de l\'email est invalide');
});


  // TC-03 -> Email sans domaine
  test('TC-03 - Email sans domaine', { tag: '@regression' }, async () => {

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
      email: 'yassine@',
      password: 'QaP0rtf0li0!2026',
    });

    await expect(registerPage.page.locator('[data-test="email-error"]')).toBeVisible();
    await expect(registerPage.page.locator('[data-test="email-error"]')).toContainText('Le format de l\'email est invalide');
});



    // TC-04 -> Mot de passe non-conforme (moins de 8 characters)
    // Ce test échoue intentionnellement - BUG documenté dans Jira
    // Le message affiché indique 6 caractères au lieu de 8
    test('TC-04 - Mots de passe non-conforme (- de 8 caractères)', { tag: '@regression' }, async () => {
  
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
        email: 'yassine@test.com',
        password: 'abc123',
      });

      await expect(registerPage.page.locator('[data-test="password-error"]')).toBeVisible();
      await expect(registerPage.page.locator('[data-test="password-error"]')).toContainText('Le mot de passe doit comporter au moins 8 caractères.');
    });



    // TC-05 -> Email déjà utilisé
    // Ce test échoue intentionnellement - BUG-002 documenté dans Jira
    // Le message s'affiche en anglais au lieu du français attendu
    test('TC-05 - Email déjà utilisé', { tag: '@regression' }, async () => {

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
        email: 'existant@test.com',
        password: 'QaP0rtf0li0!2026',
      });

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
        email: 'existant@test.com',
        password: 'QaP0rtf0li0!2026',
      });

      await expect(registerPage.page.locator('[data-test="register-error"]')).toBeVisible();
      await expect(registerPage.page.locator('[data-test="register-error"]')).toContainText('Un client utilisant cette adresse e-mail existe déjà.');
    })



    // TC-06 -> Champ obligatoire vide bloque la soumission du formulaire
    test('TC-06 - Champ "Prénom"obligatoire vide bloque la soumission du formulaire', { tag: '@regression' }, async () => {

      await registerPage.fillForm({
        firstname: '',
        lastname: 'Test',
        birthdate: '1990-01-01',
        country: 'France',
        postalcode: '75001',
        streetnumber: '42',
        streetname: 'Rue de la Paix',
        city: 'Paris',
        state: 'Île-de-France',
        phonenumber: '0600000000',
        email: 'existant123@test.com',
        password: 'QaP0rtf0li0!2026',
      });

      await expect(registerPage.page.locator('[data-test="first-name-error"]')).toBeVisible();
      await expect(registerPage.page.locator('[data-test="first-name-error"]')).toContainText('Le prénom est requis');
      });


    // TC-07 -> Création de compte réussie avec des données valides
    test('TC-07 - Création de compte réussie avec des données valides', { tag: '@smoke' }, async () => {

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
        email: `yassine${Date.now()}@test.com`, // Génère un email unique pour chaque test
        password: 'QaP0rtf0li0!2026',
      });

      await expect(registerPage.page).toHaveURL('/auth/login');
    });

});
