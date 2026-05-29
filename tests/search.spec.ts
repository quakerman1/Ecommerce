import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

let homePage: HomePage;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
});


test('filter by category', async ({ page }) => {
    await homePage.filterByCategory('power-tools');
    await homePage.productCards.first().waitFor({ state: 'visible' });
    const count = await homePage.productCards.count();
    expect(count).toBeGreaterThan(0);
});

test('search existing product', async ({ page }) => {
    await homePage.search('Hammer');
    const count = await homePage.productCards.count();
    expect(count).toBeGreaterThan(0);
});

test('search non existing product', async ({ page }) => {
    await homePage.search('NonExistingProduct');
    await expect(homePage.noResultsMessage).toBeVisible();
});