# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Sprint_1___Access-management/automatisation/tests/logout.spec.ts >> Logout >> TC-025 - Session détruite après logout
- Location: Sprint_1___Access-management/automatisation/tests/logout.spec.ts:56:3

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
  3  | import { NavbarPage } from '../pages/navbar.page';
  4  | import { RegisterPage } from '../pages/register.page';
  5  | import { TEST_USER, URLS } from '../fixtures/test-data';
  6  | 
  7  | test.describe('Logout', () => {
  8  | 
  9  |   let loginPage: LoginPage;
  10 |   let navbarPage: NavbarPage;
  11 | 
  12 |   test.beforeAll(async () => {
> 13 |     const browser = await chromium.launch();
     |                                    ^ Error: browserType.launch: Executable doesn't exist at /home/yass/.cache/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell
  14 |     const context = await browser.newContext();
  15 |     const page = await context.newPage();
  16 |     const register = new RegisterPage(page);
  17 | 
  18 |     await register.navigate(URLS.register);
  19 |     await register.waitForPageLoad();
  20 |     await register.fillForm(TEST_USER);
  21 | 
  22 |     try {
  23 |       await page.waitForURL(`**${URLS.login}`, { timeout: 15000 });
  24 |       await page.waitForTimeout(2000); // Attendre que le compte soit bien enregistré
  25 |     } catch {
  26 |       console.log('Compte déjà existant > on continue');
  27 |     }
  28 | 
  29 |     await browser.close();
  30 |   });
  31 | 
  32 |   // beforeEach pour se connecter avant chaque test de logout
  33 |   test.beforeEach(async ({ page }) => {
  34 |     loginPage = new LoginPage(page);
  35 |     navbarPage = new NavbarPage(page);
  36 |     await loginPage.navigate(URLS.login);
  37 |     await loginPage.waitForPageLoad();
  38 |     await loginPage.login(TEST_USER.email, TEST_USER.password);
  39 |     await page.waitForURL(`**${URLS.account}`, { timeout: 15000 });
  40 |     await page.waitForLoadState('networkidle');
  41 |   });
  42 | 
  43 |   // TC-023 - Vérifier la présence du bouton de déconnexion
  44 |   test('TC-023 - Vérifier la présence du bouton de déconnexion', { tag: '@smoke' }, async () => {
  45 |     await navbarPage.dropdownButton.click();
  46 |     await expect(navbarPage.logoutButton).toBeVisible();
  47 |   });
  48 | 
  49 |   // TC-024 - Logout > redirection vers /auth/login
  50 |   test('TC-024 - Logout > redirection vers /auth/login', { tag: '@smoke' }, async () => {
  51 |     await navbarPage.logout();
  52 |     await expect(navbarPage.page).toHaveURL(/auth\/login/);
  53 |   });
  54 | 
  55 |   // TC-025 - Session détruite après logout
  56 |   test('TC-025 - Session détruite après logout', { tag: '@regression' }, async ({ page }) => {
  57 |     await navbarPage.logout();
  58 |     await page.goto(URLS.account);
  59 |     await expect(page).toHaveURL(URLS.login);
  60 |   });
  61 | 
  62 |   // TC-026 - Accès /account après logout
  63 |   test('TC-026 - Accès /account après logout', { tag: '@regression' }, async () => {
  64 |     await navbarPage.logout();
  65 |     await navbarPage.page.goto(URLS.account);
  66 |     await expect(navbarPage.page).toHaveURL(/auth\/login/);
  67 |   });
  68 | 
  69 | });
```