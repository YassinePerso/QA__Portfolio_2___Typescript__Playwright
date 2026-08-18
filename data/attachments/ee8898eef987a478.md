# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Sprint_4___Checkout/automatisation/tests/signin.spec.ts >> Sign In dans le checkout >> TC-004 - Register depuis le checkout (redirection vers Billing Address)
- Location: Sprint_4___Checkout/automatisation/tests/signin.spec.ts:80:3

# Error details

```
Error: expect(received).not.toContain(expected) // indexOf

Expected substring: not "/auth/login"
Received string:        "https://with-bugs.practicesoftwaretesting.com/#/auth/login"
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
            - link "Sign in" [ref=e23] [cursor=pointer]:
              - /url: "#/auth/login"
          - menuitem [ref=e24]:
            - link "cart" [ref=e25] [cursor=pointer]:
              - /url: "#/checkout"
              - generic [ref=e26]: 
              - generic [ref=e27]: "1"
  - generic [ref=e32]:
    - heading "Login" [level=3] [ref=e33]
    - generic [ref=e34]:
      - textbox "Your E-mail *" [ref=e36]
      - generic [ref=e39]:
        - textbox "Your password *" [ref=e40]
        - button "" [ref=e42] [cursor=pointer]
      - button "Login" [ref=e45] [cursor=pointer]
      - paragraph [ref=e47]:
        - text: Not yet an account?
        - link "Register your account" [ref=e48] [cursor=pointer]:
          - /url: "#/auth/register"
        - link "Forgot your Password?" [ref=e49] [cursor=pointer]:
          - /url: "#/auth/forgot-password"
  - paragraph [ref=e52]:
    - text: This is a DEMO application (
    - link "GitHub repo" [ref=e53] [cursor=pointer]:
      - /url: https://github.com/testsmith-io/practice-software-testing
    - text: ), used for software testing training purpose. | Banner photo by
    - link "Barn Images" [ref=e54] [cursor=pointer]:
      - /url: https://unsplash.com/@barnimages
    - text: "on"
    - link "Unsplash" [ref=e55] [cursor=pointer]:
      - /url: https://unsplash.com/photos/t5YUoHW6zRo
    - text: .
  - alert [ref=e56]:
    - generic [ref=e57]: Oeps, something went wrong.
  - button "Open chat" [ref=e59] [cursor=pointer]
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
  8  | test.describe('Sign In dans le checkout', () => {
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
  53 |   });
  54 | 
  55 |   // TC-001 - Vérifier que la section Sign In est accessible depuis le checkout
  56 |   test('TC-001 - Vérifier que la section Sign In est accessible depuis le checkout', { tag: '@smoke' }, async () => {
  57 |     await expect(checkoutPage.signInEmailInput).toBeVisible();
  58 |     await expect(checkoutPage.signInPasswordInput).toBeVisible();
  59 |     await expect(checkoutPage.loginSubmitButton).toBeVisible();
  60 |   });
  61 | 
  62 |   // TC-002 - Login avec credentials valides (accès vers Billing Address)
  63 |   test('TC-002 - Login avec credentials valides (accès vers Billing Address)', { tag: '@smoke' }, async () => {
  64 |     await checkoutPage.signInAndProceed(TEST_USER.email, TEST_USER.password);
  65 |     await checkoutPage.page.waitForTimeout(500);
  66 | 
  67 |     await expect(checkoutPage.billingAddressInput).toBeVisible();
  68 |   });
  69 | 
  70 |   // TC-003 - Login avec credentials invalides
  71 |   test('TC-003 - Login avec credentials invalides', { tag: '@regression' }, async () => {
  72 |     await checkoutPage.signIn(TEST_USER.email, 'MauvaisMdp!999');
  73 |     await checkoutPage.page.waitForTimeout(500);
  74 | 
  75 |     await expect(checkoutPage.loginErrorMessage).toBeVisible();
  76 |     await expect(checkoutPage.loginErrorMessage).toContainText('Invalid email or password');
  77 |   });
  78 | 
  79 |   // TC-004 - Register depuis le checkout (redirection vers Billing Address)
  80 |   test('TC-004 - Register depuis le checkout (redirection vers Billing Address)', { tag: '@regression' }, async ({ page }) => {
  81 |     await checkoutPage.registerLink.click();
  82 |     await checkoutPage.page.waitForTimeout(500);
  83 | 
  84 |     const registerPage = new RegisterPage(page);
  85 |     await registerPage.fillForm({
  86 |       ...TEST_USER,
  87 |       email: `yassine${Date.now()}@test.com`
  88 |     });
  89 |     await checkoutPage.page.waitForTimeout(500);
  90 | 
  91 |     // Résultat attendu > retour dans le parcours checkout, accès à Billing Address
> 92 |     expect(page.url()).not.toContain('/auth/login');
     |                            ^ Error: expect(received).not.toContain(expected) // indexOf
  93 |     await expect(checkoutPage.billingAddressInput).toBeVisible();
  94 |   });
  95 | 
  96 | });
```