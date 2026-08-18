# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Sprint_1___Access-management/automatisation/tests/register.spec.ts >> Register >> TC-008 - Mot de passe 9 caractères
- Location: Sprint_1___Access-management/automatisation/tests/register.spec.ts:93:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-test="password-error"]')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('[data-test="password-error"]')

```

```yaml
- text: View the
- link "Documentation":
  - /url: https://testsmith-io.github.io/practice-software-testing/#/
- text: for this application. 🐛 Bug Hunting Mode - Find & Report Bugs!
- button "Bug Hunting Guide"
- navigation:
  - link "Practice Software Testing - Toolshop":
    - /url: /
    - img
  - menubar "Main menu":
    - menuitem "Home":
      - link "Home":
        - /url: "#/contact"
    - menuitem "Categories":
      - button "Categories"
    - menuitem "Contakt":
      - link "Contakt":
        - /url: "#/contact"
    - menuitem "Sign in":
      - link "Sign in":
        - /url: "#/auth/login"
- heading "Login" [level=3]
- textbox "Your E-mail *"
- textbox "Your password *"
- button ""
- button "Login"
- paragraph:
  - text: Not yet an account?
  - link "Register your account":
    - /url: "#/auth/register"
  - link "Forgot your Password?":
    - /url: "#/auth/forgot-password"
- paragraph:
  - text: This is a DEMO application (
  - link "GitHub repo":
    - /url: https://github.com/testsmith-io/practice-software-testing
  - text: ), used for software testing training purpose. | Banner photo by
  - link "Barn Images":
    - /url: https://unsplash.com/@barnimages
  - text: "on"
  - link "Unsplash":
    - /url: https://unsplash.com/photos/t5YUoHW6zRo
  - text: .
