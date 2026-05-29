import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginError: Locator;
    readonly emailError: Locator;
    readonly passwordError: Locator;

    constructor(page: Page) {
        super(page);
        this.emailInput = page.locator('[data-test="email"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-submit"]');
        this.loginError = page.locator('[data-test="login-error"]');
        this.emailError = page.locator('[data-test="email-error"]');
        this.passwordError = page.locator('[data-test="password-error"]');
    }

    async goto() {
        await this.page.goto('https://practicesoftwaretesting.com');
        await this.page.locator('[data-test="nav-sign-in"]').click();
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}