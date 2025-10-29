import { BasicPage } from './BasicPage'
import { CreateArticlePage } from './CreateArticlePage'
import { HomePage } from './HomePage'
import { LoginPage } from './LogInPage'
import { SignUpPage } from './SignUpPage'
import { Page } from '@playwright/test' 

export class PageManager {
    page: Page
    loginPage: LoginPage
    signUpPage: SignUpPage
    basicPage: BasicPage
    homePage: HomePage
    createArticlePage: CreateArticlePage

    constructor(page: Page) {
        this.page = page
        this.loginPage = new LoginPage(page)
        this.signUpPage = new SignUpPage(page)
        this.basicPage = new BasicPage(page)
        this.homePage = new HomePage(page)
        this.createArticlePage = new CreateArticlePage(page)
    }
}