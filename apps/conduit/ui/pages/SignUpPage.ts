import { test, expect, Page, Locator } from '@playwright/test'
import { BasicPage } from './BasicPage'
import { faker } from '@faker-js/faker';

export class SignUpPage extends BasicPage {
//page: Page
public signUpPageUrl: string
private usernameFieldLocator: Locator
public signUpButtonLocator: Locator
public toLoginBtnLocator: Locator
private emailFieldLocator: Locator
private passwordFieldLocator: Locator
public errorMsgUsernameFieldLocator: Locator
public errorMsgEmailFieldLocator: Locator
public errorMsgPasswordLocator: Locator
public signUpTestUserEmail: string
public testUserPassword: string
public testUserName: string

constructor(page: Page) {
    super(page)
    this.signUpPageUrl = 'https://demo.learnwebdriverio.com/register'
    this.usernameFieldLocator = page.locator('input[placeholder="Username"]')
    this.signUpButtonLocator = page.locator('button.btn-primary')
    this.toLoginBtnLocator = page.locator('a[href="/login"]')
    this.emailFieldLocator = page.locator('input[placeholder="Email"]')
    this.passwordFieldLocator = page.locator('input[placeholder="Password"]')
    this.errorMsgUsernameFieldLocator = page.locator('.error-messages li:first-child')
    this.errorMsgEmailFieldLocator = page.locator('.error-messages li:last-child')
    this.errorMsgPasswordLocator = page.locator('.error-messages li:first-child')

    this.signUpTestUserEmail = 'test001@mail.com'
    this.testUserPassword = '123321'
    this.testUserName = 'test001'
}


    async signUpAction() {
        super.navigateTo(this.signUpPageUrl)
        await this.usernameFieldLocator.fill(this.testUserName)
        await this.emailFieldLocator.fill(this.signUpTestUserEmail)
        await this.passwordFieldLocator.fill(this.testUserPassword)
        await this.signUpButtonLocator.click()
    }
}


