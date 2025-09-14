import { test, expect, Page } from '@playwright/test'

export const BasicPage = {

    headerLocator(page: Page) {
        return page.locator('#app')
    },

    settingsButtonLocator(page: Page) {
        return page.locator('a[href="/settings"]')
    },

    appLogoBtnLocator(page: Page) {
        return page.locator('.navbar-brand')
    },

    mainPageBannerLocator(page: Page) {
        return page.locator('.banner p')
    },
    logOutBtnLocator(page: Page) {
        return page.locator("button.btn-outline-danger")
    },

    newArticleBtnLocator(page: Page) {
        return page.locator('a[href="/editor"]')
    }

}