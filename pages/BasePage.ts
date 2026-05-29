import { Page, Locator } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly cartLink: Locator;
    readonly navMenu: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartLink = page.locator('[data-test="nav-cart"]');
        this.navMenu = page.locator('[data-test="nav-menu"]');
    }

    async navigateToCart() {
        await this.cartLink.click();
    }
}