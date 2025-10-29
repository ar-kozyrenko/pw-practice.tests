import { test, expect, Page, Locator } from '@playwright/test'
import { BasicPage } from './BasicPage'
import { SignUpPage } from './SignUpPage'


export class LoginPage extends BasicPage {
//protected page: Page
public loginButtonLocator: Locator
public needAccountBtnLocator: Locator
public emailFieldLocator: Locator
private passwordFieldLocator: Locator
private errorMsgUsernameFieldLocator: Locator
public errorMsgEmailFieldLocator: Locator
public errorMsgPasswordLocator: Locator


loginPageUrl = 'https://demo.learnwebdriverio.com/login'
    
    public testUser = {
    email: 'test001@mail.com',
    password: '123321',
    userName: 'test001'
    }


    constructor(page: Page) {
       super(page)
        this.loginButtonLocator = page.locator('button.btn-primary')
        this.needAccountBtnLocator = page.locator('p a[href="/register"]')
        this.emailFieldLocator = page.locator('input[placeholder="Email"]')
        this.passwordFieldLocator = page.locator('input[placeholder="Password"]')
        this.errorMsgUsernameFieldLocator = page.locator('.error-messages li:first-child')
        this.errorMsgEmailFieldLocator = page.locator('.error-messages li:last-child')
        this.errorMsgPasswordLocator = page.locator('.error-messages li:first-child') 
    
    
}
    
    async logInAction() {
        await super.navigateTo(this.loginPageUrl)
        await this.emailFieldLocator.fill(this.testUser.email)
        await this.passwordFieldLocator.fill(this.testUser.password)
        await this.loginButtonLocator.click()
    }

    async logOutAction() {
        const signUpPage = new SignUpPage(this.page)
        const basicPage = new BasicPage(this.page)
        await basicPage.header.settingsButtonLocator.click()    
        await basicPage.header.logOutBtnLocator.click()   
        await signUpPage.toLoginBtnLocator.click();
    }


}
