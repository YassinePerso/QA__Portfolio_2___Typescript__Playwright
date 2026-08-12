# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Sprint_2___Catalogue/automatisation/tests/search.spec.ts >> Recherche produit >> TC-004 - Recherche vide
- Location: Sprint_2___Catalogue/automatisation/tests/search.spec.ts:35:3

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
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
  - generic [ref=e25]:
    - generic [ref=e26]:
      - paragraph [ref=e27]
      - separator [ref=e29]
    - generic [ref=e30]:
      - generic [ref=e31]:
        - heading " Sorth" [level=4] [ref=e32]:
          - generic [ref=e33]: 
          - text: Sorth
        - separator [ref=e34]
        - combobox [ref=e37]:
          - option [selected]
          - option "Name (A - Z)"
          - option "Name (Z - A)"
          - option "Price (High - Low)"
          - option "Price (Low - High)"
          - option "CO₂ Rating (Best First)"
          - option "CO₂ Rating (Worst First)"
        - heading " Price Range" [level=4] [ref=e38]:
          - generic [ref=e39]: 
          - text: Price Range
        - separator [ref=e40]
        - generic "ngx-slider" [ref=e42]:
          - slider "ngx-slider" [ref=e47] [cursor=pointer]
          - slider "ngx-slider-max" [ref=e48] [cursor=pointer]
          - generic [ref=e49]: "0"
          - generic [ref=e50]: "200"
          - generic [ref=e51]: "1"
          - generic [ref=e52]: "100"
        - heading "Search" [level=4] [ref=e54]
        - separator [ref=e56]
        - generic [ref=e58]:
          - textbox [ref=e59]
          - button "X" [ref=e60] [cursor=pointer]
          - button "Serch" [active] [ref=e61] [cursor=pointer]
        - heading " Filters" [level=4] [ref=e62]:
          - generic [ref=e63]: 
          - text: Filters
        - separator [ref=e64]
        - heading "By category:" [level=4] [ref=e65]
        - heading "By brand:" [level=4] [ref=e67]
        - heading "Sustainability:" [level=4] [ref=e69]
        - generic [ref=e71]:
          - checkbox "Show only eco-friendly products" [ref=e72]
          - text: Show only eco-friendly products
      - generic [ref=e73]:
        - text: 
        - generic:
          - generic:
            - generic:
              - navigation "Pagination"
  - paragraph [ref=e76]:
    - text: This is a DEMO application (
    - link "GitHub repo" [ref=e77] [cursor=pointer]:
      - /url: https://github.com/testsmith-io/practice-software-testing
    - text: ), used for software testing training purpose. | Banner photo by
    - link "Barn Images" [ref=e78] [cursor=pointer]:
      - /url: https://unsplash.com/@barnimages
    - text: "on"
    - link "Unsplash" [ref=e79] [cursor=pointer]:
      - /url: https://unsplash.com/photos/t5YUoHW6zRo
    - text: .
  - button "Open chat" [ref=e81] [cursor=pointer]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { CataloguePage } from '../pages/catalogue.page';
  3  | import { URLS } from '../fixtures/test-data';
  4  | 
  5  | test.describe('Recherche produit', () => {
  6  | 
  7  |   let cataloguePage: CataloguePage;
  8  | 
  9  |   test.beforeEach(async ({ page }) => {
  10 |     cataloguePage = new CataloguePage(page);
  11 |     await cataloguePage.navigate(URLS.catalogue);
  12 |     await cataloguePage.waitForPageLoad();
  13 |   });
  14 | 
  15 |   // TC-001 - Vérifier la présence de la barre de recherche
  16 |   test('TC-001 - Vérifier la présence de la barre de recherche', { tag: '@smoke' }, async () => {
  17 |     await expect(cataloguePage.searchInput).toBeVisible();
  18 |   });
  19 | 
  20 |   // TC-002 - Recherche avec terme valide
  21 |   test('TC-002 - Recherche avec terme valide', { tag: '@smoke' }, async () => {
  22 |     await cataloguePage.search('Combination Pliers');
  23 |     const count = await cataloguePage.getProductCount();
  24 |     expect(count).toBeGreaterThan(0);
  25 |   });
  26 | 
  27 |   // TC-003 - Recherche avec terme inexistant
  28 |   test('TC-003 - Recherche avec terme inexistant', { tag: '@regression' }, async () => {
  29 |     await cataloguePage.search('produitquinexistepasxyz123');
  30 |     const count = await cataloguePage.getProductCount();
  31 |     expect(count).toBe(0);
  32 |   });
  33 | 
  34 |   // TC-004 - Recherche vide
  35 |   test('TC-004 - Recherche vide', { tag: '@regression' }, async () => {
  36 |     const countBefore = await cataloguePage.getProductCount();
  37 |     await cataloguePage.search('');
  38 |     const countAfter = await cataloguePage.getProductCount();
  39 |     expect(countAfter).toBe(countBefore);
> 40 |     expect(countAfter).toBeGreaterThan(0);
     |                        ^ Error: expect(received).toBeGreaterThan(expected)
  41 |   });
  42 | 
  43 |   // TC-005 - Bouton de recherche présent
  44 |   test('TC-005 - Bouton de recherche présent', { tag: '@smoke' }, async () => {
  45 |     await expect(cataloguePage.searchButton).toBeVisible();
  46 |     await expect(cataloguePage.searchButton).toBeEnabled();
  47 |   });
  48 | 
  49 | });
```