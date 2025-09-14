import { test, expect, Page } from '@playwright/test'
import { BasicPage } from './BasicPage'

export const CreateArticlePage = {
    articleTitleFieldLocator(page: Page) {
        return page.locator('input[data-qa-id="editor-title"]')
    },
    theArticleAboutFieldLocator(page: Page) {
        return page.locator('input[data-qa-id="editor-description"]')
    },
    writeYourArticleFieldLocator(page: Page) {
        return page.locator('[placeholder="Write your article (in markdown)"]')
    },

    publishArticleBtnLocator(page: Page) {
        return page.locator('button[data-qa-id="editor-publish"]')
    },

    theArticleNameBlockLocator(page: Page) {
        return page.locator('[data-qa-id="article-title"]')
    },

    editArticleBtnLocator(page: Page) {
       return page.locator('.banner [data-qa-id="article-edit"]')
    },

    deleteArticleBtnLocator(page: Page) {
      return  page.locator('.banner [data-qa-id="article-delete"]')
    },

    globalFeedTabBtnLocator(page: Page) {
       return page.locator('.home-page a[href="/"]')
    }, 

async fillTheArtivleFields (page: Page, data: { title: string, about: string, content: string }){
        await BasicPage.newArticleBtnLocator(page).click()
        const fields = [
            { locator: this.articleTitleFieldLocator(page), value: data.title },
            { locator: this.theArticleAboutFieldLocator(page), value: data.about },
            { locator: this.writeYourArticleFieldLocator(page), value: data.content }
        ]
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i]
            await field.locator.fill(field.value)
            await expect(field.locator).toHaveValue(field.value)
        }

    }
}
