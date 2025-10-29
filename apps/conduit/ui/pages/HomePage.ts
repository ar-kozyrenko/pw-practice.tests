import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
    protected page: Page;
    private yourFeedTabBtnLocator: Locator;
    private articleList: Locator;
    private globalFeedTabBtnLocator: Locator;
    private tagDemoBtnLocator: Locator;
    private articlePageTagDemoBtnLocator: Locator;
    private theFirstArticleWithDemoTag: Locator;

    constructor(page: Page) {
        this.page = page;
        this.yourFeedTabBtnLocator = page.locator('a[href="/my-feed"]');
        this.articleList = page.locator('[data-qa-type="article-list"] .article-preview', {
            hasText: 'No articles are here... yet.'
        });
        this.globalFeedTabBtnLocator = page.locator('[data-qa-type="feed-tab"] [href="/"]');
        this.tagDemoBtnLocator = page.locator('[href="/tag/demo"]');
        this.articlePageTagDemoBtnLocator = page.locator('ul.tag-list a[href="/tag/demo"]');
        this.theFirstArticleWithDemoTag = page.locator(
            '[data-qa-type="article-preview"]:first-of-type [data-qa-type="preview-title"]'
        );
    }

    async openMyFeed() {
        await this.yourFeedTabBtnLocator.click();
    }

    async noArticlesHereYet() {
        await expect(this.articleList).toBeVisible({ timeout: 5000 });
        await expect(this.articleList).toHaveText('No articles are here... yet.', { timeout: 5000 });
    }

    async openGlobalFeed() {
        await this.globalFeedTabBtnLocator.click();
    }

    async openDemoTag() {
        await expect(this.tagDemoBtnLocator).toBeVisible({ timeout: 5000 });
        await this.tagDemoBtnLocator.click();
    }

    async openTheFirstArticleWithDemoTag() {
        await expect(this.theFirstArticleWithDemoTag).toBeVisible({ timeout: 5000 });
        await this.theFirstArticleWithDemoTag.click();
    }

    async verifyDemoTagIsVisible() {
        await expect(this.articlePageTagDemoBtnLocator).toBeVisible({ timeout: 5000 });
    }
}
