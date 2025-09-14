
import {test, expect} from '@playwright/test'

test ('sign up positive', 
    {tag: '@regression'},
    async({page})=>{
await page.goto('https://demo.learnwebdriverio.com/register')
await page.locator('input[placeholder="Username"]').fill('test16')
await page.locator('input[placeholder="Email"]').fill('test16@mail.com')
await page.locator('input[placeholder="Password"]').fill('123321')
await page.locator('button.btn-primary').click()
await expect(page.locator('#app')).toContainText('test16')

    }
)

test ('log in positive',
    {tag: ['@regression', '@smoke']},
    async({page})=>{
await page.goto('https://demo.learnwebdriverio.com/login')
await page.locator('input[placeholder="Email"]').fill('test16@mail.com')
await page.locator('input[placeholder="Password"]').fill('123321')
await page.locator('button.btn-primary').click()
await expect(page.locator('a[href="/@test16/"]')).toBeVisible

  }
)

test ('renavigation to the home page after clicking the logo',
    {tag: '@regression'},
    async({page})=>{
await page.goto('https://demo.learnwebdriverio.com/login')
await page.locator('input[placeholder="Email"]').fill('test16@mail.com')
await page.locator('input[placeholder="Password"]').fill('123321')
await page.locator('button.btn-primary').click()
await page.locator('a[href="/settings"]').click()
await page.locator('a[href="/"].navbar-brand').click()
await expect(page.locator('#app')).toContainText('A place to share your knowledge.');

  }
)

test ('log out',
    {tag: ['@regression', '@smoke']},
    async({page})=>{
await page.goto('https://demo.learnwebdriverio.com/login')
await page.locator('input[placeholder="Email"]').fill('test16@mail.com')
await page.locator('input[placeholder="Password"]').fill('123321')
await page.locator('button.btn-primary').click()
await page.locator('a[href="/settings"]').click()
await page.locator("button.btn-outline-danger").click();
await page.locator('a[href="/login"]').click();
await expect(page.locator('p a[href="/register"]')).toContainText('Need an account?');
}
)

test ('create new article',
    {tag: '@regression'},
    async({page})=>{
await page.goto('https://demo.learnwebdriverio.com/login')
await page.locator('input[placeholder="Email"]').fill('test16@mail.com')
await page.locator('input[placeholder="Password"]').fill('123321')
await page.locator('button.btn-primary').click()
await page.locator('a[href="/editor"]').click()
await page.locator('input[data-qa-id="editor-title"]').fill('TestArticle')
await expect (page.locator('input[data-qa-id="editor-title"]')).toHaveValue('TestArticle')
await page.locator('input[data-qa-id="editor-description"]').fill('The article about tests');
await expect(page.locator('input[data-qa-id="editor-description"]')).toHaveValue('The article about tests');
await page.locator('[placeholder="Write your article (in markdown)"]').fill('My test article about tests');
await expect(page.locator('[placeholder="Write your article (in markdown)"]')).toHaveValue('My test article about tests');
await page.locator('button[data-qa-id="editor-publish"]').click();
await expect(page.locator('[data-qa-id="article-title"]')).toContainText('TestArticle');
await expect(page.locator('.banner [data-qa-id="article-edit"]')).toBeVisible
}
)

test ('remove article',
{tag: ['@smoke', '@regression']},
async({page})=>{
await page.goto('https://demo.learnwebdriverio.com/login')
await page.locator('input[placeholder="Email"]').fill('test16@mail.com')
await page.locator('input[placeholder="Password"]').fill('123321')
await page.locator('button.btn-primary').click()
await page.locator('a[href="/editor"]').click()
await page.locator('input[data-qa-id="editor-title"]').fill('TestArticle')
await expect (page.locator('input[data-qa-id="editor-title"]')).toHaveValue('TestArticle')
await page.locator('input[data-qa-id="editor-description"]').fill('The article about tests');
await expect(page.locator('input[data-qa-id="editor-description"]')).toHaveValue('The article about tests');
await page.locator('[placeholder="Write your article (in markdown)"]').fill('My test article about tests');
await expect(page.locator('[placeholder="Write your article (in markdown)"]')).toHaveValue('My test article about tests');
await page.locator('button[data-qa-id="editor-publish"]').click();
await expect(page.locator('[data-qa-id="article-title"]')).toContainText('TestArticle');
await expect(page.locator('.banner [data-qa-id="article-edit"]')).toBeVisible
await page.locator('.banner [data-qa-id="article-delete"]').click()
await expect(page.locator('.home-page a[href="/"]')).toContainText('Global Feed');
}
)

test ('sign up with blank username and email',
{tag: ['@smoke', '@regression']},
async({page})=>{
await page.goto('https://demo.learnwebdriverio.com/register')
await page.locator('button.btn-primary').click()
await expect(page.locator('.error-messages li:first-child')).toContainText('username can\'t be blank');
await expect(page.locator('.error-messages li:last-child')).toContainText('email can\'t be blank');
}
)

test ('sign up with existing username and email',
{tag: ['@smoke', '@regression']},
async({page})=>{
await page.goto('https://demo.learnwebdriverio.com/register')
await page.locator('input[placeholder="Username"]').fill('test16')
await page.locator('input[placeholder="Email"]').fill('test16@mail.com')
await page.locator('input[placeholder="Password"]').fill('123321')
await page.locator('button.btn-primary').click()
await expect(page.locator('.error-messages li:first-child')).toContainText('username is already taken.');
await expect(page.locator('.error-messages li:last-child')).toContainText('email is already taken.');
}
)

test ('log in with blank email',
{tag: ['@smoke', '@regression']},
async({page})=>{
await page.goto('https://demo.learnwebdriverio.com/login')
await page.locator('button.btn-primary').click()
await expect(page.locator('.error-messages li:first-child')).toContainText('email can\'t be blank');
}
)

test ('log in with blank password',
{tag: ['@smoke', '@regression']},
async({page})=>{
await page.goto('https://demo.learnwebdriverio.com/login')
await page.locator('input[placeholder="Email"]').fill('test16@mail.com')
await page.locator('button.btn-primary').click()
await expect(page.locator('.error-messages li:first-child')).toContainText('password can\'t be blank');
}
)

