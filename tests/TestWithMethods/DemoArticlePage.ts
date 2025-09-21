import { test, expect, Page } from '@playwright/test'

export class DemoArticle {
    page: Page
    
    
    constructor(page: Page) { 
        this.page = page
    }

    //Locators
private yourFeedtabBtnLocator(){
return this.page.locator('a[href="/my-feed"]')
}
private articleList(){
return this.page.locator('[data-qa-type="article-list"] .article-preview')
}
private globalFeedTabBtnLocator(){
return this.page.locator('[data-qa-type="feed-tab"] [href="/"]')
}
private tagDemoBtnLocator(){
return this.page.locator('[href="/tag/demo"]')
}
private articlePageTagDemoBtnLocator() {
    return this.page.locator('ul.tag-list a[href="/tag/demo"]');
}
private theFirstArticleWithDemoTag(){
return this.page.locator('[data-qa-type="article-preview"]:first-of-type [data-qa-type="preview-title"]')
}

//Methods
async openMyFeed(){
   await this.yourFeedtabBtnLocator().click()
}

async noArticlesHereYet(){
expect(this.articleList()), {hasText: 'No articles are here... yet.'}

}
async openGlobalFeed(){
    await this.globalFeedTabBtnLocator().click()
}

async openDemoTag(){
    await this.tagDemoBtnLocator().click()
}

async openTheFirstArticleWithDemoTag(){
    await this.theFirstArticleWithDemoTag().click()
}

async verifyDemoTagIsVisible(){
    await expect(this.articlePageTagDemoBtnLocator()).toBeVisible()
}


}