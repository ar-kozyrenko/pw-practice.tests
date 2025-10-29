import { APIRequestContext, APIResponse, expect } from "@playwright/test"
import { Article, ArticlesResponse, CreateEditArticle } from "./articleTypes"

export class ArticleController {

    request: APIRequestContext

    constructor(request: APIRequestContext) {
        this.request = request
    }

    async getAllArticles() {
        const response = await this.request.get('https://conduit-api.learnwebdriverio.com/api/articles?offset=0&limit=10')
        const responseJson: ArticlesResponse = await response.json()
        const tagDojoArticles = responseJson.articles.filter((value) => value.tagList.includes('dojo'))
        console.log(tagDojoArticles)
        expect(tagDojoArticles.length).toBeGreaterThan(1)
    }

    async createArticle(articleBody: Article, token: String) {

        const createArticleData: CreateEditArticle = {
            article: articleBody
        }

        const response = await this.request.post("https://conduit-api.learnwebdriverio.com/api/articles", {
            data: createArticleData,
            headers: {
                authorization: `Token ${token}`
            }
        }
        )
        return response
    }

    async getSlugFromResponse(response: APIResponse) {
        const responseJson: CreateEditArticle = await response.json()
        const userSlug = responseJson.article.slug
        expect(userSlug).toBeTruthy()
        console.log('Slug is:', userSlug)
        return userSlug
    }

    async editArticle(articleBody: Article, slug: String, token: String) {
        const articleEditedBody: CreateEditArticle = {
            article: articleBody
        }
        const response = await this.request.put(`https://conduit-api.learnwebdriverio.com/api/articles/${slug}`,
            { data: articleEditedBody,
            headers: {
            authorization: `Token ${token}`
            }
            }
        )
        await expect(response).toBeTruthy()
        return response
    }

    async deleteArticle(slug: String, token: String) {
        const response = await this.request.delete(`https://conduit-api.learnwebdriverio.com/api/articles/${slug}`, 
            {
            headers: {
               authorization: `Token ${token}`
            }
        })
        await expect(response).toBeTruthy()
        return response
    }










}