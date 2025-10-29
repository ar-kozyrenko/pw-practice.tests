
import { test, expect, request, APIResponse } from '@playwright/test'
import { ok } from 'assert'
import { LoginFields, SignUpFields } from '../../apps/conduit/api/userController/userTypes'
import { UserController } from '../../apps/conduit/api/userController/userController'
import { ArticleController } from '../../apps/conduit/api/articleController/articleController'
import { Article, ArticlesResponse } from '../../apps/conduit/api/articleController/articleTypes'


test('sign up successfully', async ({ request }) => {
    const signUpData: SignUpFields = {
        email: "test006@mail.com",
        password: "123321",
        username: "testUsername006"
    }
    const userController = new UserController(request)
    await userController.userSignUp(signUpData)
})

test('Login successfully and get token', async ({ request }) => {
    const loginData: LoginFields = {
        email: "test006@mail.com",
        password: "123321"
    }
    const userController = new UserController(request)
    await userController.userLogin(loginData)
})

test('get articles with tag - dojo', async ({ request }) => {
    const articleController = new ArticleController(request)
    await articleController.getAllArticles()
})

test('Create Article', async ({ request }) => {
    const loginData: LoginFields = {
        email: "test006@mail.com",
        password: "123321"
    }
    const userController = new UserController(request)
    const articleController = new ArticleController(request)
    const loginResponse = await userController.userLogin(loginData)
    const userToken = await userController.getTokenFromResponse(loginResponse)

    //Create Article
    const articleData: Article = {
        title: 'Test Article2',
        description: 'The article about testing',
        body: 'This is my article!'
    }
    const createArticleResponse: APIResponse = await articleController.createArticle(articleData, userToken!)
    await expect(createArticleResponse).toBeOK
    console.log(createArticleResponse)
})

test('Edit Article', async ({ request }) => {
    const loginData: LoginFields = {
        email: "test006@mail.com",
        password: "123321"
    }
    const userController = new UserController(request)
    const articleController = new ArticleController(request)
    //Login
    const loginResponse = await userController.userLogin(loginData)
    const userToken = await userController.getTokenFromResponse(loginResponse)
    //Create Article
    const articleData: Article = {
        title: 'Test Article3',
        description: 'The article about testing',
        body: 'This is my article!'
    }
    const createArticleResponse: APIResponse = await articleController.createArticle(articleData, userToken!)
    await expect(createArticleResponse).toBeOK
    console.log(await createArticleResponse.json())
    const articleSlug = await articleController.getSlugFromResponse(createArticleResponse)

    //Edit Article
    const editedArticleData: Article = {
        title: 'Test Article3(EDITED)'
    }
    const editArticleResponse: APIResponse = await articleController.editArticle(editedArticleData, articleSlug!, userToken!)
    await expect(editArticleResponse).toBeOK
    console.log(await editArticleResponse.json())

})

test('Delete Article', async ({ request }) => {
    const loginData: LoginFields = {
        email: "test006@mail.com",
        password: "123321"
    }
    const userController = new UserController(request)
    const articleController = new ArticleController(request)
    //Login
    const loginResponse = await userController.userLogin(loginData)
    const userToken = await userController.getTokenFromResponse(loginResponse)
    //Create Article
    const articleData: Article = {
        title: 'Test Article3',
        description: 'The article about testing',
        body: 'This is my article!'
    }
    const createArticleResponse: APIResponse = await articleController.createArticle(articleData, userToken!)
    await expect(createArticleResponse).toBeOK
    console.log(await createArticleResponse.json())
    const articleSlug = await articleController.getSlugFromResponse(createArticleResponse)

    //Delete Article
const deleteArticleResponse: APIResponse = await articleController.deleteArticle(articleSlug!, userToken!)
    await expect(deleteArticleResponse.status()).toBe(204)
    console.log(await deleteArticleResponse.statusText())
    console.log(await deleteArticleResponse.status())

})
























