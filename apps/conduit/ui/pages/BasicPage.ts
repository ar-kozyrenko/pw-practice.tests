import { Page, Locator } from '@playwright/test'

export class BasicPage {
    public page: Page
    public mainPageBannerLocator: Locator
    public header: Header

    constructor(page: Page) {
        this.page = page
        this.header = new Header(page)
        this.mainPageBannerLocator = page.locator('.banner p')

    }

    async reload() {
        this.page.reload();
    }

    async navigateTo(url: string) {
        this.page.goto(url);
    }

}

class Header {
    page: Page
    logo: Locator
    settingsButtonLocator: Locator
    public headerLocator: Locator
    public newArticleBtnLocator: Locator
    public logOutBtnLocator: Locator
    public userName: Locator

    constructor(page: Page) {
        this.page = page
        this.logo = page.locator('.navbar-brand')
        this.settingsButtonLocator = page.locator('a[href="/settings"]')
        this.headerLocator = page.locator('#app')
        this.newArticleBtnLocator = page.locator('a[href="/editor"]')
        this.logOutBtnLocator = page.locator("button.btn-outline-danger")
        this.userName = page.locator('ul[data-qa-id="site-nav"] a[href="/@test002/"]')
    }
}

