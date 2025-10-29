import { test, expect, Page, Locator } from '@playwright/test'
import { BasicPage } from './BasicPage' 
export class CreateArticlePage {
    page: Page
    articleTitleFieldLocator: Locator
    theArticleAboutFieldLocator: Locator
    writeYourArticleFieldLocator: Locator
    publishArticleBtnLocator: Locator
    theArticleNameBlockLocator: Locator
    editArticleBtnLocator: Locator
    deleteArticleBtnLocator: Locator
    globalFeedTabBtnLocator: Locator

    constructor(page: Page) {
        this.page = page
        this.articleTitleFieldLocator = page.locator('input[data-qa-id="editor-title"]')
        this.theArticleAboutFieldLocator = page.locator('input[data-qa-id="editor-description"]')
        this.writeYourArticleFieldLocator = page.locator('[placeholder="Write your article (in markdown)"]')
        this.publishArticleBtnLocator = page.locator('button[data-qa-id="editor-publish"]')
        this.theArticleNameBlockLocator = page.locator('[data-qa-id="article-title"]')
        this.editArticleBtnLocator = page.locator('.banner [data-qa-id="article-edit"]')
        this.deleteArticleBtnLocator = page.locator('.banner [data-qa-id="article-delete"]')
        this.globalFeedTabBtnLocator = page.locator('.home-page a[href="/"]')
    }


    async fillTheArticleFields(data: { title: string, about: string, content: string }) {
        const basicPage = new BasicPage(this.page)
        await basicPage.header.newArticleBtnLocator.click()
        const fields = [
            { locator: this.articleTitleFieldLocator, value: data.title },
            { locator: this.theArticleAboutFieldLocator, value: data.about },
            { locator: this.writeYourArticleFieldLocator, value: data.content }
        ]
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i]
            await field.locator.fill(field.value)
            await expect(field.locator).toHaveValue(field.value)
        }

    }
}
