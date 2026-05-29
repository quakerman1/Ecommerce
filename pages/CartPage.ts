import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

    export class CartPage extends BasePage {
        readonly cartItems: Locator;
        readonly quantityInput: Locator;
        readonly removeButton: Locator;
        readonly emptyCartMessage: Locator;
        
    constructor(page: Page) {
        super(page);
        this.cartItems = this.page.locator('.table tbody tr');
        this.quantityInput = this.page.locator('[data-test="product-quantity"]');
        this.removeButton = this.page.locator('[data-test="remove-item"]');
        this.emptyCartMessage = this.page.getByText('The cart is empty. Nothing to display.');

    }

    async updateQuantity(productName: string, quantity: number) {
        const item = this.cartItems.filter({ hasText: productName });
        await item.locator('[data-test="product-quantity"]').fill(quantity.toString());
    }

    async removeItem(productName: string) {
        const item = this.cartItems.filter({ hasText: productName });
        await item.locator('.btn').click();
    }


}
