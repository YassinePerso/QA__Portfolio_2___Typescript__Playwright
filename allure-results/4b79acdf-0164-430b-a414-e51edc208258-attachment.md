# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Sprint_4___Checkout/automatisation/tests/payment-method.spec.ts >> Méthode de paiement >> TC-010 - Vérifier que toutes les options du select sont valides
- Location: Sprint_4___Checkout/automatisation/tests/payment-method.spec.ts:79:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: false
Received: true
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e3]:
    - text: View the
    - link "Documentation" [ref=e4] [cursor=pointer]:
      - /url: https://testsmith-io.github.io/practice-software-testing/#/
    - text: for this application.
  - generic [ref=e5]:
    - generic [ref=e7]:
      - generic [ref=e8]: 🐛 Bug Hunting Mode - Find & Report Bugs!
      - button "Bug Hunting Guide" [ref=e9] [cursor=pointer]
    - navigation [ref=e10]:
      - generic [ref=e11]:
        - link "Practice Software Testing - Toolshop" [ref=e12] [cursor=pointer]:
          - /url: /
        - menubar "Main menu" [ref=e15]:
          - menuitem [ref=e16]:
            - link "Home" [ref=e17] [cursor=pointer]:
              - /url: "#/contact"
          - menuitem [ref=e18]:
            - button "Categories" [ref=e19] [cursor=pointer]
          - menuitem [ref=e20]:
            - link "Contakt" [ref=e21] [cursor=pointer]:
              - /url: "#/contact"
          - menuitem [ref=e22]:
            - button "User Data not found" [ref=e23] [cursor=pointer]
          - menuitem [ref=e24]:
            - link "cart" [ref=e25] [cursor=pointer]:
              - /url: "#/checkout"
              - generic [ref=e26]: 
              - generic [ref=e27]: "1"
  - generic [ref=e30]:
    - list [ref=e32]:
      - listitem [ref=e33]:
        - generic [ref=e34] [cursor=pointer]:
          - generic [ref=e35]: Cart
          - generic [ref=e36]: "1"
      - listitem [ref=e37]:
        - generic [ref=e38] [cursor=pointer]:
          - generic [ref=e39]: Sign in
          - generic [ref=e40]: "2"
      - listitem [ref=e41]:
        - generic [ref=e42] [cursor=pointer]:
          - generic [ref=e43]: Address
          - generic [ref=e44]: "3"
      - listitem:
        - generic:
          - generic: Payment
          - generic: "4"
    - generic [ref=e45]:
      - text: 
      - generic [ref=e49]:
        - heading "Payment" [level=3] [ref=e50]
        - generic [ref=e51]:
          - combobox [ref=e53]:
            - option "Choose your payment method" [disabled] [selected]
            - option "Bank Transfer"
            - option "Cash on Delivery"
            - option "Credit Card"
            - option "Buy Now Pay Later"
            - option "Gift Card"
            - option "Errror 304 - Missing Payment Gateway"
          - textbox "Your Account name *" [ref=e55]
          - textbox "Your Account number *" [ref=e57]
        - generic [ref=e58]:
          - button "Confirm" [disabled]
  - paragraph [ref=e61]:
    - text: This is a DEMO application (
    - link "GitHub repo" [ref=e62] [cursor=pointer]:
      - /url: https://github.com/testsmith-io/practice-software-testing
    - text: ), used for software testing training purpose. | Banner photo by
    - link "Barn Images" [ref=e63] [cursor=pointer]:
      - /url: https://unsplash.com/@barnimages
    - text: "on"
    - link "Unsplash" [ref=e64] [cursor=pointer]:
      - /url: https://unsplash.com/photos/t5YUoHW6zRo
    - text: .
  - button "Open chat" [ref=e66] [cursor=pointer]
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
  15 |     const browser = await chromium.launch();
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
> 83 |     expect(hasInvalidOption).toBe(false);
     |                              ^ Error: expect(received).toBe(expected) // Object.is equality
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