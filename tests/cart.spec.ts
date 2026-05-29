import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

let productPage: ProductPage;
let cartPage: CartPage;
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    await homePage.goto();
    await homePage.selectProduct('Hammer');
});

test('add product to cart', async ({ page }) => {
    await productPage.addToCart(1);
    await productPage.navigateToCart(); 
    await cartPage.cartItems.first().waitFor({ state: 'visible' });
    const count = await cartPage.cartItems.count();
    expect(count).toBeGreaterThan(0);
});

test('update product quantity in cart', async ({ page }) => {
    await productPage.addToCart(1);
    await productPage.navigateToCart(); 
    await cartPage.updateQuantity('Hammer', 3);
    const quantity = await cartPage.quantityInput.inputValue();
    expect(quantity).toBe('3');
});

test('remove product from cart', async ({ page }) => {
    await productPage.addToCart(1);
    await productPage.navigateToCart(); 
    await cartPage.removeItem('Hammer');
    await expect(cartPage.emptyCartMessage).toBeVisible();
});

