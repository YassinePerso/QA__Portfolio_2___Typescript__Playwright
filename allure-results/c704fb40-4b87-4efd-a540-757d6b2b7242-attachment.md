# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Sprint_1___Access-management/automatisation/tests/navbar.spec.ts >> Menu utilisateur connecté >> TC-027 - Nom de l'utilisateur affiché dans le menu après connexion
- Location: Sprint_1___Access-management/automatisation/tests/navbar.spec.ts:21:3

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('[data-test="nav-user-menu"]')
Expected substring: "Yassine"
Received string:    " User Data not found "
Timeout: 5000ms

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('[data-test="nav-user-menu"]')
    8 × locator resolved to <a href="#" role="button" id="user-menu" aria-expanded="false" data-test="nav-user-menu" data-bs-toggle="dropdown" _ngcontent-ng-c2781432996="" class="nav-link dropdown-toggle"> User Data not found </a>
      - unexpected value " User Data not found "

```

```yaml
- button "User Data not found"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { LoginPage } from '../pages/login.page';
  3  | import { NavbarPage } from '../pages/navbar.page';
  4  | import { TEST_USER, URLS } from '../fixtures/test-data';
  5  | 
  6  | test.describe('Menu utilisateur connecté', () => {
  7  | 
  8  |   let loginPage: LoginPage;
  9  |   let navbarPage: NavbarPage;
  10 | 
  11 |   test.beforeEach(async ({ page }) => {
  12 |     loginPage = new LoginPage(page);
  13 |     navbarPage = new NavbarPage(page);
  14 |     await loginPage.navigate(URLS.login);
  15 |     await loginPage.waitForPageLoad();
  16 |     await loginPage.login(TEST_USER.email, TEST_USER.password);
  17 |     await page.waitForURL(`**${URLS.account}`, { timeout: 15000 });
  18 |   });
  19 | 
  20 |   // TC-027 - Nom de l'utilisateur affiché dans le menu après connexion
  21 |   test('TC-027 - Nom de l\'utilisateur affiché dans le menu après connexion', { tag: '@regression' }, async () => {
> 22 |     await expect(navbarPage.dropdownButton).toContainText(TEST_USER.firstname);
     |                                             ^ Error: expect(locator).toContainText(expected) failed
  23 |   });
  24 | 
  25 |   // TC-028 - Option de déconnexion visible dans le menu
  26 |   test('TC-028 - Option de déconnexion visible dans le menu', { tag: '@smoke' }, async () => {
  27 |     await navbarPage.clickDropdown();
  28 |     await expect(navbarPage.logoutButton).toBeVisible();
  29 |   });
  30 | 
  31 | });
```