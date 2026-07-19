import type { Locator, Page } from '@playwright/test';

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export class InventoryPage {
  readonly page: Page;
  readonly sortDropdown: Locator;
  readonly itemNames: Locator;
  readonly itemPriceLocators: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.itemPriceLocators = page.locator('[data-test="inventory-item-price"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/inventory.html');
  }

  async itemCount(): Promise<number> {
    return this.itemNames.count();
  }

  async itemNamesText(): Promise<string[]> {
    return this.itemNames.allTextContents();
  }

  async itemPrices(): Promise<number[]> {
    const texts = await this.itemPriceLocators.allTextContents();
    return texts.map((t) => Number(t.replace('$', '')));
  }

  async sortBy(option: SortOption): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async addToCart(productSlug: string): Promise<void> {
    await this.page.locator(`[data-test="add-to-cart-${productSlug}"]`).click();
  }

  async removeFromCart(productSlug: string): Promise<void> {
    await this.page.locator(`[data-test="remove-${productSlug}"]`).click();
  }

  async cartBadgeCount(): Promise<number> {
    if (!(await this.cartBadge.isVisible())) {
      return 0;
    }
    const text = await this.cartBadge.textContent();
    return Number(text ?? '0');
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
