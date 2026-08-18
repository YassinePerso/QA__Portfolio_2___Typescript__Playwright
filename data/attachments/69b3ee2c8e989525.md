# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Sprint_3___Panier/automatisation/tests/quantity-cart.spec.ts >> Quantité panier >> TC-009 - Quantité négative (soumission bloquée)
- Location: Sprint_3___Panier/automatisation/tests/quantity-cart.spec.ts:55:3

# Error details

```
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 0
Received:    -5
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
              - spinbutton [ref=e50]: "-5"
            - cell "$14.15" [ref=e51]
            - cell "$00.00" [ref=e52]
            - cell "" [ref=e53]
        - rowgroup [ref=e56]:
          - row [ref=e57]:
            - cell [ref=e58]
            - cell [ref=e59]
            - cell [ref=e60]
            - cell [ref=e61]:
              - strong [ref=e62]: Total
            - cell "$14.15" [ref=e63]
            - cell [ref=e64]
      - button "Proceed to checkout" [active] [ref=e66] [cursor=pointer]
  - paragraph [ref=e69]:
    - text: This is a DEMO application (
    - link "GitHub repo" [ref=e70] [cursor=pointer]:
      - /url: https://github.com/testsmith-io/practice-software-testing
    - text: ), used for software testing training purpose. | Banner photo by
    - link "Barn Images" [ref=e71] [cursor=pointer]:
      - /url: https://unsplash.com/@barnimages
    - text: "on"
    - link "Unsplash" [ref=e72] [cursor=pointer]:
      - /url: https://unsplash.com/photos/t5YUoHW6zRo
    - text: .
  - alert [ref=e73]:
    - generic [ref=e74]: Oeps, something went wrong.
  - button "Open chat" [ref=e76] [cursor=pointer]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { CataloguePage } from '../../../Sprint_2___Catalogue/automatisation/pages/catalogue.page';
  3  | import { CartPage } from '../pages/cart.page';
  4  | import { URLS } from '../fixtures/test-data';
  5  | 
  6  | test.describe('Quantité panier', () => {
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
  17 | 
  18 |     await cataloguePage.productNames.first().click();
  19 |     await cataloguePage.page.waitForTimeout(500);
  20 |     await cartPage.addToCart();
  21 |     await cataloguePage.page.waitForTimeout(500);
  22 | 
  23 |     await cartPage.navigate(URLS.cart);
  24 |     await cartPage.waitForPageLoad();
  25 |     await cartPage.productQuantities.first().waitFor({ state: 'visible', timeout: 10000 });
  26 |   });
  27 | 
  28 |   // TC-006 - Vérifier la présence du champ de quantité
  29 |   test('TC-006 - Vérifier la présence du champ de quantité', { tag: '@smoke' }, async () => {
  30 |     await expect(cartPage.productQuantities.first()).toBeVisible();
  31 |   });
  32 | 
  33 |   // TC-007 - Modifier la quantité (mise à jour correcte)
  34 |   test('TC-007 - Modifier la quantité (mise à jour correcte)', { tag: '@regression' }, async () => {
  35 |     await cartPage.productQuantities.first().fill('5');
  36 |     await cartPage.productQuantities.first().press('Tab'); // déclenche l'événement Tab pour changer le focus et mettre à jour la quantité
  37 |     await cartPage.page.waitForTimeout(500);
  38 | 
  39 |     const value = await cartPage.productQuantities.first().inputValue();
  40 |     expect(value).toBe('5');
  41 |   });
  42 | 
  43 |   // TC-008 - Quantité à 0 (soumission bloquée ou remise à 1)
  44 |   test('TC-008 - Quantité à 0 (soumission bloquée ou remise à 1)', { tag: '@regression' }, async () => {
  45 |     await cartPage.productQuantities.first().fill('0');
  46 |     await cartPage.productQuantities.first().press('Tab');
  47 |     await cartPage.page.waitForTimeout(500);
  48 | 
  49 |     const value = await cartPage.productQuantities.first().inputValue();
  50 |     // Comportement attendu > soit bloqué (reste à une valeur >= 1) soit remis à 1
  51 |     expect(Number(value)).toBeGreaterThanOrEqual(1);
  52 |   });
  53 | 
  54 |   // TC-009 - Quantité négative (soumission bloquée)
  55 |   test('TC-009 - Quantité négative (soumission bloquée)', { tag: '@regression' }, async () => {
  56 |     await cartPage.productQuantities.first().fill('-5');
  57 |     await cartPage.productQuantities.first().press('Tab');
  58 |     await cartPage.page.waitForTimeout(500);
  59 | 
  60 |     const value = await cartPage.productQuantities.first().inputValue();
> 61 |     expect(Number(value)).toBeGreaterThanOrEqual(0);
     |                           ^ Error: expect(received).toBeGreaterThanOrEqual(expected)
  62 |   });
  63 | 
  64 | });
```