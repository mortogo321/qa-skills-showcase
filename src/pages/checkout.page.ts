import type { Locator, Page } from '@playwright/test';

export interface CheckoutTotals {
  subtotal: number;
  tax: number;
  total: number;
}

export class CheckoutPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;
  readonly errorMessage: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
  }

  async goToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async fillInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueToOverview(): Promise<void> {
    await this.continueButton.click();
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }

  async completeHeaderText(): Promise<string> {
    return (await this.completeHeader.textContent())?.trim() ?? '';
  }

  async errorText(): Promise<string> {
    return (await this.errorMessage.textContent())?.trim() ?? '';
  }

  private static parseAmount(text: string): number {
    const match = text.match(/\$([0-9]+\.[0-9]{2})/);
    return match ? Number(match[1]) : NaN;
  }

  async totals(): Promise<CheckoutTotals> {
    const [subtotalText, taxText, totalText] = await Promise.all([
      this.subtotalLabel.textContent(),
      this.taxLabel.textContent(),
      this.totalLabel.textContent(),
    ]);
    return {
      subtotal: CheckoutPage.parseAmount(subtotalText ?? ''),
      tax: CheckoutPage.parseAmount(taxText ?? ''),
      total: CheckoutPage.parseAmount(totalText ?? ''),
    };
  }
}
