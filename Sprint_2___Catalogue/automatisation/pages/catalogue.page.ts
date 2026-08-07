import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../../Sprint_1___Access-management/automatisation/pages/base.page';


export class CataloguePage extends BasePage {
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productNames: Locator;
  readonly sortSelect: Locator;
  readonly categoryHammer: Locator;
  readonly categoryHandSaw: Locator;
  readonly navChainsaws: Locator;
  readonly navCategoriesMenu: Locator;
  readonly brand1: Locator;
  readonly brand2: Locator;
  readonly ecoFriendlyFilter: Locator;
  readonly priceSliderMin: Locator;
  readonly priceSliderMax: Locator;
  readonly quantityInput: Locator;
  readonly quantityIncrease: Locator;
  readonly quantityDecrease: Locator;
  readonly addToFavourites: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('[data-test="search-query"]');
    this.searchButton = page.locator('[data-test="search-submit"]');
    this.productNames = page.locator('[data-test="product-name"]');
    this.sortSelect = page.locator('[data-test="sort"]');
    this.categoryHammer = page.locator('[data-test="category-3"]');
    this.categoryHandSaw = page.locator('[data-test="category-4"]');
    this.navChainsaws = page.locator('[data-test="nav-special-tools"]');
    this.navCategoriesMenu = page.locator('[data-test="nav-categories"]');
    this.brand1 = page.locator('[data-test="brand-1"]');
    this.brand2 = page.locator('[data-test="brand-2"]');
    this.ecoFriendlyFilter = page.locator('[data-test="eco-friendly-filter"]');
    this.priceSliderMin = page.locator('.ngx-slider-pointer-min');
    this.priceSliderMax = page.locator('.ngx-slider-pointer-max');
    this.quantityInput = page.locator('[data-test="quantity"]');
    this.quantityIncrease = page.locator('[data-test="increase-quantity"]');
    this.quantityDecrease = page.locator('[data-test="decrease-quantity"]');
    this.addToFavourites = page.locator('[data-test="add-to-favorites"]');
  }

  // Ajuste une poignée de slider ngx-slider au clavier (flèches), en lisant
  // la valeur réelle via aria-valuenow pour calculer le nombre de pressions
  // nécessaires. Pas de data-test disponible sur ce composant (pattern ARIA slider).
  async setSliderValue(handle: Locator, target: number): Promise<void> {
    await handle.focus();
    let current = parseInt(await handle.getAttribute('aria-valuenow') || '0', 10);
    const key = target > current ? 'ArrowRight' : 'ArrowLeft';
    const steps = Math.abs(target - current);

    for (let i = 0; i < steps; i++) {
      await handle.press(key);
    }

    current = parseInt(await handle.getAttribute('aria-valuenow') || '0', 10);
    if (current !== target) {
      throw new Error(`Slider non positionné à ${target} (obtenu: ${current})`);
    }
  }

  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchButton.click();
    await this.page.waitForTimeout(500); // laisse le temps au DOM de se mettre à jour
  }

  async sortBy(value: string): Promise<void> {
    await this.sortSelect.selectOption(value);
    await this.page.waitForTimeout(500); // laisse le temps à la liste de se réordonner
  }

  async getProductNamesText(): Promise<string[]> {
    return await this.productNames.allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const priceLocator = this.page.locator('[data-test="product-price"]');
    const texts = await priceLocator.allTextContents();
    return texts.map(t => parseFloat(t.replace(/[^0-9.]/g, '')));
  }

  async getCo2Ratings(): Promise<string[]> {
    const ratingLocator = this.page.locator('[data-test="co2-rating-badge"]');
    return await ratingLocator.allTextContents();
  }

  async getProductCount(): Promise<number> {
    return await this.productNames.count();
  }
}