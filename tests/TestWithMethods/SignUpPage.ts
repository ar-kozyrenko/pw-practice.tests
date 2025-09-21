import { test, expect, Page } from '@playwright/test'

export const SignUpPage = {
    signUpPage: 'https://demo.learnwebdriverio.com/register',
    
    signUpTestUserEmail: 'test002@mail.com',
    testUserPassword: '123321',
    testUserName: 'test002',
    LoginTestUserEmail: 'test002@mail.com',

    usernameFieldLocator(page: Page) {
        return page.locator('input[placeholder="Username"]')
    },

    signUpButtonLocator(page: Page) {
        return page.locator('button.btn-primary')
    },

    toLoginBtnLocator(page: Page) {
        return page.locator('a[href="/login"]')
    },

    emailFieldLocator(page: Page) {
        return page.locator('input[placeholder="Email"]')
    },

    passwordFieldLocator(page: Page) {
        return page.locator('input[placeholder="Password"]')
    },

    errorMsgUsernameFieldLocator(page: Page) {
        return page.locator('.error-messages li:first-child')
    },

    errorMsgEmailFieldLocator(page: Page) {
        return page.locator('.error-messages li:last-child')
    },
    errorMsgPasswordLocator(page: Page) {
        return page.locator('.error-messages li:first-child')
    },

    async signUpAction(page: Page) {
        await page.goto(this.signUpPage)
        await this.usernameFieldLocator(page).fill(this.testUserName)
        await this.emailFieldLocator(page).fill(this.signUpTestUserEmail)
        await this.passwordFieldLocator(page).fill(this.testUserPassword)
        await this.signUpButtonLocator(page).click()
    }
}