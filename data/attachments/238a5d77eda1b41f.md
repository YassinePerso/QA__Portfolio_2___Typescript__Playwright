# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Sprint_2___Catalogue/automatisation/tests/sort.spec.ts >> Tri des produits >> TC-007 - Tri des noms de produits (A-Z)
- Location: Sprint_2___Catalogue/automatisation/tests/sort.spec.ts:21:3

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 5
+ Received  + 5

  Array [
-   " Bolt Cutters ",
-   " Claw Hammer ",
-   " Claw Hammer with Shock Reduction Grip ",
    " Combination Pliers ",
-   " Hammer ",
-   " Long Nose Pliers ",
    " Pliers ",
+   " Bolt Cutters ",
+   " Long Nose Pliers ",
    " Slip Joint Pliers ",
+   " Claw Hammer with Shock Reduction Grip ",
+   " Hammer ",
+   " Claw Hammer ",
    " Thor Hammer ",
  ]
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
          - option
          - option "Name (A - Z)" [selected]
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
          - button "Serch" [ref=e61] [cursor=pointer]
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
        - generic [ref=e140]:
          - 'link "Wood Saw CO₂: A B C D E $12.18" [ref=e141] [cursor=pointer]':
            - /url: "#/product/13"
            - generic [ref=e144]:
              - heading "Wood Saw" [level=5] [ref=e145]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e146]:
                - text: "CO₂:"
                - generic [ref=e147]: A
                - generic [ref=e148]: B
                - generic [ref=e149]: C
                - generic [ref=e150]: D
                - generic [ref=e151]: E
            - generic [ref=e152]: $12.18
          - 'link "ECO Thor Hammer CO₂: A B C D E $11.14" [ref=e154] [cursor=pointer]':
            - /url: "#/product/9"
            - generic [ref=e155]: ECO
            - generic [ref=e158]:
              - heading "Thor Hammer" [level=5] [ref=e159]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e160]:
                - text: "CO₂:"
                - generic [ref=e161]: A
                - generic [ref=e162]: B
                - generic [ref=e163]: C
                - generic [ref=e164]: D
                - generic [ref=e165]: E
            - generic [ref=e166]: $11.14
          - 'link "ECO Slip Joint Pliers CO₂: A B C D E $9.17" [ref=e168] [cursor=pointer]':
            - /url: "#/product/5"
            - generic [ref=e169]: ECO
            - generic [ref=e172]:
              - heading "Slip Joint Pliers" [level=5] [ref=e173]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e174]:
                - text: "CO₂:"
                - generic [ref=e175]: A
                - generic [ref=e176]: B
                - generic [ref=e177]: C
                - generic [ref=e178]: D
                - generic [ref=e179]: E
            - generic [ref=e180]: $9.17
          - 'link "ECO Sledgehammer CO₂: A B C D E $17.75" [ref=e182] [cursor=pointer]':
            - /url: "#/product/10"
            - generic [ref=e183]: ECO
            - generic [ref=e186]:
              - heading "Sledgehammer" [level=5] [ref=e187]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e188]:
                - text: "CO₂:"
                - generic [ref=e189]: A
                - generic [ref=e190]: B
                - generic [ref=e191]: C
                - generic [ref=e192]: D
                - generic [ref=e193]: E
            - generic [ref=e194]: $17.75
          - 'link "ECO Sheet Sander CO₂: A B C D E $58.48" [ref=e196] [cursor=pointer]':
            - /url: "#/product/19"
            - generic [ref=e197]: ECO
            - generic [ref=e200]:
              - heading "Sheet Sander" [level=5] [ref=e201]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e202]:
                - text: "CO₂:"
                - generic [ref=e203]: A
                - generic [ref=e204]: B
                - generic [ref=e205]: C
                - generic [ref=e206]: D
                - generic [ref=e207]: E
            - generic [ref=e208]: $58.48
          - 'link "ECO Random Orbit Sander CO₂: A B C D E $100.79" [ref=e210] [cursor=pointer]':
            - /url: "#/product/22"
            - generic [ref=e211]: ECO
            - generic [ref=e214]:
              - heading "Random Orbit Sander" [level=5] [ref=e215]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e216]:
                - text: "CO₂:"
                - generic [ref=e217]: A
                - generic [ref=e218]: B
                - generic [ref=e219]: C
                - generic [ref=e220]: D
                - generic [ref=e221]: E
            - generic [ref=e222]: $100.79
          - 'link "ECO Pliers CO₂: A B C D E $12.01" [ref=e224] [cursor=pointer]':
            - /url: "#/product/2"
            - generic [ref=e225]: ECO
            - generic [ref=e228]:
              - heading "Pliers" [level=5] [ref=e229]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e230]:
                - text: "CO₂:"
                - generic [ref=e231]: A
                - generic [ref=e232]: B
                - generic [ref=e233]: C
                - generic [ref=e234]: D
                - generic [ref=e235]: E
            - generic [ref=e236]: $12.01
          - 'link "Phillips Screwdriver CO₂: A B C D E $4.92" [ref=e238] [cursor=pointer]':
            - /url: "#/product/17"
            - generic [ref=e241]:
              - heading "Phillips Screwdriver" [level=5] [ref=e242]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e243]:
                - text: "CO₂:"
                - generic [ref=e244]: A
                - generic [ref=e245]: B
                - generic [ref=e246]: C
                - generic [ref=e247]: D
                - generic [ref=e248]: E
            - generic [ref=e249]: $4.92
          - 'link "ECO Open-end Spanners (Set) CO₂: A B C D E $38.51" [ref=e251] [cursor=pointer]':
            - /url: "#/product/16"
            - generic [ref=e252]: ECO
            - generic [ref=e255]:
              - heading "Open-end Spanners (Set)" [level=5] [ref=e256]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e257]:
                - text: "CO₂:"
                - generic [ref=e258]: A
                - generic [ref=e259]: B
                - generic [ref=e260]: C
                - generic [ref=e261]: D
                - generic [ref=e262]: E
            - generic [ref=e263]: $38.51
        - navigation "Pagination" [ref=e268]:
          - list [ref=e269]:
            - listitem [ref=e270]:
              - text: «
              - generic [ref=e271]:
                - text: Previous
                - generic [ref=e272]: page
            - listitem [ref=e273]:
              - generic [ref=e274]:
                - generic [ref=e275]: You're on page
                - text: "1"
            - listitem [ref=e276]:
              - generic [ref=e277] [cursor=pointer]:
                - generic [ref=e278]: page
                - text: "2"
            - listitem [ref=e279]:
              - generic [ref=e280] [cursor=pointer]:
                - generic [ref=e281]: page
                - text: "3"
            - listitem [ref=e282]:
              - generic [ref=e283] [cursor=pointer]:
                - text: Next
                - generic [ref=e284]: page
                - text: »
  - paragraph [ref=e287]:
    - text: This is a DEMO application (
    - link "GitHub repo" [ref=e288] [cursor=pointer]:
      - /url: https://github.com/testsmith-io/practice-software-testing
    - text: ), used for software testing training purpose. | Banner photo by
    - link "Barn Images" [ref=e289] [cursor=pointer]:
      - /url: https://unsplash.com/@barnimages
    - text: "on"
    - link "Unsplash" [ref=e290] [cursor=pointer]:
      - /url: https://unsplash.com/photos/t5YUoHW6zRo
    - text: .
  - button "Open chat" [ref=e292] [cursor=pointer]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { CataloguePage } from '../pages/catalogue.page';
  3  | import { URLS } from '../fixtures/test-data';
  4  | 
  5  | test.describe('Tri des produits', () => {
  6  | 
  7  |   let cataloguePage: CataloguePage;
  8  | 
  9  |   test.beforeEach(async ({ page }) => {
  10 |     cataloguePage = new CataloguePage(page);
  11 |     await cataloguePage.navigate(URLS.catalogue);
  12 |     await cataloguePage.waitForPageLoad();
  13 |   });
  14 | 
  15 |   // TC-006 - Vérifier la présence du select de tri
  16 |   test('TC-006 - Vérifier la présence du select de tri', { tag: '@smoke' }, async () => {
  17 |     await expect(cataloguePage.sortSelect).toBeVisible();
  18 |   });
  19 | 
  20 |   // TC-007 - Tri des noms de produits (A-Z)
  21 |   test('TC-007 - Tri des noms de produits (A-Z)', { tag: '@regression' }, async () => {
  22 |     await cataloguePage.sortBy('name,desc');
  23 |     const names = await cataloguePage.getProductNamesText();
  24 |     const sorted = [...names].sort((a, b) => a.localeCompare(b));
> 25 |     expect(names).toEqual(sorted);
     |                   ^ Error: expect(received).toEqual(expected) // deep equality
  26 |   });
  27 | 
  28 |   // TC-008 - Tri des noms de produits (Z-A)
  29 |   test('TC-008 - Tri des noms de produits (Z-A)', { tag: '@regression' }, async () => {
  30 |     await cataloguePage.sortBy('name,asc');
  31 |     const names = await cataloguePage.getProductNamesText();
  32 |     const sorted = [...names].sort((a, b) => b.localeCompare(a));
  33 |     expect(names).toEqual(sorted);
  34 |   });
  35 | 
  36 |   // TC-009 - Tri Price (High-Low)
  37 |   test('TC-009 - Tri Price (High-Low)', { tag: '@regression' }, async () => {
  38 |     await cataloguePage.sortBy('price,asc');
  39 |     const prices = await cataloguePage.getProductPrices();
  40 |     const sorted = [...prices].sort((a, b) => b - a);
  41 |     expect(prices).toEqual(sorted);
  42 |   });
  43 | 
  44 |   // TC-010 - Tri Price (Low-High)
  45 |   test('TC-010 - Tri Price (Low-High)', { tag: '@regression' }, async () => {
  46 |     await cataloguePage.sortBy('price,desc');
  47 |     const prices = await cataloguePage.getProductPrices();
  48 |     const sorted = [...prices].sort((a, b) => a - b);
  49 |     expect(prices).toEqual(sorted);
  50 |   });
  51 | 
  52 |   // TC-011 - Tri CO₂ Rating (Best First)
  53 |   test('TC-011 - Tri CO₂ Rating (Best First)', { tag: '@regression' }, async () => {
  54 |     await cataloguePage.sortBy('co2_rating,desc');
  55 |     const bestFirst = await cataloguePage.getCo2Ratings();
  56 | 
  57 |     await cataloguePage.sortBy('co2_rating,asc');
  58 |     const worstFirst = await cataloguePage.getCo2Ratings();
  59 | 
  60 |     expect(bestFirst).toEqual([...worstFirst].reverse());
  61 |   });
  62 | 
  63 |   // TC-012 - Tri CO₂ Rating (Worst First)
  64 |   test('TC-012 - Tri CO₂ Rating (Worst First)', { tag: '@regression' }, async () => {
  65 |     await cataloguePage.sortBy('co2_rating,asc');
  66 |     const worstFirst = await cataloguePage.getCo2Ratings();
  67 | 
  68 |     await cataloguePage.sortBy('co2_rating,desc');
  69 |     const bestFirst = await cataloguePage.getCo2Ratings();
  70 | 
  71 |     expect(worstFirst).toEqual([...bestFirst].reverse());
  72 |   });
  73 | 
  74 | });
```