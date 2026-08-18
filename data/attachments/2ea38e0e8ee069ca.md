# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Sprint_4___Checkout/automatisation/tests/billing-address.spec.ts >> Billing Address >> TC-006 - Vérifier le titre de la section Billing Address
- Location: Sprint_4___Checkout/automatisation/tests/billing-address.spec.ts:69:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "Billing Address"
Received: "Blliling Adress"
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
      - listitem:
        - generic:
          - generic: Address
          - generic: "3"
      - listitem:
        - generic:
          - generic: Payment
          - generic: "4"
    - generic [ref=e41]:
      - text: 
      - generic [ref=e45]:
        - heading "Blliling Adress" [level=3] [ref=e46]
        - generic [ref=e47]:
          - textbox "Your Address *" [ref=e49]: 42 Rue de la Paix
          - textbox "Your City *" [ref=e51]: Pariss
          - textbox "Your State *" [ref=e53]: Île-de-France
          - textbox "Your Country *" [ref=e55]: FR
          - textbox "Your Postcode *" [ref=e57]: missing value
        - button [ref=e59] [cursor=pointer]
  - paragraph [ref=e62]:
    - text: This is a DEMO application (
    - link "GitHub repo" [ref=e63] [cursor=pointer]:
      - /url: https://github.com/testsmith-io/practice-software-testing
    - text: ), used for software testing training purpose. | Banner photo by
    - link "Barn Images" [ref=e64] [cursor=pointer]:
      - /url: https://unsplash.com/@barnimages
    - text: "on"
    - link "Unsplash" [ref=e65] [cursor=pointer]:
      - /url: https://unsplash.com/photos/t5YUoHW6zRo
    - text: .
  - alert [ref=e66]:
    - generic [ref=e67]: Oeps, something went wrong.
  - button "Open chat" [ref=e69] [cursor=pointer]
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
> 72 |     expect(titleText).toBe('Billing Address');
     |                       ^ Error: expect(received).toBe(expected) // Object.is equality
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