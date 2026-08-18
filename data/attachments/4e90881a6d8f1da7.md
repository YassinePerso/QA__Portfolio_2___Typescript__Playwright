# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Sprint_3___Panier/automatisation/tests/delete.spec.ts >> Suppression panier >> TC-015 - Total du panier mis à jour après suppression
- Location: Sprint_3___Panier/automatisation/tests/delete.spec.ts:63:3

# Error details

```
Error: expect(received).toBeLessThan(expected)

Expected: < 26.16
Received:   26.16
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
              - generic [ref=e27]: "2"
  - generic [ref=e30]:
    - list [ref=e32]:
      - listitem:
        - generic:
          - generic: Cart
          - generic: "1"
      - listitem:
        - generic:
          - generic: Sign in
          - generic: "2"
      - listitem:
        - generic:
          - generic: Address
          - generic: "3"
      - listitem:
        - generic:
          - generic: Payment
          - generic: "4"
    - generic [ref=e35]:
      - table [ref=e36]:
        - rowgroup [ref=e37]:
          - row [ref=e38]:
            - columnheader "Item" [ref=e39]
            - columnheader [ref=e40]
            - columnheader "Quantity" [ref=e41]
            - columnheader "Price" [ref=e42]
            - columnheader "Total" [ref=e43]
            - columnheader "Total" [ref=e44]
        - rowgroup [ref=e45]:
          - row [ref=e46]:
            - cell "Combination Pliers" [ref=e47]
            - cell [ref=e48]
            - cell [ref=e49]:
              - spinbutton [ref=e50]: "1"
            - cell "$14.15" [ref=e51]
            - cell "$00.00" [ref=e52]
            - cell "" [ref=e53]
          - row [ref=e56]:
            - cell "Pliers" [ref=e57]
            - cell [ref=e58]
            - cell [ref=e59]:
              - spinbutton [ref=e60]: "1"
            - cell "$12.01" [ref=e61]
            - cell "$00.00" [ref=e62]
            - cell "" [ref=e63]
        - rowgroup [ref=e66]:
          - row [ref=e67]:
            - cell [ref=e68]
            - cell [ref=e69]
            - cell [ref=e70]
            - cell [ref=e71]:
              - strong [ref=e72]: Total
            - cell "$26.16" [ref=e73]
            - cell [ref=e74]
      - button "Proceed to checkout" [ref=e76] [cursor=pointer]
  - paragraph [ref=e79]:
    - text: This is a DEMO application (
    - link "GitHub repo" [ref=e80] [cursor=pointer]:
      - /url: https://github.com/testsmith-io/practice-software-testing
    - text: ), used for software testing training purpose. | Banner photo by
    - link "Barn Images" [ref=e81] [cursor=pointer]:
      - /url: https://unsplash.com/@barnimages
    - text: "on"
    - link "Unsplash" [ref=e82] [cursor=pointer]:
      - /url: https://unsplash.com/photos/t5YUoHW6zRo
    - text: .
  - generic:
    - alert [ref=e83]:
      - generic [ref=e84]: Oeps, something went wrong.
    - alert [ref=e85]:
      - generic [ref=e86]: Oeps, something went wrong.
  - button "Open chat" [ref=e88] [cursor=pointer]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { CataloguePage } from '../../../Sprint_2___Catalogue/automatisation/pages/catalogue.page';
  3   | import { CartPage } from '../pages/cart.page';
  4   | import { URLS } from '../fixtures/test-data';
  5   | 
  6   | test.describe('Suppression panier', () => {
  7   | 
  8   |   let cataloguePage: CataloguePage;
  9   |   let cartPage: CartPage;
  10  | 
  11  |   test.beforeEach(async ({ page }) => {
  12  |     cataloguePage = new CataloguePage(page);
  13  |     cartPage = new CartPage(page);
  14  |     await cataloguePage.navigate(URLS.catalogue);
  15  |     await cataloguePage.waitForPageLoad();
  16  |     await cataloguePage.productNames.first().waitFor({ state: 'visible', timeout: 10000 });
  17  |   });
  18  | 
  19  |   // TC-013 - Vérifier la présence du bouton de suppression
  20  |   test('TC-013 - Vérifier la présence du bouton de suppression', { tag: '@smoke' }, async () => {
  21  |     await cataloguePage.productNames.first().click();
  22  |     await cataloguePage.page.waitForTimeout(500);
  23  |     await cartPage.addToCart();
  24  |     await cataloguePage.page.waitForTimeout(500);
  25  | 
  26  |     await cartPage.navigate(URLS.cart);
  27  |     await cartPage.waitForPageLoad();
  28  |     await cartPage.productTitles.first().waitFor({ state: 'visible', timeout: 10000 });
  29  | 
  30  |     await expect(cartPage.deleteButtons.first()).toBeVisible();
  31  |   });
  32  | 
  33  |   // TC-014 - Supprimer un produit parmi plusieurs
  34  |   test('TC-014 - Supprimer un produit parmi plusieurs', { tag: '@regression' }, async () => {
  35  |     const firstProductName = (await cataloguePage.productNames.nth(0).textContent())?.trim();
  36  | 
  37  |     await cataloguePage.productNames.nth(0).click();
  38  |     await cataloguePage.page.waitForTimeout(500);
  39  |     await cartPage.addToCart();
  40  |     await cataloguePage.page.waitForTimeout(500);
  41  | 
  42  |     await cataloguePage.navigate(URLS.catalogue);
  43  |     await cataloguePage.waitForPageLoad();
  44  |     await cataloguePage.productNames.first().waitFor({ state: 'visible', timeout: 10000 });
  45  | 
  46  |     await cataloguePage.productNames.nth(1).click();
  47  |     await cataloguePage.page.waitForTimeout(500);
  48  |     await cartPage.addToCart();
  49  |     await cataloguePage.page.waitForTimeout(500);
  50  | 
  51  |     await cartPage.navigate(URLS.cart);
  52  |     await cartPage.waitForPageLoad();
  53  |     await cartPage.productTitles.first().waitFor({ state: 'visible', timeout: 10000 });
  54  | 
  55  |     await cartPage.deleteButtons.first().click();
  56  |     await cartPage.page.waitForTimeout(500);
  57  | 
  58  |     const titlesAfter = await cartPage.getProductTitlesInCart();
  59  |     expect(titlesAfter.some(t => t.trim() === firstProductName)).toBe(false);
  60  |   });
  61  | 
  62  |   // TC-015 - Total du panier mis à jour après suppression
  63  |   test('TC-015 - Total du panier mis à jour après suppression', { tag: '@regression' }, async () => {
  64  |     await cataloguePage.productNames.nth(0).click();
  65  |     await cataloguePage.page.waitForTimeout(500);
  66  |     await cartPage.addToCart();
  67  |     await cataloguePage.page.waitForTimeout(500);
  68  | 
  69  |     await cataloguePage.navigate(URLS.catalogue);
  70  |     await cataloguePage.waitForPageLoad();
  71  |     await cataloguePage.productNames.first().waitFor({ state: 'visible', timeout: 10000 });
  72  | 
  73  |     await cataloguePage.productNames.nth(1).click();
  74  |     await cataloguePage.page.waitForTimeout(500);
  75  |     await cartPage.addToCart();
  76  |     await cataloguePage.page.waitForTimeout(500);
  77  | 
  78  |     await cartPage.navigate(URLS.cart);
  79  |     await cartPage.waitForPageLoad();
  80  |     await cartPage.productTitles.first().waitFor({ state: 'visible', timeout: 10000 });
  81  | 
  82  |     const totalBefore = await cartPage.getCartTotal();
  83  | 
  84  |     await cartPage.deleteButtons.first().click();
  85  |     await cartPage.page.waitForTimeout(500);
  86  | 
  87  |     const totalAfter = await cartPage.getCartTotal();
> 88  |     expect(totalAfter).toBeLessThan(totalBefore);
      |                        ^ Error: expect(received).toBeLessThan(expected)
  89  |   });
  90  | 
  91  |   // TC-016 - Supprimer le dernier produit
  92  |   test('TC-016 - Supprimer le dernier produit', { tag: '@regression' }, async () => {
  93  |     await cataloguePage.productNames.first().click();
  94  |     await cataloguePage.page.waitForTimeout(500);
  95  |     await cartPage.addToCart();
  96  |     await cataloguePage.page.waitForTimeout(500);
  97  | 
  98  |     await cartPage.navigate(URLS.cart);
  99  |     await cartPage.waitForPageLoad();
  100 |     await cartPage.productTitles.first().waitFor({ state: 'visible', timeout: 10000 });
  101 | 
  102 |     await cartPage.deleteButtons.first().click();
  103 |     await cartPage.page.waitForTimeout(500);
  104 | 
  105 |     const remainingProducts = await cartPage.productTitles.count();
  106 |     expect(remainingProducts).toBe(0);
  107 |   });
  108 | 
  109 | });
```