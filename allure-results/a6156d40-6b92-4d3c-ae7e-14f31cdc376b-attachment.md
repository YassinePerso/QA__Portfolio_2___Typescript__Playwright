# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Sprint_4___Checkout/automatisation/tests/payment-method.spec.ts >> Méthode de paiement >> TC-009 - Vérifier la présence du select de méthode de paiement
- Location: Sprint_4___Checkout/automatisation/tests/payment-method.spec.ts:74:3

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
  8  | test.describe('Méthode de paiement', () => {
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
  57 | 
  58 |     await checkoutPage.fillBillingAddress({
  59 |       address: TEST_USER.address,
  60 |       city: TEST_USER.city,
  61 |       state: TEST_USER.state,
  62 |       country: TEST_USER.country,
  63 |       postcode: TEST_USER.postcode,
  64 |     });
  65 |     await checkoutPage.page.waitForTimeout(1000);
  66 |     await checkoutPage.proceedToCheckoutStep3.waitFor({ state: 'visible', timeout: 10000 });
  67 |     await expect(checkoutPage.proceedToCheckoutStep3).toBeEnabled({ timeout: 10000 });
  68 |     await checkoutPage.proceedToCheckoutStep3.click();
  69 |     await checkoutPage.page.waitForTimeout(500);
  70 |     await checkoutPage.paymentMethodSelect.waitFor({ state: 'visible', timeout: 10000 });
  71 |   });
  72 | 
  73 |   // TC-009 - Vérifier la présence du select de méthode de paiement
  74 |   test('TC-009 - Vérifier la présence du select de méthode de paiement', { tag: '@smoke' }, async () => {
  75 |     await expect(checkoutPage.paymentMethodSelect).toBeVisible();
  76 |   });
  77 | 
  78 |   // TC-010 - Vérifier que toutes les options du select sont valides
  79 |   test('TC-010 - Vérifier que toutes les options du select sont valides', { tag: '@regression' }, async () => {
  80 |     const optionTexts = await checkoutPage.paymentMethodSelect.locator('option').allTextContents();
  81 |     const hasInvalidOption = optionTexts.some(text => /error|errror|missing/i.test(text));
  82 | 
  83 |     expect(hasInvalidOption).toBe(false);
  84 |   });
  85 | 
  86 |   // TC-011 - Sélectionner une méthode de paiement valide
  87 |   test('TC-011 - Sélectionner une méthode de paiement valide', { tag: '@smoke' }, async () => {
  88 |     const selectedValue = await checkoutPage.selectValidPaymentMethod();
  89 |     const currentValue = await checkoutPage.paymentMethodSelect.inputValue();
  90 | 
  91 |     expect(currentValue).toBe(selectedValue);
  92 |   });
  93 | 
  94 | });
```