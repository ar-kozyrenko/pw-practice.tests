import { test, expect, Page } from '@playwright/test'
import { BasicPage } from './BasicPage'
import { SignUpPage } from './SignUpPage'


export const LoginPage = {
    loginPage: 'https://demo.learnwebdriverio.com/login',

    signUpTestUserEmail: 'test002@mail.com',
    testUserPassword: '123321',
    testUserName: 'test002',
    LoginTestUserEmail: 'test002@mail.com',

    loginButtonLocator(page: Page) {
        return page.locator('button.btn-primary')
    },

    needAccountBtnLocator(page: Page) {
        return page.locator('p a[href="/register"]')
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

    async logInAction(page: Page) {
        await page.goto(this.loginPage)
        await this.emailFieldLocator(page).fill(this.LoginTestUserEmail)
        await this.passwordFieldLocator(page).fill(this.testUserPassword)
        await this.loginButtonLocator(page).click()
    },

    async logOutAction(page: Page) {
        await BasicPage.settingsButtonLocator(page).click()
        await BasicPage.logOutBtnLocator(page).click();
        await SignUpPage.toLoginBtnLocator(page).click();
    }

}
