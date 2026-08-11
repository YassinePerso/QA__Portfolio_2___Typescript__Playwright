# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Sprint_2___Catalogue/automatisation/tests/search.spec.ts >> Recherche produit >> TC-003 - Recherche avec terme inexistant
- Location: Sprint_2___Catalogue/automatisation/tests/search.spec.ts:28:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 0
Received: 9
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
        - generic [ref=e66]:
          - generic [ref=e67]: Hand Tools
          - list [ref=e68]:
            - generic [ref=e70]:
              - checkbox "Hammer" [ref=e71]
              - text: Hammer
            - generic [ref=e73]:
              - checkbox "Hand Saw" [ref=e74]
              - text: Hand Saw
            - generic [ref=e76]:
              - checkbox "Wrench" [ref=e77]
              - text: Wrench
            - generic [ref=e79]:
              - checkbox "Screwdriver" [ref=e80]
              - text: Screwdriver
            - generic [ref=e82]:
              - checkbox "Pliers" [ref=e83]
              - text: Pliers
        - generic [ref=e84]:
          - generic [ref=e85]: Power Tools
          - list [ref=e86]:
            - generic [ref=e88]:
              - checkbox "Grinder" [ref=e89]
              - text: Grinder
            - generic [ref=e91]:
              - checkbox "Sander" [ref=e92]
              - text: Sander
            - generic [ref=e94]:
              - checkbox "Saw" [ref=e95]
              - text: Saw
            - generic [ref=e97]:
              - checkbox "Drill" [ref=e98]
              - text: Drill
        - generic [ref=e100]:
          - checkbox "Other" [ref=e101]
          - text: Other
        - heading "By brand:" [level=4] [ref=e103]
        - generic [ref=e105]:
          - checkbox "Brand name 1" [ref=e106]
          - text: Brand name 1
        - generic [ref=e108]:
          - checkbox "Brand name 2" [ref=e109]
          - text: Brand name 2
        - generic [ref=e111]:
          - checkbox "Brand name 3" [ref=e112]
          - text: Brand name 3
        - generic [ref=e114]:
          - checkbox "Brand name 4" [ref=e115]
          - text: Brand name 4
        - generic [ref=e117]:
          - checkbox "Brand name 5" [ref=e118]
          - text: Brand name 5
        - generic [ref=e120]:
          - checkbox "Brand name 6" [ref=e121]
          - text: Brand name 6
        - generic [ref=e123]:
          - checkbox "Brand name 7" [ref=e124]
          - text: Brand name 7
        - generic [ref=e126]:
          - checkbox "Brand name 8" [ref=e127]
          - text: Brand name 8
        - generic [ref=e129]:
          - checkbox "Brand name 9" [ref=e130]
          - text: Brand name 9
        - generic [ref=e132]:
          - checkbox "Brand name 10" [ref=e133]
          - text: Brand name 10
        - heading "Sustainability:" [level=4] [ref=e135]
        - generic [ref=e137]:
          - checkbox "Show only eco-friendly products" [ref=e138]
          - text: Show only eco-friendly products
      - generic [ref=e139]:
        - text: 
        - 'heading "Searched for: produitquinexistepasxyz123" [level=3] [ref=e140]'
        - paragraph [ref=e141]: 26 products found for 'produitquinexistepasxyz123'
        - generic [ref=e142]:
          - 'link "ECO Combination Pliers CO₂: A B C D E $14.15" [ref=e143] [cursor=pointer]':
            - /url: "#/product/1"
            - generic [ref=e144]: ECO
            - generic [ref=e147]:
              - heading "Combination Pliers" [level=5] [ref=e148]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e149]:
                - text: "CO₂:"
                - generic [ref=e150]: A
                - generic [ref=e151]: B
                - generic [ref=e152]: C
                - generic [ref=e153]: D
                - generic [ref=e154]: E
            - generic [ref=e155]: $14.15
          - 'link "ECO Pliers CO₂: A B C D E $12.01" [ref=e157] [cursor=pointer]':
            - /url: "#/product/2"
            - generic [ref=e158]: ECO
            - generic [ref=e161]:
              - heading "Pliers" [level=5] [ref=e162]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e163]:
                - text: "CO₂:"
                - generic [ref=e164]: A
                - generic [ref=e165]: B
                - generic [ref=e166]: C
                - generic [ref=e167]: D
                - generic [ref=e168]: E
            - generic [ref=e169]: $12.01
          - 'link "ECO Bolt Cutters CO₂: A B C D E $48.41" [ref=e171] [cursor=pointer]':
            - /url: "#/product/3"
            - generic [ref=e172]: ECO
            - generic [ref=e175]:
              - heading "Bolt Cutters" [level=5] [ref=e176]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e177]:
                - text: "CO₂:"
                - generic [ref=e178]: A
                - generic [ref=e179]: B
                - generic [ref=e180]: C
                - generic [ref=e181]: D
                - generic [ref=e182]: E
            - generic [ref=e183]: $48.41
          - 'link "ECO Long Nose Pliers CO₂: A B C D E Out of stock $14.24" [ref=e185] [cursor=pointer]':
            - /url: "#/product/4"
            - generic [ref=e186]: ECO
            - generic [ref=e189]:
              - heading "Long Nose Pliers" [level=5] [ref=e190]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e191]:
                - text: "CO₂:"
                - generic [ref=e192]: A
                - generic [ref=e193]: B
                - generic [ref=e194]: C
                - generic [ref=e195]: D
                - generic [ref=e196]: E
            - generic [ref=e197]:
              - generic [ref=e198]: Out of stock
              - generic [ref=e199]: $14.24
          - 'link "ECO Slip Joint Pliers CO₂: A B C D E $9.17" [ref=e200] [cursor=pointer]':
            - /url: "#/product/5"
            - generic [ref=e201]: ECO
            - generic [ref=e204]:
              - heading "Slip Joint Pliers" [level=5] [ref=e205]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e206]:
                - text: "CO₂:"
                - generic [ref=e207]: A
                - generic [ref=e208]: B
                - generic [ref=e209]: C
                - generic [ref=e210]: D
                - generic [ref=e211]: E
            - generic [ref=e212]: $9.17
          - 'link "ECO Claw Hammer with Shock Reduction Grip CO₂: A B C D E $13.41" [ref=e214] [cursor=pointer]':
            - /url: "#/product/6"
            - generic [ref=e215]: ECO
            - generic [ref=e218]:
              - heading "Claw Hammer with Shock Reduction Grip" [level=5] [ref=e219]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e220]:
                - text: "CO₂:"
                - generic [ref=e221]: A
                - generic [ref=e222]: B
                - generic [ref=e223]: C
                - generic [ref=e224]: D
                - generic [ref=e225]: E
            - generic [ref=e226]: $13.41
          - 'link "ECO Hammer CO₂: A B C D E $12.58" [ref=e228] [cursor=pointer]':
            - /url: "#/product/7"
            - generic [ref=e229]: ECO
            - generic [ref=e232]:
              - heading "Hammer" [level=5] [ref=e233]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e234]:
                - text: "CO₂:"
                - generic [ref=e235]: A
                - generic [ref=e236]: B
                - generic [ref=e237]: C
                - generic [ref=e238]: D
                - generic [ref=e239]: E
            - generic [ref=e240]: $12.58
          - 'link "ECO Claw Hammer CO₂: A B C D E $11.48" [ref=e242] [cursor=pointer]':
            - /url: "#/product/8"
            - generic [ref=e243]: ECO
            - generic [ref=e246]:
              - heading "Claw Hammer" [level=5] [ref=e247]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e248]:
                - text: "CO₂:"
                - generic [ref=e249]: A
                - generic [ref=e250]: B
                - generic [ref=e251]: C
                - generic [ref=e252]: D
                - generic [ref=e253]: E
            - generic [ref=e254]: $11.48
          - 'link "ECO Thor Hammer CO₂: A B C D E $11.14" [ref=e256] [cursor=pointer]':
            - /url: "#/product/9"
            - generic [ref=e257]: ECO
            - generic [ref=e260]:
              - heading "Thor Hammer" [level=5] [ref=e261]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e262]:
                - text: "CO₂:"
                - generic [ref=e263]: A
                - generic [ref=e264]: B
                - generic [ref=e265]: C
                - generic [ref=e266]: D
                - generic [ref=e267]: E
            - generic [ref=e268]: $11.14
        - navigation "Pagination" [ref=e273]:
          - list [ref=e274]:
            - listitem [ref=e275]:
              - text: «
              - generic [ref=e276]:
                - text: Previous
                - generic [ref=e277]: page
            - listitem [ref=e278]:
              - generic [ref=e279]:
                - generic [ref=e280]: You're on page
                - text: "1"
            - listitem [ref=e281]:
              - generic [ref=e282] [cursor=pointer]:
                - generic [ref=e283]: page
                - text: "2"
            - listitem [ref=e284]:
              - generic [ref=e285] [cursor=pointer]:
                - generic [ref=e286]: page
                - text: "3"
            - listitem [ref=e287]:
              - generic [ref=e288] [cursor=pointer]:
                - text: Next
                - generic [ref=e289]: page
                - text: »
  - paragraph [ref=e292]:
    - text: This is a DEMO application (
    - link "GitHub repo" [ref=e293] [cursor=pointer]:
      - /url: https://github.com/testsmith-io/practice-software-testing
    - text: ), used for software testing training purpose. | Banner photo by
    - link "Barn Images" [ref=e294] [cursor=pointer]:
      - /url: https://unsplash.com/@barnimages
    - text: "on"
    - link "Unsplash" [ref=e295] [cursor=pointer]:
      - /url: https://unsplash.com/photos/t5YUoHW6zRo
    - text: .
  - button "Open chat" [ref=e297] [cursor=pointer]
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
> 31 |     expect(count).toBe(0);
     |                   ^ Error: expect(received).toBe(expected) // Object.is equality
  32 |   });
  33 | 
  34 |   // TC-004 - Recherche vide
  35 |   test('TC-004 - Recherche vide', { tag: '@regression' }, async () => {
  36 |     const countBefore = await cataloguePage.getProductCount();
  37 |     await cataloguePage.search('');
  38 |     const countAfter = await cataloguePage.getProductCount();
  39 |     expect(countAfter).toBe(countBefore);
  40 |     expect(countAfter).toBeGreaterThan(0);
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