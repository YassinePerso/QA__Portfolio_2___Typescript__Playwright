# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Sprint_3___Panier/automatisation/tests/total.spec.ts >> Total panier >> TC-012 - Total général = somme de tous les totaux par ligne
- Location: Sprint_3___Panier/automatisation/tests/total.spec.ts:61:3

# Error details

```
Error: expect(received).toBeCloseTo(expected, precision)

Expected: 0
Received: 26.16

Expected precision:    2
Expected difference: < 0.005
Received difference:   26.16
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
  1  | import { test, expect } from '@playwright/test';
  2  | import { CataloguePage } from '../../../Sprint_2___Catalogue/automatisation/pages/catalogue.page';
  3  | import { CartPage } from '../pages/cart.page';
  4  | import { URLS } from '../fixtures/test-data';
  5  | 
  6  | test.describe('Total panier', () => {
  7  | 
  8  |   let cataloguePage: CataloguePage;
  9  |   let cartPage: CartPage;
  10 | 
  11 |   test.beforeEach(async ({ page }) => {
  12 |     cataloguePage = new CataloguePage(page);
  13 |     cartPage = new CartPage(page);
  14 |     await cataloguePage.navigate(URLS.catalogue);
  15 |     await cataloguePage.waitForPageLoad();
  16 |     await cataloguePage.productNames.first().waitFor({ state: 'visible', timeout: 10000 });
  17 |   });
  18 | 
  19 |   // TC-010 - Total par ligne correct (prix × quantité initiale)
  20 |   test('TC-010 - Total par ligne correct (prix × quantité initiale)', { tag: '@regression' }, async () => {
  21 |     const unitPrices = await cataloguePage.getProductPrices();
  22 |     const unitPrice = unitPrices[0];
  23 | 
  24 |     await cataloguePage.productNames.first().click();
  25 |     await cataloguePage.page.waitForTimeout(500);
  26 |     await cartPage.addToCart();
  27 |     await cataloguePage.page.waitForTimeout(500);
  28 | 
  29 |     await cartPage.navigate(URLS.cart);
  30 |     await cartPage.waitForPageLoad();
  31 |     await cartPage.linePrices.first().waitFor({ state: 'visible', timeout: 10000 });
  32 | 
  33 |     const linePrices = await cartPage.getLinePrices();
  34 |     // Quantité initiale = 1, donc le total de ligne doit égaler le prix unitaire
  35 |     expect(linePrices[0]).toBeCloseTo(unitPrice, 2);
  36 |   });
  37 | 
  38 |   // TC-011 - Modifier la quantité (total par ligne mis à jour)
  39 |   test('TC-011 - Modifier la quantité (total par ligne mis à jour)', { tag: '@regression' }, async () => {
  40 |     const unitPrices = await cataloguePage.getProductPrices();
  41 |     const unitPrice = unitPrices[0];
  42 | 
  43 |     await cataloguePage.productNames.first().click();
  44 |     await cataloguePage.page.waitForTimeout(500);
  45 |     await cartPage.addToCart();
  46 |     await cataloguePage.page.waitForTimeout(500);
  47 | 
  48 |     await cartPage.navigate(URLS.cart);
  49 |     await cartPage.waitForPageLoad();
  50 |     await cartPage.productQuantities.first().waitFor({ state: 'visible', timeout: 10000 });
  51 | 
  52 |     await cartPage.productQuantities.first().fill('3');
  53 |     await cartPage.productQuantities.first().press('Tab');
  54 |     await cartPage.page.waitForTimeout(500);
  55 | 
  56 |     const linePrices = await cartPage.getLinePrices();
  57 |     expect(linePrices[0]).toBeCloseTo(unitPrice * 3, 2);
  58 |   });
  59 | 
  60 |   // TC-012 - Total général = somme de tous les totaux par ligne
  61 |   test('TC-012 - Total général = somme de tous les totaux par ligne', { tag: '@regression' }, async () => {
  62 |     // Ajoute deux produits différents pour avoir plusieurs lignes
  63 |     await cataloguePage.productNames.nth(0).click();
  64 |     await cataloguePage.page.waitForTimeout(500);
  65 |     await cartPage.addToCart();
  66 |     await cataloguePage.page.waitForTimeout(500);
  67 | 
  68 |     await cataloguePage.navigate(URLS.catalogue);
  69 |     await cataloguePage.waitForPageLoad();
  70 |     await cataloguePage.productNames.first().waitFor({ state: 'visible', timeout: 10000 });
  71 | 
  72 |     await cataloguePage.productNames.nth(1).click();
  73 |     await cataloguePage.page.waitForTimeout(500);
  74 |     await cartPage.addToCart();
  75 |     await cataloguePage.page.waitForTimeout(500);
  76 | 
  77 |     await cartPage.navigate(URLS.cart);
  78 |     await cartPage.waitForPageLoad();
  79 |     await cartPage.linePrices.first().waitFor({ state: 'visible', timeout: 10000 });
  80 | 
  81 |     const linePrices = await cartPage.getLinePrices();
  82 |     const sumOfLines = linePrices.reduce((sum, price) => sum + price, 0);
  83 |     const total = await cartPage.getCartTotal();
  84 | 
> 85 |     expect(total).toBeCloseTo(sumOfLines, 2);
     |                   ^ Error: expect(received).toBeCloseTo(expected, precision)
  86 |   });
  87 | 
  88 | });
```