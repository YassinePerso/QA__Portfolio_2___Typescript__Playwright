# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Sprint_2___Catalogue/automatisation/tests/category.spec.ts >> Filtre par catégorie >> TC-018 - Aucune catégorie UNDEFINED dans l'interface
- Location: Sprint_2___Catalogue/automatisation/tests/category.spec.ts:71:3

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
          - 'link "ECO Combination Pliers CO₂: A B C D E $14.15" [ref=e141] [cursor=pointer]':
            - /url: "#/product/1"
            - generic [ref=e142]: ECO
            - generic [ref=e145]:
              - heading "Combination Pliers" [level=5] [ref=e146]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e147]:
                - text: "CO₂:"
                - generic [ref=e148]: A
                - generic [ref=e149]: B
                - generic [ref=e150]: C
                - generic [ref=e151]: D
                - generic [ref=e152]: E
            - generic [ref=e153]: $14.15
          - 'link "ECO Pliers CO₂: A B C D E $12.01" [ref=e155] [cursor=pointer]':
            - /url: "#/product/2"
            - generic [ref=e156]: ECO
            - generic [ref=e159]:
              - heading "Pliers" [level=5] [ref=e160]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e161]:
                - text: "CO₂:"
                - generic [ref=e162]: A
                - generic [ref=e163]: B
                - generic [ref=e164]: C
                - generic [ref=e165]: D
                - generic [ref=e166]: E
            - generic [ref=e167]: $12.01
          - 'link "ECO Bolt Cutters CO₂: A B C D E $48.41" [ref=e169] [cursor=pointer]':
            - /url: "#/product/3"
            - generic [ref=e170]: ECO
            - generic [ref=e173]:
              - heading "Bolt Cutters" [level=5] [ref=e174]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e175]:
                - text: "CO₂:"
                - generic [ref=e176]: A
                - generic [ref=e177]: B
                - generic [ref=e178]: C
                - generic [ref=e179]: D
                - generic [ref=e180]: E
            - generic [ref=e181]: $48.41
          - 'link "ECO Long Nose Pliers CO₂: A B C D E Out of stock $14.24" [ref=e183] [cursor=pointer]':
            - /url: "#/product/4"
            - generic [ref=e184]: ECO
            - generic [ref=e187]:
              - heading "Long Nose Pliers" [level=5] [ref=e188]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e189]:
                - text: "CO₂:"
                - generic [ref=e190]: A
                - generic [ref=e191]: B
                - generic [ref=e192]: C
                - generic [ref=e193]: D
                - generic [ref=e194]: E
            - generic [ref=e195]:
              - generic [ref=e196]: Out of stock
              - generic [ref=e197]: $14.24
          - 'link "ECO Slip Joint Pliers CO₂: A B C D E $9.17" [ref=e198] [cursor=pointer]':
            - /url: "#/product/5"
            - generic [ref=e199]: ECO
            - generic [ref=e201]:
              - heading "Slip Joint Pliers" [level=5] [ref=e202]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e203]:
                - text: "CO₂:"
                - generic [ref=e204]: A
                - generic [ref=e205]: B
                - generic [ref=e206]: C
                - generic [ref=e207]: D
                - generic [ref=e208]: E
            - generic [ref=e209]: $9.17
          - 'link "ECO Claw Hammer with Shock Reduction Grip CO₂: A B C D E $13.41" [ref=e211] [cursor=pointer]':
            - /url: "#/product/6"
            - generic [ref=e212]: ECO
            - generic [ref=e215]:
              - heading "Claw Hammer with Shock Reduction Grip" [level=5] [ref=e216]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e217]:
                - text: "CO₂:"
                - generic [ref=e218]: A
                - generic [ref=e219]: B
                - generic [ref=e220]: C
                - generic [ref=e221]: D
                - generic [ref=e222]: E
            - generic [ref=e223]: $13.41
          - 'link "ECO Hammer CO₂: A B C D E $12.58" [ref=e225] [cursor=pointer]':
            - /url: "#/product/7"
            - generic [ref=e226]: ECO
            - generic [ref=e229]:
              - heading "Hammer" [level=5] [ref=e230]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e231]:
                - text: "CO₂:"
                - generic [ref=e232]: A
                - generic [ref=e233]: B
                - generic [ref=e234]: C
                - generic [ref=e235]: D
                - generic [ref=e236]: E
            - generic [ref=e237]: $12.58
          - 'link "ECO Claw Hammer CO₂: A B C D E $11.48" [ref=e239] [cursor=pointer]':
            - /url: "#/product/8"
            - generic [ref=e240]: ECO
            - generic [ref=e243]:
              - heading "Claw Hammer" [level=5] [ref=e244]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e245]:
                - text: "CO₂:"
                - generic [ref=e246]: A
                - generic [ref=e247]: B
                - generic [ref=e248]: C
                - generic [ref=e249]: D
                - generic [ref=e250]: E
            - generic [ref=e251]: $11.48
          - 'link "ECO Thor Hammer CO₂: A B C D E $11.14" [ref=e253] [cursor=pointer]':
            - /url: "#/product/9"
            - generic [ref=e254]: ECO
            - generic [ref=e257]:
              - heading "Thor Hammer" [level=5] [ref=e258]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e259]:
                - text: "CO₂:"
                - generic [ref=e260]: A
                - generic [ref=e261]: B
                - generic [ref=e262]: C
                - generic [ref=e263]: D
                - generic [ref=e264]: E
            - generic [ref=e265]: $11.14
        - navigation "Pagination" [ref=e270]:
          - list [ref=e271]:
            - listitem [ref=e272]:
              - text: «
              - generic [ref=e273]:
                - text: Previous
                - generic [ref=e274]: page
            - listitem [ref=e275]:
              - generic [ref=e276]:
                - generic [ref=e277]: You're on page
                - text: "1"
            - listitem [ref=e278]:
              - generic [ref=e279] [cursor=pointer]:
                - generic [ref=e280]: page
                - text: "2"
            - listitem [ref=e281]:
              - generic [ref=e282] [cursor=pointer]:
                - generic [ref=e283]: page
                - text: "3"
            - listitem [ref=e284]:
              - generic [ref=e285] [cursor=pointer]:
                - text: Next
                - generic [ref=e286]: page
                - text: »
  - paragraph [ref=e289]:
    - text: This is a DEMO application (
    - link "GitHub repo" [ref=e290] [cursor=pointer]:
      - /url: https://github.com/testsmith-io/practice-software-testing
    - text: ), used for software testing training purpose. | Banner photo by
    - link "Barn Images" [ref=e291] [cursor=pointer]:
      - /url: https://unsplash.com/@barnimages
    - text: "on"
    - link "Unsplash" [ref=e292] [cursor=pointer]:
      - /url: https://unsplash.com/photos/t5YUoHW6zRo
    - text: .
  - button "Open chat" [ref=e294] [cursor=pointer]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { CataloguePage } from '../pages/catalogue.page';
  3  | import { URLS } from '../fixtures/test-data';
  4  | 
  5  | test.describe('Filtre par catégorie', () => {
  6  | 
  7  |   let cataloguePage: CataloguePage;
  8  | 
  9  | 
  10 |   test.beforeEach(async ({ page }) => {
  11 |     cataloguePage = new CataloguePage(page);
  12 |     await cataloguePage.navigate(URLS.catalogue);
  13 |     await cataloguePage.waitForPageLoad();
  14 |     await cataloguePage.productNames.first().waitFor({ state: 'visible', timeout: 10000 });
  15 |   });
  16 | 
  17 |   // TC-013 - Vérifier la présence des checkboxes de catégories
  18 |   test('TC-013 - Vérifier la présence des checkboxes de catégories', { tag: '@smoke' }, async () => {
  19 |     await expect(cataloguePage.categoryHammer).toBeVisible();
  20 |     await expect(cataloguePage.categoryHandSaw).toBeVisible();
  21 |   });
  22 | 
  23 |   // TC-014 - Cocher une catégorie - seuls les produits affichés
  24 |   test('TC-014 - Cocher une catégorie', { tag: '@regression' }, async () => {
  25 |     const countBefore = await cataloguePage.getProductCount();
  26 | 
  27 |     await cataloguePage.categoryHammer.check();
  28 |     await cataloguePage.page.waitForTimeout(1000);
  29 |     const countAfter = await cataloguePage.getProductCount();
  30 | 
  31 |     expect(countAfter).toBeGreaterThan(0);
  32 |     expect(countAfter).toBeLessThan(countBefore);
  33 |   });
  34 | 
  35 |   // TC-015 - Cocher plusieurs catégories (produits combinés)
  36 |   test('TC-015 - Cocher plusieurs catégories (produits combinés)', { tag: '@regression' }, async () => {
  37 |     await cataloguePage.categoryHammer.check();
  38 |     await cataloguePage.page.waitForTimeout(1000);
  39 |     const countHammerOnly = await cataloguePage.getProductCount();
  40 | 
  41 |     await cataloguePage.categoryHandSaw.check();
  42 |     await cataloguePage.page.waitForTimeout(1000); //Delai pour que le filtre soit appliqué et que le nombre de produits soit mis à jour
  43 |     const countCombined = await cataloguePage.getProductCount();
  44 | 
  45 |     expect(countCombined).toBeGreaterThanOrEqual(countHammerOnly);
  46 |   });
  47 | 
  48 |   // TC-016 - Décocher une catégorie (filtre retiré)
  49 |   test('TC-016 - Décocher une catégorie', { tag: '@regression' }, async () => {
  50 |     const countBefore = await cataloguePage.getProductCount();
  51 | 
  52 |     await cataloguePage.categoryHammer.check();
  53 |     await cataloguePage.page.waitForTimeout(1000);
  54 | 
  55 |     await cataloguePage.categoryHammer.uncheck();
  56 |     await cataloguePage.page.waitForTimeout(1000);
  57 |     const countAfter = await cataloguePage.getProductCount();
  58 | 
  59 |     expect(countAfter).toBe(countBefore);
  60 |   });
  61 | 
  62 |   // TC-017 - Nav catégorie valide (redirection correcte)
  63 |   test('TC-017 - Nav catégorie valide (redirection correcte)', { tag: '@regression' }, async ({ page }) => {
  64 |     await cataloguePage.navCategoriesMenu.click();
  65 |     await cataloguePage.navChainsaws.click();
  66 |     await expect(page.locator('text=404')).not.toBeVisible();
  67 |     await expect(cataloguePage.productNames.first()).toBeVisible();
  68 |   });
  69 | 
  70 |   // TC-018 - Aucune catégorie UNDEFINED dans l'interface
  71 |   test('TC-018 - Aucune catégorie UNDEFINED dans l\'interface', { tag: '@regression' }, async ({ page }) => {
  72 |     const categoryLabels = await page.locator('[data-test="nav-robotic-tools"]').allTextContents();
  73 |     const hasUndefined = categoryLabels.some(label => label.toUpperCase().includes('UNDEFINED'));
> 74 |     expect(hasUndefined).toBe(false);
     |                          ^ Error: expect(received).toBe(expected) // Object.is equality
  75 |   });
  76 | 
  77 | });
```