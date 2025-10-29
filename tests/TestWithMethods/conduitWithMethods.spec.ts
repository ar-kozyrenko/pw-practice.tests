
import { expect } from '@playwright/test';
import { test } from '../TestWithMethods/fixtureBasic';

test.describe('SignUp', () => {
    test('sign up positive',
        { tag: '@regression' },
        async ({pageManager}) => {
            await test.step('Navigate to SignUp page', async () => {
                await pageManager.signUpPage.signUpAction()
                await expect(pageManager.basicPage.header.headerLocator).toContainText(pageManager.signUpPage.testUserName)
            })
        }
    )
    test('sign up with blank username and email',
        { tag: ['@smoke', '@regression'] },
        async ({ page, pageManager }) => {
            await test.step('Sign up without indicating credentials', async () => {
                await page.goto(pageManager.signUpPage.signUpPageUrl)
                await pageManager.signUpPage.signUpButtonLocator.click()
                await expect(pageManager.signUpPage.errorMsgUsernameFieldLocator).toContainText('username can\'t be blank');
                await expect(pageManager.signUpPage.errorMsgEmailFieldLocator).toContainText('email can\'t be blank');
            })

        }
    )
    test('sign up with existing username and email',
        { tag: ['@smoke', '@regression'] },
        async ({ page, pageManager }) => {
            await test.step('Sign up with existing credentials', async () => {
                await page.goto(pageManager.signUpPage.signUpPageUrl)
                await pageManager.signUpPage.signUpAction()
                await expect(pageManager.signUpPage.errorMsgUsernameFieldLocator).toContainText('username is already taken.');
                await expect(pageManager.signUpPage.errorMsgEmailFieldLocator).toContainText('email is already taken.');
            })

        }
    )
})

test.describe('LogIn', () => {
    test('log in positive',
        { tag: ['@regression', '@smoke'] },
        async ({ pageManager }) => {
            await test.step('LogIn', async () => {
                await pageManager.loginPage.logInAction()
                await expect(pageManager.loginPage.header.userName).toBeVisible()
            })

        }
    )
    test('log out',
        { tag: ['@regression', '@smoke'] },
        async ({pageManager}) => {
            await test.step('LogIn', async () => {
                await pageManager.loginPage.logInAction()
            })
            await test.step('LogOut', async () => {
                await pageManager.loginPage.logOutAction()
                await expect(pageManager.loginPage.needAccountBtnLocator).toContainText('Need an account?');
            })

        }
    )
    test('log in with blank email',
        { tag: ['@smoke', '@regression'] },
        async ({page, pageManager }) => {
            await test.step('LogIn withpot indicating email', async () => {
                await page.goto(pageManager.loginPage.loginPageUrl)
                await pageManager.loginPage.loginButtonLocator.click()
                await expect(pageManager.loginPage.errorMsgEmailFieldLocator).toContainText('email can\'t be blank');
            })

        }
    )
    test('log in with blank password',
        { tag: ['@smoke', '@regression'] },
        async ({page, pageManager}) => {
            await test.step('LogIn without indicating password', async () => {
                await page.goto(pageManager.loginPage.loginPageUrl)
                await pageManager.loginPage.emailFieldLocator.fill(pageManager.loginPage.testUser.email)
                await pageManager.loginPage.loginButtonLocator.click()
                await expect(pageManager.loginPage.errorMsgPasswordLocator).toContainText('password can\'t be blank');
            })

        }
    )
})

test.describe('ArticlesManagement', () => {
    test('create new article',
        { tag: '@regression' },
        async ({page, pageManager }) => {
            await test.step('LogIn', async () => {
                await pageManager.loginPage.logInAction();
            })
            await test.step('Create new article', async () => {
                await pageManager.createArticlePage.fillTheArticleFields({
                    title: 'Testing article',
                    about: 'The article about PW/TS',
                    content: 'The article content is here'
                });

                // ждём response при клике Publish
                const [response] = await Promise.all([
                    page.waitForResponse(resp =>
                        resp.url().includes('/api/articles') &&
                        resp.request().method() === 'POST'
                    ),
                    pageManager.createArticlePage.publishArticleBtnLocator.click()
                ]);

                // проверяем статус ответа
                expect(response.ok()).toBeTruthy();

                // достаём JSON
                const responseBody = await response.json();
                const slug = responseBody.article.slug;

                // выводим slug (для тренировки)
                console.log('Created article slug:', slug);

                // оставляем твои UI-проверки
                await expect(pageManager.createArticlePage.theArticleNameBlockLocator).toContainText('Testing article');
                await expect(pageManager.createArticlePage.editArticleBtnLocator).toBeVisible();
            })


        }
    );
    test('remove article',
        { tag: ['@smoke', '@regression'] },
        async ({pageManager}) => {
            await test.step('LogIn', async () => {
                await pageManager.loginPage.logInAction()
            })
            await test.step('Create article', async () => {
                await pageManager.createArticlePage.fillTheArticleFields({
                    title: 'Testing article',
                    about: 'The article about PW/TS',
                    content: 'The article content is here'
                })
                await pageManager.createArticlePage.publishArticleBtnLocator.click()
            })
            await test.step('Delete article', async () => {
                await pageManager.createArticlePage.deleteArticleBtnLocator.click()
                await expect(pageManager.createArticlePage.globalFeedTabBtnLocator).toContainText('Global Feed');
            })


        }
    )
    test('article with demo tag is in place',
        { tag: ['@smoke', '@regression'] },
        async ({pageManager}) => {
            await test.step('LogIn', async () => {
                await pageManager.loginPage.logInAction()
            })
            await test.step('Verify article with demo tag is in place', async () => {
                await pageManager.homePage.openMyFeed()
                await pageManager.homePage.noArticlesHereYet()
                await pageManager.homePage.openGlobalFeed()
                await pageManager.homePage.openDemoTag()
                await pageManager.homePage.openTheFirstArticleWithDemoTag()
                //await homePage.verifyDemoTagIsVisible()
            })


        }
    )
})

test('renavigation to the home page after clicking the logo',
    { tag: '@regression' },
    async ({pageManager}) => {
        await test.step('LogIn', async () => {
            await pageManager.loginPage.logInAction()
        })
        await test.step('Re-navigation to the home page', async () => {
            await pageManager.basicPage.header.settingsButtonLocator.click()
            await expect(pageManager.basicPage.header.logo).toBeVisible({ timeout: 5000 })
            await pageManager.basicPage.header.logo.click()
            await expect(pageManager.basicPage.mainPageBannerLocator).toBeVisible({ timeout: 10000 })
            await expect(pageManager.basicPage.mainPageBannerLocator).toHaveText('A place to share your knowledge.')
        })

    }
)