- button "Open chat":
  - img
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { RegisterPage } from '../pages/register.page';
  3   | import { TEST_USER, URLS } from '../fixtures/test-data';
  4   | 
  5   | test.describe('Register', () => {
  6   | 
  7   |   let registerPage: RegisterPage;
  8   | 
  9   |   test.beforeEach(async ({ page }) => {
  10  |     registerPage = new RegisterPage(page);
  11  |     await registerPage.navigate(URLS.register);
  12  |     await registerPage.waitForPageLoad();
  13  |   });
  14  | 
  15  |   // TC-001 → Vérifier la présence des champs obligatoires
  16  |   test('TC-001 - Vérifier la présence des champs obligatoires', { tag: '@smoke' }, async () => {
  17  |     await expect(registerPage.firstnameInput).toBeVisible();
  18  |     await expect(registerPage.lastnameInput).toBeVisible();
  19  |     await expect(registerPage.birthdateInput).toBeVisible();
  20  |     await expect(registerPage.countrySelect).toBeVisible();
  21  |     await expect(registerPage.postcodeInput).toBeVisible();
  22  |     await expect(registerPage.addressInput).toBeVisible();
  23  |     await expect(registerPage.cityInput).toBeVisible();
  24  |     await expect(registerPage.stateInput).toBeVisible();
  25  |     await expect(registerPage.phoneInput).toBeVisible();
  26  |     await expect(registerPage.emailInput).toBeVisible();
  27  |     await expect(registerPage.passwordInput).toBeVisible();
  28  |     await expect(registerPage.submitButton).toBeVisible();
  29  |   });
  30  | 
  31  |   // TC-002 > Register avec données valides
  32  |   test('TC-002 - Register avec données valides', { tag: '@smoke' }, async () => {
  33  |     await registerPage.fillForm({...TEST_USER, email: `yassine${Date.now()}@test.com`});
  34  |     await expect(registerPage.page).toHaveURL(URLS.login, { timeout: 15000 });
  35  |   });
  36  | 
  37  |   // TC-003 > Register avec email déjà utilisé
  38  |   test('TC-003 - Register avec email déjà utilisé', { tag: '@regression' }, async () => {
  39  | 
  40  |     const uniqueEmail = `test.${Date.now()}@test.com`;
  41  | 
  42  |     await registerPage.fillForm({ ...TEST_USER, email: uniqueEmail });
  43  |     await registerPage.page.waitForURL(URLS.login, { timeout: 15000 });
  44  |     await registerPage.navigate(URLS.register);
  45  |     await registerPage.waitForPageLoad();
  46  |     await registerPage.fillForm({ ...TEST_USER, email: uniqueEmail });
  47  | 
  48  |     await expect(registerPage.page.locator('[data-test="register-error"]')).toBeVisible();
  49  |     await expect(registerPage.page.locator('[data-test="register-error"]')).toContainText('User already registered');
  50  |   });
  51  | 
  52  |   // TC-004 > Register avec email mal formaté 
  53  |   test('TC-004 - Register avec email mal formaté', { tag: '@regression' }, async () => {
  54  |     await registerPage.fillForm({ ...TEST_USER, email: 'yassine@' });
  55  |     await expect(registerPage.page.locator('[data-test="email-error"]')).toBeVisible();
  56  |     await expect(registerPage.page.locator('[data-test="email-error"]')).toContainText('E-mail format is invalid.');
  57  |   });
  58  | 
  59  |   // TC-005 > Register avec champs obligatoires vides
  60  |   test('TC-005 - Register avec champs obligatoires vides', { tag: '@regression' }, async () => {
  61  |     await registerPage.fillForm({
  62  |       ...TEST_USER,
  63  |       firstname: '',
  64  |       email: `existant${Date.now()}@test.com`
  65  |     });
  66  |     await expect(registerPage.page.locator('[data-test="first-name-error"]')).toBeVisible();
  67  |     await expect(registerPage.page.locator('[data-test="first-name-error"]')).toContainText('First name is required.');
  68  |   });
  69  | 
  70  |   // TC-006 > Register avec date de naissance vide
  71  |   test('TC-006 - Register avec date de naissance vide', { tag: '@regression' }, async () => {
  72  |     await registerPage.fillForm({
  73  |       ...TEST_USER,
  74  |       birthdate: '',
  75  |       email: `existant${Date.now()}@test.com`
  76  |     });
  77  |     await expect(registerPage.page.locator('[data-test="dob-error"]')).toBeVisible();
  78  |     await expect(registerPage.page.locator('[data-test="dob-error"]')).toContainText('Date of Birth is required.');
  79  |   });
  80  | 
  81  |   // TC-007 > Mot de passe 8 caractères
  82  |   test('TC-007 - Mot de passe 8 caractères', { tag: '@regression' }, async () => {
  83  |     await registerPage.fillForm({
  84  |       ...TEST_USER,
  85  |       email: `yassine${Date.now()}@test.com`,
  86  |       password: 'Abcd123!' // 8 caractères
  87  |     });
  88  |     await expect(registerPage.page.locator('[data-test="password-error"]')).toBeVisible();
  89  |     await expect(registerPage.page.locator('[data-test="password-error"]')).toContainText('Password must be minimal 10 characters long.');
  90  |   });
  91  | 
  92  |   // TC-008 > Mot de passe 9 caractères
  93  |   test('TC-008 - Mot de passe 9 caractères', { tag: '@regression' }, async () => {
  94  |     await registerPage.fillForm({
  95  |       ...TEST_USER,
  96  |       email: `yassine${Date.now()}@test.com`,
  97  |       password: 'Abcd123!9' // 9 caractères
  98  |     });
> 99  |     await expect(registerPage.page.locator('[data-test="password-error"]')).toBeVisible();
      |                                                                             ^ Error: expect(locator).toBeVisible() failed
  100 |     await expect(registerPage.page.locator('[data-test="password-error"]')).toContainText('Password must be minimal 10 characters long.');
  101 |   });
  102 | 
  103 |   // TC-009 > Mot de passe 10 caractères
  104 |   test('TC-009 - Mot de passe 10 caractères', { tag: '@regression' }, async () => {
  105 |     await registerPage.fillForm({
  106 |       ...TEST_USER,
  107 |       email: `yassine${Date.now()}@test.com`,
  108 |       password: 'Abcd123!90' // 10 caractères
  109 |     });
  110 |     await expect(registerPage.page).toHaveURL(URLS.login, { timeout: 15000 });
  111 |   });
  112 | 
  113 |   // TC-010 > Mot de passe 11 caractères
  114 |   test('TC-010 - Mot de passe 11 caractères', { tag: '@regression' }, async () => {
  115 |     await registerPage.fillForm({
  116 |       ...TEST_USER,
  117 |       email: `yassine${Date.now()}@test.com`,
  118 |       password: 'Abcd123!901' // 11 caractères
  119 |     });
  120 |     await expect(registerPage.page).toHaveURL(URLS.login, { timeout: 15000 });
  121 |   });
  122 | 
  123 | });
```