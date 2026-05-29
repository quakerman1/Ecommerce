import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
});

test('successful login', async ({ page }) => {
    test.skip(!!process.env.CI, 'Skipped in CI due to security verification');
    await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
    await loginPage.navMenu.waitFor({ state: 'visible' });
    await expect(loginPage.navMenu).toBeVisible();
});

test('login with invalid credentials', async ({ page }) => {
    await loginPage.login('invalid@email.com', 'wrongpassword');
    await expect(loginPage.loginError).toBeVisible();
});

test('login with empty fields', async ({ page }) => {
    await loginPage.login('', '');
    await expect(loginPage.emailError).toBeVisible();
    await expect(loginPage.passwordError).toBeVisible();
});