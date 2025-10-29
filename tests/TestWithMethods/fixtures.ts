import { test as base, expect } from '@playwright/test'
import { LoginPage } from '../../apps/conduit/ui/pages/LogInPage'
import { SignUpPage } from '../../apps/conduit/ui/pages/SignUpPage'
import { BasicPage } from '../../apps/conduit/ui/pages/BasicPage'
import { HomePage } from '../../apps/conduit/ui/pages/HomePage'
import { CreateArticlePage } from '../../apps/conduit/ui/pages/CreateArticlePage'

type Pages = {
    loginPage: LoginPage,
    signUpPage: SignUpPage,
    basicPage: BasicPage,
    homePage: HomePage,
    createArticlePage: CreateArticlePage
}

export const test = base.extend<Pages>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page)
        await use(loginPage)
    },
    signUpPage: async ({ page }, use) => {
        const signUpPage = new SignUpPage(page)
        await use(signUpPage)
    },
    basicPage: async ({ page }, use) => {
        const basicPage = new BasicPage(page)
        await use(basicPage)
    },
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page)
        await use(homePage)
    },
    createArticlePage: async ({ page }, use) => {
        const createArticlePage = new CreateArticlePage(page)
        await use(createArticlePage)
    }
}
)