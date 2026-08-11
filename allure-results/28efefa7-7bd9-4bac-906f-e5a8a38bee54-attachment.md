# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Sprint_4___Checkout/automatisation/tests/billing-address.spec.ts >> Billing Address >> TC-006 - Vérifier le titre de la section Billing Address
- Location: Sprint_4___Checkout/automatisation/tests/billing-address.spec.ts:69:3

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
  2  | import { CataloguePage } from '../../../Sprint_2___Catalogue/automatisation/pages/catalogue.page';
  3  | import { CartPage } from '../../../Sprint_3___Panier/automatisation/pages/cart.page';
  4  | import { CheckoutPage } from '../pages/checkout.page';
  5  | import { RegisterPage } from '../../../Sprint_1___Access-management/automatisation/pages/register.page';
  6  | import { TEST_USER, URLS } from '../fixtures/test-data';
  7  | 
  8  | test.describe('Billing Address', () => {
  9  | 
  10 |   let cataloguePage: CataloguePage;
  11 |   let cartPage: CartPage;
  12 |   let checkoutPage: CheckoutPage;
  13 | 
  14 |   test.beforeAll(async () => {
> 15 |     const browser = await chromium.launch();
     |                                    ^ Error: browserType.launch: Executable doesn't exist at /home/yass/.cache/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell
  16 |     const context = await browser.newContext();
  17 |     const page = await context.newPage();
  18 |     const registerPage = new RegisterPage(page);
  19 | 
  20 |     await registerPage.navigate(URLS.register);
  21 |     await registerPage.waitForPageLoad();
  22 |     await registerPage.fillForm(TEST_USER);
  23 | 
  24 |     try {
  25 |       await page.waitForURL(`**${URLS.login}`, { timeout: 10000 });
  26 |     } catch {
  27 |       console.log('Compte déjà existant -> on continue');
  28 |     }
  29 | 
  30 |     await browser.close();
  31 |   });
  32 | 
  33 |   test.beforeEach(async ({ page }) => {
  34 |     cataloguePage = new CataloguePage(page);
  35 |     cartPage = new CartPage(page);
  36 |     checkoutPage = new CheckoutPage(page);
  37 | 
  38 |     await cataloguePage.navigate(URLS.catalogue);
  39 |     await cataloguePage.waitForPageLoad();
  40 |     await cataloguePage.productNames.first().waitFor({ state: 'visible', timeout: 10000 });
  41 | 
  42 |     await cataloguePage.productNames.first().click();
  43 |     await cataloguePage.page.waitForTimeout(500);
  44 |     await cartPage.addToCart();
  45 |     await cataloguePage.page.waitForTimeout(500);
  46 | 
  47 |     await cartPage.navigate(URLS.cart);
  48 |     await cartPage.waitForPageLoad();
  49 |     await cartPage.productTitles.first().waitFor({ state: 'visible', timeout: 10000 });
  50 | 
  51 |     await cartPage.proceedToCheckoutButton.click();
  52 |     await cartPage.page.waitForTimeout(500);
  53 | 
  54 |     await checkoutPage.signInAndProceed(TEST_USER.email, TEST_USER.password);
  55 |     await checkoutPage.page.waitForTimeout(500);
  56 |     await checkoutPage.billingAddressInput.waitFor({ state: 'visible', timeout: 10000 });
  57 |   });
  58 | 
  59 |   // TC-005 - Vérifier la présence des 5 champs obligatoires
  60 |   test('TC-005 - Vérifier la présence des 5 champs obligatoires', { tag: '@smoke' }, async () => {
  61 |     await expect(checkoutPage.billingAddressInput).toBeVisible();
  62 |     await expect(checkoutPage.billingCityInput).toBeVisible();
  63 |     await expect(checkoutPage.billingStateInput).toBeVisible();
  64 |     await expect(checkoutPage.billingCountryInput).toBeVisible();
  65 |     await expect(checkoutPage.billingPostcodeInput).toBeVisible();
  66 |   });
  67 | 
  68 |   // TC-006 - Vérifier le titre de la section Billing Address
  69 |   test('TC-006 - Vérifier le titre de la section Billing Address', { tag: '@regression' }, async ({ page }) => {
  70 |     const heading = page.locator('h1, h2, h3', { hasText: /adress|address/i }).first();
  71 |     const titleText = (await heading.textContent())?.trim();
  72 |     expect(titleText).toBe('Billing Address');
  73 |   });
  74 | 
  75 |   // TC-007 - Champs obligatoires vides
  76 |   test('TC-007 - Champs obligatoires vides', { tag: '@regression' }, async () => {
  77 |     await expect(checkoutPage.proceedToCheckoutStep3).toBeDisabled(); // Le bouton est désactivé tant que les champs obligatoires sont vides
  78 |   });
  79 | 
  80 |   // TC-008 - Formulaire complet (passage vers Payment)
  81 |   test('TC-008 - Formulaire complet (passage vers Payment)', { tag: '@smoke' }, async () => {
  82 |     await checkoutPage.fillBillingAddress({
  83 |       address: TEST_USER.address,
  84 |       city: TEST_USER.city,
  85 |       state: TEST_USER.state,
  86 |       country: TEST_USER.country,
  87 |       postcode: TEST_USER.postcode,
  88 |     });
  89 |     await checkoutPage.proceedToCheckoutStep3.click();
  90 |     await checkoutPage.page.waitForTimeout(500);
  91 | 
  92 |     await expect(checkoutPage.billingAddressInput).not.toBeVisible();
  93 |   });
  94 | 
  95 | });
```