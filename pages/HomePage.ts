import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly productCards: Locator;
    readonly noResultsMessage: Locator;

    
constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('[data-test="search-query"]');
    this.searchButton = page.locator('[data-test="search-submit"]');
    this.productCards = page.locator('.card');
    this.noResultsMessage = page.locator('[data-test="no-results"]');
}

async goto() {
    await this.page.goto('https://practicesoftwaretesting.com/');
}

async selectProduct(productName: string) {
    await this.productCards.filter({ hasText: productName }).first().click();
}

async search(query: string) {
    await this.searchInput.fill(query);
    await this.searchButton.click();
}

async filterByCategory(category: string) {
    await this.page.locator('[data-test="nav-categories"]').click();
    await this.page.locator(`[data-test="nav-${category}"]`).click();
}
    

}
