
import {test, expect} from '@playwright/test'
import { log } from 'node:util'
const signUpPage = 'https://demo.learnwebdriverio.com/register'
const loginPage = 'https://demo.learnwebdriverio.com/login'



test ('sign up positive', 
    {tag: '@regression'},
    async({page})=>{
await page.goto(signUpPage)
const userameField = page.locator('input[placeholder="Username"]')
const emailField = page.locator('input[placeholder="Email"]')
const passwordField = page.locator('input[placeholder="Password"]')
const signUpBtn = page.locator('button.btn-primary')
const header = page.locator('#app')

await userameField.fill('test001')
await emailField.fill('test001@mail.com')
await passwordField.fill('123321')
await signUpBtn.click()
await expect(header).toContainText('test001')

    }
)

test ('log in positive',
    {tag: ['@regression', '@smoke']},
    async({page})=>{
const emailField = page.locator('input[placeholder="Email"]')
const passwordField = page.locator('input[placeholder="Password"]')
const LogInBtn = page.locator('button.btn-primary')

await page.goto(loginPage)
await emailField.fill('test16@mail.com')
await passwordField.fill('123321')
await LogInBtn.click()
await expect(page.locator('a[href="/@test16/"]')).toBeVisible

  }
)

test ('renavigation to the home page after clicking the logo',
    {tag: '@regression'},
    async({page})=>{
const emailField = page.locator('input[placeholder="Email"]')
const passwordField = page.locator('input[placeholder="Password"]')
const logInBtn = page.locator('button.btn-primary')
const settingsBtn = page.locator('a[href="/settings"]')
const appLogoBtn = page.locator('a[href="/"].navbar-brand')
const mainPageBanner = page.locator('#app')

await page.goto(loginPage)
await emailField.fill('test16@mail.com')
await passwordField.fill('123321')
await logInBtn.click()
await settingsBtn.click()
await appLogoBtn.click()
await expect(mainPageBanner).toContainText('A place to share your knowledge.');

  }
)

test ('log out',
    {tag: ['@regression', '@smoke']},
    async({page})=>{

const emailField = page.locator('input[placeholder="Email"]')
const passwordField = page.locator('input[placeholder="Password"]')
const logInBtn = page.locator('button.btn-primary')
const settingsBtn = page.locator('a[href="/settings"]')
const logOutBtn = page.locator("button.btn-outline-danger")
const toLogInPage = page.locator('a[href="/login"]')
const needAccountBtn = page.locator('p a[href="/register"]')

await page.goto(loginPage)
await emailField.fill('test16@mail.com')
await passwordField.fill('123321')
await logInBtn.click()
await settingsBtn.click()
await logOutBtn.click();
await toLogInPage.click();
await expect(needAccountBtn).toContainText('Need an account?');
}
)

test ('create new article',
    {tag: '@regression'},
    async({page})=>{
const emailField = page.locator('input[placeholder="Email"]')
const passwordField = page.locator('input[placeholder="Password"]')
const logInBtn = page.locator('button.btn-primary')
const newArticleBtn = page.locator('a[href="/editor"]')
const articleTitleField = page.locator('input[data-qa-id="editor-title"]')
const theArticleAboutField = page.locator('input[data-qa-id="editor-description"]')
const writeYourArticle = page.locator('[placeholder="Write your article (in markdown)"]')
const publishArticleBtn = page.locator('button[data-qa-id="editor-publish"]')
const theArticleNameBlock = page.locator('[data-qa-id="article-title"]')
const editArticleBtn = page.locator('.banner [data-qa-id="article-edit"]')

await page.goto(loginPage)
await emailField.fill('test16@mail.com')
await passwordField.fill('123321')
await logInBtn.click()
await newArticleBtn.click()
await articleTitleField.fill('TestArticle')
await expect (articleTitleField).toHaveValue('TestArticle')
await theArticleAboutField.fill('The article about tests');
await expect(theArticleAboutField).toHaveValue('The article about tests');
await writeYourArticle.fill('My test article about tests');
await expect(writeYourArticle).toHaveValue('My test article about tests');
await publishArticleBtn.click();
await expect(theArticleNameBlock).toContainText('TestArticle');
await expect(editArticleBtn).toBeVisible
}
)

