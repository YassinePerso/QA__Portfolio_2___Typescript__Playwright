# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Sprint_1___Access-management/automatisation/tests/login.spec.ts >> Login >> TC-018 - Élément propre à /account affiché après login
- Location: Sprint_1___Access-management/automatisation/tests/login.spec.ts:87:3

# Error details

```
Error: browserType.launch: Executable doesn't exist at /home/yass/.cache/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell
╔════════════════════════════════════════════════════════════╗
║ Looks like Playwright was just installed or updated.       ║
║ Please run the following command to download new browsers: ║
║                                                            ║
║     npx playwright install                                 ║
║                                                            ║
║ <3 Playwright Team                                         ║
╚════════════════════════════════════════════════════════════╝
```

# Test source

```ts
  1  | import { test, expect, chromium } from '@playwright/test';
  2  | import { LoginPage } from '../pages/login.page';
  3  | import { RegisterPage } from '../pages/register.page';
  4  | import { TEST_USER, URLS } from '../fixtures/test-data';
  5  | 
  6  | test.describe('Login', () => {
  7  | 
  8  |   let loginPage: LoginPage;
  9  | 
  10 |   test.beforeAll(async () => {
> 11 |     const browser = await chromium.launch();
     |                                    ^ Error: browserType.launch: Executable doesn't exist at /home/yass/.cache/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell
  12 |     const context = await browser.newContext();
  13 |     const page = await context.newPage();
  14 |     const registerPage = new RegisterPage(page);
  15 | 
  16 |     await registerPage.navigate(URLS.register);
  17 |     await registerPage.waitForPageLoad();
  18 |     await registerPage.fillForm(TEST_USER);
  19 | 
  20 |     try {
  21 |       await page.waitForURL(`**${URLS.login}`, { timeout: 10000 });
  22 |     } catch {
  23 |       console.log('Compte déjà existant -> on continue');
  24 |     }
  25 | 
  26 |     await browser.close();
  27 |   });
  28 | 
  29 |   test.beforeEach(async ({ page }) => {
  30 |     loginPage = new LoginPage(page);
  31 |     await loginPage.navigate(URLS.login);
  32 |     await loginPage.waitForPageLoad();
  33 |   });
  34 | 
  35 |   // TC-011 - Vérifier la présence des champs email et mot de passe
  36 |   test('TC-011 - Vérifier la présence des champs email et mot de passe', { tag: '@smoke' }, async () => {
  37 |     await expect(loginPage.emailInput).toBeVisible();
  38 |     await expect(loginPage.passwordInput).toBeVisible();
  39 |     await expect(loginPage.submitButton).toBeVisible();
  40 |   });
  41 | 
  42 |   // TC-012 - Login avec email inexistant
  43 |   test('TC-012 - Login avec email inexistant', { tag: '@regression' }, async () => {
  44 |     await loginPage.login('inconnu@test.com', TEST_USER.password);
  45 |     await expect(loginPage.page.locator('[data-test="login-error"]')).toBeVisible();
  46 |     await expect(loginPage.page.locator('[data-test="login-error"]')).toContainText('Invalid email or password');
  47 |   });
  48 | 
  49 |   // TC-013 - Login avec mauvais mot de passe
  50 |   test('TC-013 - Login avec mauvais mot de passe', { tag: '@regression' }, async () => {
  51 |     await loginPage.login(TEST_USER.email, 'MauvaisMdp!999');
  52 |     await expect(loginPage.page.locator('[data-test="login-error"]')).toBeVisible();
  53 |     await expect(loginPage.page.locator('[data-test="login-error"]')).toContainText('Invalid email or password');
  54 |   });
  55 | 
  56 |   // TC-014 - Login avec email vide
  57 |   // Le site n'a pas de validation dédiée au champ email vide, il affiche le même message générique que pour des identifiants invalides.
  58 |   test('TC-014 - Login avec email vide', { tag: '@regression' }, async () => {
  59 |     await loginPage.login('', TEST_USER.password);
  60 |     await expect(loginPage.page.locator('[data-test="login-error"]')).toBeVisible();
  61 |     await expect(loginPage.page.locator('[data-test="login-error"]')).toContainText('Invalid email or password');
  62 |   });
  63 | 
  64 |   // TC-015 - Login avec mot de passe vide
  65 |   // Même comportement générique que TC-014 (message unique, pas de validation par champ)
  66 |   test('TC-015 - Login avec mot de passe vide', { tag: '@regression' }, async () => {
  67 |     await loginPage.login(TEST_USER.email, '');
  68 |     await expect(loginPage.page.locator('[data-test="login-error"]')).toBeVisible();
  69 |     await expect(loginPage.page.locator('[data-test="login-error"]')).toContainText('Invalid email or password');
  70 |   });
  71 | 
  72 |   // TC-016 - Login avec email mal formaté
  73 |   // Même comportement générique que TC-014 et TC015
  74 |   test('TC-016 - Login avec email mal formaté', { tag: '@regression' }, async () => {
  75 |     await loginPage.login('yassine@', TEST_USER.password);
  76 |     await expect(loginPage.page.locator('[data-test="login-error"]')).toBeVisible();
  77 |     await expect(loginPage.page.locator('[data-test="login-error"]')).toContainText('Invalid email or password');
  78 |   });
  79 | 
  80 |   // TC-017 - Login réussi > redirection /account
  81 |   test('TC-017 - Login réussi > redirection /account', { tag: '@smoke' }, async () => {
  82 |     await loginPage.login(TEST_USER.email, TEST_USER.password);
  83 |     await expect(loginPage.page).toHaveURL(URLS.account, { timeout: 15000 });
  84 |   });
  85 | 
  86 |   // TC-018 - Élément propre à /account affiché après login
  87 |   test('TC-018 - Élément propre à /account affiché après login', { tag: '@smoke' }, async () => {
  88 |     await loginPage.login(TEST_USER.email, TEST_USER.password);
  89 |     await loginPage.page.waitForURL(URLS.account, { timeout: 15000 });
  90 |     await expect(loginPage.page.locator('[data-test="page-title"]')).toBeVisible();
  91 |   });
  92 | 
  93 | });
```