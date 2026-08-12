# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Sprint_4___Checkout/automatisation/tests/payment-info.spec.ts >> Informations de paiement >> TC-013 - Champs vides
- Location: Sprint_4___Checkout/automatisation/tests/payment-info.spec.ts:83:3

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
  1   | import { test, expect, chromium } from '@playwright/test';
  2   | import { CataloguePage } from '../../../Sprint_2___Catalogue/automatisation/pages/catalogue.page';
  3   | import { CartPage } from '../../../Sprint_3___Panier/automatisation/pages/cart.page';
  4   | import { CheckoutPage } from '../pages/checkout.page';
  5   | import { RegisterPage } from '../../../Sprint_1___Access-management/automatisation/pages/register.page';
  6   | import { TEST_USER, URLS } from '../fixtures/test-data';
  7   | 
  8   | test.describe('Informations de paiement', () => {
  9   | 
  10  |   let cataloguePage: CataloguePage;
  11  |   let cartPage: CartPage;
  12  |   let checkoutPage: CheckoutPage;
  13  | 
  14  |   test.beforeAll(async () => {
> 15  |     const browser = await chromium.launch();
      |                                    ^ Error: browserType.launch: Executable doesn't exist at /home/yass/.cache/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell
  16  |     const context = await browser.newContext();
  17  |     const page = await context.newPage();
  18  |     const registerPage = new RegisterPage(page);
  19  | 
  20  |     await registerPage.navigate(URLS.register);
  21  |     await registerPage.waitForPageLoad();
  22  |     await registerPage.fillForm(TEST_USER);
  23  | 
  24  |     try {
  25  |       await page.waitForURL(`**${URLS.login}`, { timeout: 10000 });
  26  |     } catch {
  27  |       console.log('Compte déjà existant -> on continue');
  28  |     }
  29  | 
  30  |     await browser.close();
  31  |   });
  32  | 
  33  |   test.beforeEach(async ({ page }) => {
  34  |     cataloguePage = new CataloguePage(page);
  35  |     cartPage = new CartPage(page);
  36  |     checkoutPage = new CheckoutPage(page);
  37  | 
  38  |     await cataloguePage.navigate(URLS.catalogue);
  39  |     await cataloguePage.waitForPageLoad();
  40  |     await cataloguePage.productNames.first().waitFor({ state: 'visible', timeout: 10000 });
  41  | 
  42  |     await cataloguePage.productNames.first().click();
  43  |     await cataloguePage.page.waitForTimeout(500);
  44  |     await cartPage.addToCart();
  45  |     await cataloguePage.page.waitForTimeout(500);
  46  | 
  47  |     await cartPage.navigate(URLS.cart);
  48  |     await cartPage.waitForPageLoad();
  49  |     await cartPage.productTitles.first().waitFor({ state: 'visible', timeout: 10000 });
  50  | 
  51  |     await cartPage.proceedToCheckoutButton.click();
  52  |     await cartPage.page.waitForTimeout(500);
  53  | 
  54  |     await checkoutPage.signInAndProceed(TEST_USER.email, TEST_USER.password);
  55  |     await checkoutPage.page.waitForTimeout(500);
  56  |     await checkoutPage.billingAddressInput.waitFor({ state: 'visible', timeout: 10000 });
  57  | 
  58  |     await checkoutPage.fillBillingAddress({
  59  |       address: TEST_USER.address,
  60  |       city: TEST_USER.city,
  61  |       state: TEST_USER.state,
  62  |       country: TEST_USER.country,
  63  |       postcode: TEST_USER.postcode,
  64  |     });
  65  |     await checkoutPage.page.waitForTimeout(1000);
  66  |     await checkoutPage.proceedToCheckoutStep3.waitFor({ state: 'visible', timeout: 10000 });
  67  |     await expect(checkoutPage.proceedToCheckoutStep3).toBeEnabled({ timeout: 10000 });
  68  |     await checkoutPage.proceedToCheckoutStep3.click();
  69  |     await checkoutPage.page.waitForTimeout(500);
  70  |     await checkoutPage.paymentMethodSelect.waitFor({ state: 'visible', timeout: 10000 });
  71  | 
  72  |     await checkoutPage.selectValidPaymentMethod();
  73  |     await checkoutPage.page.waitForTimeout(500);
  74  |   });
  75  | 
  76  |   // TC-012 - Vérifier la présence des champs Account name et Account number
  77  |   test('TC-012 - Vérifier la présence des champs Account name et Account number', { tag: '@smoke' }, async () => {
  78  |     await expect(checkoutPage.accountNameInput).toBeVisible();
  79  |     await expect(checkoutPage.accountNumberInput).toBeVisible();
  80  |   });
  81  | 
  82  |   // TC-013 - Champs vides
  83  |   test('TC-013 - Champs vides', { tag: '@regression' }, async () => {
  84  |     await expect(checkoutPage.finishButton).toBeDisabled();
  85  |   });
  86  | 
  87  |   // TC-014 - Champs remplis (accès à la confirmation)
  88  |   test('TC-014 - Champs remplis (accès à la confirmation)', { tag: '@smoke' }, async () => {
  89  |     await checkoutPage.accountNameInput.fill(`${TEST_USER.firstname} ${TEST_USER.lastname}`);
  90  |     await checkoutPage.accountNumberInput.fill('1234567890');
  91  |     await checkoutPage.page.waitForTimeout(500);
  92  | 
  93  |     await expect(checkoutPage.finishButton).toBeEnabled();
  94  |     await checkoutPage.finishButton.click();
  95  |     await checkoutPage.page.waitForTimeout(500);
  96  | 
  97  |     await expect(checkoutPage.paymentSuccessMessage).toBeVisible();     // Vérifie l'accès à la confirmation
  98  |   });
  99  | 
  100 | });
```