test ('remove article',
{tag: ['@smoke', '@regression']},
async({page})=>{
const emailField = page.locator('input[placeholder="Email"]')
const passwordField = page.locator('input[placeholder="Password"]')
const logInBtn = page.locator('button.btn-primary')
const newArticleBtn = page.locator('a[href="/editor"]')
const articleTitleField = page.locator('input[data-qa-id="editor-title"]')
const theArticleAboutField = page.locator('input[data-qa-id="editor-description"]')
const writeYourArticle = page.locator('[placeholder="Write your article (in markdown)"]')
const publishArticleBtn = page.locator('button[data-qa-id="editor-publish"]')
const theArticleNameBlock = page.locator('[data-qa-id="article-title"]')
const editArticleBtn = page.locator('.banner [data-qa-id="article-edit"]')
const deleteArticleBtn = page.locator('.banner [data-qa-id="article-delete"]')
const globalFeedTabBtn = page.locator('.home-page a[href="/"]')

await page.goto(loginPage)
await emailField.fill('test16@mail.com')
await passwordField.fill('123321')
await logInBtn.click()
await newArticleBtn.click()
await articleTitleField.fill('TestArticle')
await expect (articleTitleField).toHaveValue('TestArticle')
await theArticleAboutField.fill('The article about tests');
await expect(theArticleAboutField).toHaveValue('The article about tests');
await writeYourArticle.fill('My test article about tests');
await expect(writeYourArticle).toHaveValue('My test article about tests');
await publishArticleBtn.click();
await expect(theArticleNameBlock).toContainText('TestArticle');
await expect(editArticleBtn).toBeVisible
await deleteArticleBtn.click()
await expect(globalFeedTabBtn).toContainText('Global Feed');
}
)

test ('sign up with blank username and email',
{tag: ['@smoke', '@regression']},
async({page})=>{
const signUpBtn = page.locator('button.btn-primary')
const errorMsgUsernameField = page.locator('.error-messages li:first-child')
const errorMsgEmailField = page.locator('.error-messages li:last-child')


await page.goto(signUpPage)
await signUpBtn.click()
await expect(errorMsgUsernameField).toContainText('username can\'t be blank');
await expect(errorMsgEmailField).toContainText('email can\'t be blank');
}
)

test ('sign up with existing username and email',
{tag: ['@smoke', '@regression']},
async({page})=>{
const userameField = page.locator('input[placeholder="Username"]')
const emailField = page.locator('input[placeholder="Email"]')
const passwordField = page.locator('input[placeholder="Password"]')
const signUpBtn = page.locator('button.btn-primary')
const errorMsgUsernameField = page.locator('.error-messages li:first-child')
const errorMsgEmailField = page.locator('.error-messages li:last-child')

await page.goto(signUpPage)
await userameField.fill('test16')
await emailField.fill('test16@mail.com')
await passwordField.fill('123321')
await signUpBtn.click()
await expect(errorMsgUsernameField).toContainText('username is already taken.');
await expect(errorMsgEmailField).toContainText('email is already taken.');
}
)

test ('log in with blank email',
{tag: ['@smoke', '@regression']},
async({page})=>{
const loginBtn = page.locator('button.btn-primary')
const errorMsgEmailField = page.locator('.error-messages li:first-child')

await page.goto(loginPage)
await loginBtn.click()
await expect(errorMsgEmailField).toContainText('email can\'t be blank');
}
)

test ('log in with blank password',
{tag: ['@smoke', '@regression']},
async({page})=>{
const emailField = page.locator('input[placeholder="Email"]')
const loginBtn = page.locator('button.btn-primary')
const errorMsgPassword = page.locator('.error-messages li:first-child')

await page.goto(loginPage)
await emailField.fill('test16@mail.com')
await loginBtn.click()
await expect(errorMsgPassword).toContainText('password can\'t be blank');
}
)

