# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Sprint_3___Panier/automatisation/tests/add-to-cart.spec.ts >> Add to cart >> TC-005 - Ajouter le même produit plusieurs fois
- Location: Sprint_3___Panier/automatisation/tests/add-to-cart.spec.ts:73:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "2"
Received: "1"
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
              - spinbutton [ref=e50]: "1"
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
      - button "Proceed to checkout" [ref=e66] [cursor=pointer]
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
  - generic:
    - alert [ref=e73]:
      - generic [ref=e74]: Oeps, something went wrong.
    - alert [ref=e75]:
      - generic [ref=e76]: Oeps, something went wrong.
  - button "Open chat" [ref=e78] [cursor=pointer]
```

# Test source

```ts
  2   | import { CataloguePage } from '../../../Sprint_2___Catalogue/automatisation/pages/catalogue.page';
  3   | import { CartPage } from '../pages/cart.page';
  4   | import { URLS } from '../fixtures/test-data';
  5   | 
  6   | test.describe('Add to cart', () => {
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
  19  |   // TC-001 - Vérifier la présence du bouton Add to cart
  20  |   test('TC-001 - Vérifier la présence du bouton Add to cart', { tag: '@smoke' }, async () => {
  21  |     await cataloguePage.productNames.first().click();
  22  |     await cataloguePage.page.waitForTimeout(500);
  23  | 
  24  |     await expect(cartPage.addToCartButton).toBeVisible();
  25  |   });
  26  | 
  27  |   // TC-002 - Ajouter un produit (présent dans le panier)
  28  |   test('TC-002 - Ajouter un produit (présent dans le panier)', { tag: '@smoke' }, async () => {
  29  |     const productName = (await cataloguePage.productNames.first().textContent())?.trim();
  30  |     await cataloguePage.productNames.first().click();
  31  |     await cataloguePage.page.waitForTimeout(500);
  32  | 
  33  |     await cartPage.addToCart();
  34  |     await cataloguePage.page.waitForTimeout(500);
  35  | 
  36  |     await cartPage.navigate(URLS.cart);
  37  |     await cartPage.waitForPageLoad();
  38  |     await cartPage.productTitles.first().waitFor({ state: 'visible', timeout: 10000 });
  39  | 
  40  |     const titlesInCart = await cartPage.getProductTitlesInCart();
  41  |     expect(titlesInCart.some(t => t.trim() === productName)).toBe(true);
  42  |   });
  43  | 
  44  |   // TC-004 - Ajouter plusieurs produits différents
  45  |   test('TC-004 - Ajouter plusieurs produits différents', { tag: '@regression' }, async () => {
  46  |     const firstProductName = (await cataloguePage.productNames.nth(0).textContent())?.trim();
  47  |     const secondProductName = (await cataloguePage.productNames.nth(1).textContent())?.trim();
  48  | 
  49  |     await cataloguePage.productNames.nth(0).click();
  50  |     await cataloguePage.page.waitForTimeout(500);
  51  |     await cartPage.addToCart();
  52  |     await cataloguePage.page.waitForTimeout(500);
  53  | 
  54  |     await cataloguePage.navigate(URLS.catalogue);
  55  |     await cataloguePage.waitForPageLoad();
  56  |     await cataloguePage.productNames.first().waitFor({ state: 'visible', timeout: 10000 });
  57  | 
  58  |     await cataloguePage.productNames.nth(1).click();
  59  |     await cataloguePage.page.waitForTimeout(500);
  60  |     await cartPage.addToCart();
  61  |     await cataloguePage.page.waitForTimeout(500);
  62  | 
  63  |     await cartPage.navigate(URLS.cart);
  64  |     await cartPage.waitForPageLoad();
  65  |     await cartPage.productTitles.first().waitFor({ state: 'visible', timeout: 10000 });
  66  | 
  67  |     const titlesInCart = await cartPage.getProductTitlesInCart();
  68  |     expect(titlesInCart.some(t => t.trim() === firstProductName)).toBe(true);
  69  |     expect(titlesInCart.some(t => t.trim() === secondProductName)).toBe(true);
  70  |   });
  71  | 
  72  |   // TC-005 - Ajouter le même produit plusieurs fois
  73  |   test('TC-005 - Ajouter le même produit plusieurs fois', { tag: '@regression' }, async () => {
  74  |     const productName = (await cataloguePage.productNames.first().textContent())?.trim();
  75  | 
  76  |     await cataloguePage.productNames.first().click();
  77  |     await cataloguePage.page.waitForTimeout(500);
  78  |     await cartPage.addToCart();
  79  |     await cataloguePage.page.waitForTimeout(500);
  80  | 
  81  |     await cataloguePage.navigate(URLS.catalogue);
  82  |     await cataloguePage.waitForPageLoad();
  83  |     await cataloguePage.productNames.first().waitFor({ state: 'visible', timeout: 10000 });
  84  | 
  85  |     await cataloguePage.productNames.first().click();
  86  |     await cataloguePage.page.waitForTimeout(500);
  87  |     await cartPage.addToCart();
  88  |     await cataloguePage.page.waitForTimeout(500);
  89  | 
  90  |     await cartPage.navigate(URLS.cart);
  91  |     await cartPage.waitForPageLoad();
  92  |     await cartPage.productTitles.first().waitFor({ state: 'visible', timeout: 10000 });
  93  | 
  94  |     const titles = await cartPage.getProductTitlesInCart();
  95  |     const matchingLines = titles.filter(t => t.trim() === productName);
  96  | 
  97  |     // Une seule ligne attendue pour ce produit et non deux lignes distinctes)
  98  |     expect(matchingLines.length).toBe(1);
  99  | 
  100 |     const quantities = await cartPage.getProductQuantitiesInCart();
  101 |     const indexOfProduct = titles.findIndex(t => t.trim() === productName);
> 102 |     expect(quantities[indexOfProduct]?.trim()).toBe('2');
      |                                                ^ Error: expect(received).toBe(expected) // Object.is equality
  103 |   });
  104 | 
  105 | });
```