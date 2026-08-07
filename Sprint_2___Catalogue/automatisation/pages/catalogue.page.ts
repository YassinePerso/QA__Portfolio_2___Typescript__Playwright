import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CataloguePage extends BasePage {
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productNames: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('[data-test="search-query"]');
    this.searchButton = page.locator('[data-test="search-submit"]');
    this.productNames = page.locator('[data-test="product-name"]');
  }

  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchButton.click();
    await this.page.waitForTimeout(500); // laisse le temps au DOM de se mettre à jour
  }

  async getProductCount(): Promise<number> {
    return await this.productNames.count();
  }
}