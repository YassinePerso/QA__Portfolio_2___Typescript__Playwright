import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../../Sprint_1___Access-management/automatisation/pages/base.page';

export class CartPage extends BasePage {
  readonly addToCartButton: Locator;
  readonly cartQuantityBadge: Locator;
  readonly productTitles: Locator;
  readonly productQuantities: Locator;
  readonly linePrices: Locator;
  readonly cartTotal: Locator;
  readonly deleteButtons: Locator;
  readonly proceedToCheckoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
    this.cartQuantityBadge = page.locator('[data-test="cart-quantity"]');
    this.productTitles = page.locator('[data-test="product-title"]');
    this.productQuantities = page.locator('[data-test="product-quantity"]');
    this.linePrices = page.locator('[data-test="line-price"]');
    this.cartTotal = page.locator('[data-test="cart-total"]');
    // Pas de data-test disponible sur ce bouton : ciblage par classe CSS + icône
    this.deleteButtons = page.locator('a.btn-danger:has(i.fa-remove)');
    this.proceedToCheckoutButton = page.locator('[data-test="proceed-1"]');
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async getCartQuantityBadge(): Promise<string> {
    return (await this.cartQuantityBadge.textContent())?.trim() ?? '';
  }

  async getProductTitlesInCart(): Promise<string[]> {
    return await this.productTitles.allTextContents();
  }

  async getProductQuantitiesInCart(): Promise<string[]> {
    const count = await this.productQuantities.count();
    const values: string[] = [];
    for (let i = 0; i < count; i++) {
      values.push(await this.productQuantities.nth(i).inputValue());
    }
    return values;
  }

  async getLinePrices(): Promise<number[]> {
    const texts = await this.linePrices.allTextContents();
    return texts.map(t => parseFloat(t.replace(/[^0-9.]/g, '')));
  }

  async getCartTotal(): Promise<number> {
    const text = await this.cartTotal.textContent();
    return parseFloat((text ?? '').replace(/[^0-9.]/g, ''));
  }
}