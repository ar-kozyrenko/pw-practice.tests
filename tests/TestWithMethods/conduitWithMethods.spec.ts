
import { test, expect } from '@playwright/test'
import { Page } from '@playwright/test'
import { write } from 'fs'
import { SignUpPage } from './SignUpPage'
import { BasicPage } from './BasicPage'
import { LoginPage } from './LogInPage'
import { CreateArticlePage } from './CreateArticlePage'
import { TIMEOUT } from 'dns'


test('sign up positive',
    { tag: '@regression' },
    async ({ page }) => {
        await SignUpPage.signUpAction(page)
        await expect(BasicPage.headerLocator(page)).toContainText(SignUpPage.testUserName)
    }
),



    test('log in positive',
        { tag: ['@regression', '@smoke'] },
        async ({ page }) => {
            await LoginPage.logInAction(page)
            await expect(page.locator('ul[data-qa-id="site-nav"] a[href="/@test002/"]')).toBeVisible()

        }
    )

test('renavigation to the home page after clicking the logo',
    { tag: '@regression' },
    async ({ page }) => {
        await LoginPage.logInAction(page)
        await BasicPage.settingsButtonLocator(page).click()
        await BasicPage.appLogoBtnLocator(page).click()
        await BasicPage.appLogoBtnLocator(page).click();
        await expect(BasicPage.mainPageBannerLocator(page)).toHaveText('A place to share your knowledge.', { timeout: 10000 })

    }
)

test('log out',
    { tag: ['@regression', '@smoke'] },
    async ({ page }) => {
        await LoginPage.logInAction(page)
        await LoginPage.logOutAction(page)
        await expect(LoginPage.needAccountBtnLocator(page)).toContainText('Need an account?');
    }
)

test('create new article',
    { tag: '@regression' },
    async ({ page }) => {
        await LoginPage.logInAction(page)
        await CreateArticlePage.fillTheArtivleFields(page, {
            title: 'Testing article',
            about: 'The article about PW/TS',
            content: 'The article content is here'
        })
        await CreateArticlePage.publishArticleBtnLocator(page).click()
        await expect(CreateArticlePage.theArticleNameBlockLocator(page)).toContainText('Testing article');
        await expect(CreateArticlePage.editArticleBtnLocator(page)).toBeVisible()
    }
)



test('remove article',
    { tag: ['@smoke', '@regression'] },
    async ({ page }) => {

        await LoginPage.logInAction(page)
        await CreateArticlePage.fillTheArtivleFields(page, {
            title: 'Testing article',
            about: 'The article about PW/TS',
            content: 'The article content is here'
        })
        await CreateArticlePage.publishArticleBtnLocator(page).click()
        await CreateArticlePage.deleteArticleBtnLocator(page).click()
        await expect(CreateArticlePage.globalFeedTabBtnLocator(page)).toContainText('Global Feed');
    }
)


test('sign up with blank username and email',
    { tag: ['@smoke', '@regression'] },
    async ({ page }) => {

        await page.goto(SignUpPage.signUpPage)
        await SignUpPage.signUpButtonLocator(page).click()
        await expect(SignUpPage.errorMsgUsernameFieldLocator(page)).toContainText('username can\'t be blank');
        await expect(SignUpPage.errorMsgEmailFieldLocator(page)).toContainText('email can\'t be blank');
    }
)

test('sign up with existing username and email',
    { tag: ['@smoke', '@regression'] },
    async ({ page }) => {
        await page.goto(SignUpPage.signUpPage)
        await SignUpPage.signUpAction(page)
        await expect(SignUpPage.errorMsgUsernameFieldLocator(page)).toContainText('username is already taken.');
        await expect(SignUpPage.errorMsgEmailFieldLocator(page)).toContainText('email is already taken.');
    }
)

test('log in with blank email',
    { tag: ['@smoke', '@regression'] },
    async ({ page }) => {

        await page.goto(LoginPage.loginPage)
        await LoginPage.loginButtonLocator(page).click()
        await expect(LoginPage.errorMsgEmailFieldLocator(page)).toContainText('email can\'t be blank');
    }
)

test('log in with blank password',
    { tag: ['@smoke', '@regression'] },
    async ({ page }) => {

        await page.goto(LoginPage.loginPage)
        await LoginPage.emailFieldLocator(page).fill(LoginPage.LoginTestUserEmail)
        await LoginPage.loginButtonLocator(page).click()
        await expect(LoginPage.errorMsgPasswordLocator(page)).toContainText('password can\'t be blank');
    }
)

