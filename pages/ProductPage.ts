import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

    export class ProductPage extends BasePage {
        readonly quantityInput: Locator;
        readonly addToCartButton: Locator;
        
    constructor(page: Page) {
        super(page);
        this.quantityInput = page.locator('[data-test="quantity"]');
        this.addToCartButton = page.locator('[data-test="add-to-cart"]');
    }

    async goto(productId: string) {
        await this.page.goto(`https://practicesoftwaretesting.com/product/${productId}`);
    }   

    async addToCart(quantity: number) {
        await this.quantityInput.fill(quantity.toString());
        await this.addToCartButton.click();
    }


}