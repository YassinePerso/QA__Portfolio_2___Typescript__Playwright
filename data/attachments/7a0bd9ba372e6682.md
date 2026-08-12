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
        - heading "By brand:" [level=4] [ref=e67]
        - heading "Sustainability:" [level=4] [ref=e69]
        - generic [ref=e71]:
          - checkbox "Show only eco-friendly products" [ref=e72]
          - text: Show only eco-friendly products
      - generic [ref=e73]:
        - text: 
        - generic [ref=e74]:
          - 'link "ECO Combination Pliers CO₂: A B C D E $14.15" [ref=e75] [cursor=pointer]':
            - /url: "#/product/1"
            - generic [ref=e76]: ECO
            - generic [ref=e79]:
              - heading "Combination Pliers" [level=5] [ref=e80]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e81]:
                - text: "CO₂:"
                - generic [ref=e82]: A
                - generic [ref=e83]: B
                - generic [ref=e84]: C
                - generic [ref=e85]: D
                - generic [ref=e86]: E
            - generic [ref=e87]: $14.15
          - 'link "ECO Pliers CO₂: A B C D E $12.01" [ref=e89] [cursor=pointer]':
            - /url: "#/product/2"
            - generic [ref=e90]: ECO
            - generic [ref=e93]:
              - heading "Pliers" [level=5] [ref=e94]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e95]:
                - text: "CO₂:"
                - generic [ref=e96]: A
                - generic [ref=e97]: B
                - generic [ref=e98]: C
                - generic [ref=e99]: D
                - generic [ref=e100]: E
            - generic [ref=e101]: $12.01
          - 'link "ECO Bolt Cutters CO₂: A B C D E $48.41" [ref=e103] [cursor=pointer]':
            - /url: "#/product/3"
            - generic [ref=e104]: ECO
            - generic [ref=e107]:
              - heading "Bolt Cutters" [level=5] [ref=e108]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e109]:
                - text: "CO₂:"
                - generic [ref=e110]: A
                - generic [ref=e111]: B
                - generic [ref=e112]: C
                - generic [ref=e113]: D
                - generic [ref=e114]: E
            - generic [ref=e115]: $48.41
          - 'link "ECO Long Nose Pliers CO₂: A B C D E Out of stock $14.24" [ref=e117] [cursor=pointer]':
            - /url: "#/product/4"
            - generic [ref=e118]: ECO
            - generic [ref=e121]:
              - heading "Long Nose Pliers" [level=5] [ref=e122]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e123]:
                - text: "CO₂:"
                - generic [ref=e124]: A
                - generic [ref=e125]: B
                - generic [ref=e126]: C
                - generic [ref=e127]: D
                - generic [ref=e128]: E
            - generic [ref=e129]:
              - generic [ref=e130]: Out of stock
              - generic [ref=e131]: $14.24
          - 'link "ECO Slip Joint Pliers CO₂: A B C D E $9.17" [ref=e132] [cursor=pointer]':
            - /url: "#/product/5"
            - generic [ref=e133]: ECO
            - generic [ref=e135]:
              - heading "Slip Joint Pliers" [level=5] [ref=e136]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e137]:
                - text: "CO₂:"
                - generic [ref=e138]: A
                - generic [ref=e139]: B
                - generic [ref=e140]: C
                - generic [ref=e141]: D
                - generic [ref=e142]: E
            - generic [ref=e143]: $9.17
          - 'link "ECO Claw Hammer with Shock Reduction Grip CO₂: A B C D E $13.41" [ref=e145] [cursor=pointer]':
            - /url: "#/product/6"
            - generic [ref=e146]: ECO
            - generic [ref=e149]:
              - heading "Claw Hammer with Shock Reduction Grip" [level=5] [ref=e150]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e151]:
                - text: "CO₂:"
                - generic [ref=e152]: A
                - generic [ref=e153]: B
                - generic [ref=e154]: C
                - generic [ref=e155]: D
                - generic [ref=e156]: E
            - generic [ref=e157]: $13.41
          - 'link "ECO Hammer CO₂: A B C D E $12.58" [ref=e159] [cursor=pointer]':
            - /url: "#/product/7"
            - generic [ref=e160]: ECO
            - generic [ref=e163]:
              - heading "Hammer" [level=5] [ref=e164]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e165]:
                - text: "CO₂:"
                - generic [ref=e166]: A
                - generic [ref=e167]: B
                - generic [ref=e168]: C
                - generic [ref=e169]: D
                - generic [ref=e170]: E
            - generic [ref=e171]: $12.58
          - 'link "ECO Claw Hammer CO₂: A B C D E $11.48" [ref=e173] [cursor=pointer]':
            - /url: "#/product/8"
            - generic [ref=e174]: ECO
            - generic [ref=e177]:
              - heading "Claw Hammer" [level=5] [ref=e178]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e179]:
                - text: "CO₂:"
                - generic [ref=e180]: A
                - generic [ref=e181]: B
                - generic [ref=e182]: C
                - generic [ref=e183]: D
                - generic [ref=e184]: E
            - generic [ref=e185]: $11.48
          - 'link "ECO Thor Hammer CO₂: A B C D E $11.14" [ref=e187] [cursor=pointer]':
            - /url: "#/product/9"
            - generic [ref=e188]: ECO
            - generic [ref=e191]:
              - heading "Thor Hammer" [level=5] [ref=e192]
              - generic "Environmental impact rating (A=lowest, E=highest)" [ref=e193]:
                - text: "CO₂:"
                - generic [ref=e194]: A
                - generic [ref=e195]: B
                - generic [ref=e196]: C
                - generic [ref=e197]: D
                - generic [ref=e198]: E
            - generic [ref=e199]: $11.14
        - navigation "Pagination" [ref=e204]:
          - list [ref=e205]:
            - listitem [ref=e206]:
              - text: «
              - generic [ref=e207]:
                - text: Previous
                - generic [ref=e208]: page
            - listitem [ref=e209]:
              - generic [ref=e210]:
                - generic [ref=e211]: You're on page
                - text: "1"
            - listitem [ref=e212]:
              - generic [ref=e213] [cursor=pointer]:
                - generic [ref=e214]: page
                - text: "2"
            - listitem [ref=e215]:
              - generic [ref=e216] [cursor=pointer]:
                - generic [ref=e217]: page
                - text: "3"
            - listitem [ref=e218]:
              - generic [ref=e219] [cursor=pointer]:
                - text: Next
                - generic [ref=e220]: page
                - text: »
  - paragraph [ref=e223]:
    - text: This is a DEMO application (
    - link "GitHub repo" [ref=e224] [cursor=pointer]:
      - /url: https://github.com/testsmith-io/practice-software-testing
    - text: ), used for software testing training purpose. | Banner photo by
    - link "Barn Images" [ref=e225] [cursor=pointer]:
      - /url: https://unsplash.com/@barnimages
    - text: "on"
    - link "Unsplash" [ref=e226] [cursor=pointer]:
      - /url: https://unsplash.com/photos/t5YUoHW6zRo
    - text: .
  - button "Open chat" [ref=e228] [cursor=pointer]
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