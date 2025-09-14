
import {test, expect} from '@playwright/test'

test ('sign up positive', 
    {tag: '@regression'},
    async({page})=>{
await page.goto('https://demo.learnwebdriverio.com/register')
await page.getByRole('textbox', { name: 'Username' }).fill('test7')
await page.getByRole('textbox', { name: 'Email' }).fill('test7@mail.com')
await page.getByRole('textbox', { name: 'Password' }).fill('123321');
await page.getByRole('button', { name: 'Sign up' }).click()
await expect(page.locator('#app')).toContainText('test7')

    }
)

test ('log in positive',
    {tag: ['@regression', '@smoke']},
    async({page})=>{
await page.goto('https://demo.learnwebdriverio.com/login')
await page.getByRole('textbox', { name: 'Email' }).fill('test7@mail.com')
await page.getByRole('textbox', { name: 'Password' }).fill('123321')
await page.getByRole('button', { name: 'Sign in' }).click()
await expect(page.locator('#app')).toContainText('test7');

  }
)

test ('renavigation to the home page after clicking the logo',
    {tag: '@regression'},
    async({page})=>{
await page.goto('https://demo.learnwebdriverio.com/login')
await page.getByRole('textbox', { name: 'Email' }).fill('test7@mail.com')
await page.getByRole('textbox', { name: 'Password' }).fill('123321')
await page.getByRole('button', { name: 'Sign in' }).click()
await page.getByRole('link', { name: '  Settings' }).click();
await page.getByRole('navigation').getByRole('link', { name: 'conduit' }).click();
await expect(page.locator('#app')).toContainText('A place to share your knowledge.');

  }
)

test ('log out',
    {tag: ['@regression', '@smoke']},
    async({page})=>{
await page.goto('https://demo.learnwebdriverio.com/login')
await page.getByRole('textbox', { name: 'Email' }).fill('test7@mail.com')
await page.getByRole('textbox', { name: 'Password' }).fill('123321')
await page.getByRole('button', { name: 'Sign in' }).click()
await expect(page.locator('#app')).toContainText('test7');
await page.getByRole('link', { name: '  Settings' }).click();
await page.getByRole('button', { name: 'Or click here to logout.' }).click();
await page.getByRole('link', { name: ' Sign in' }).click();
await expect(page.getByRole('heading')).toContainText('Sign in');
}
)

test ('create new article',
    {tag: '@regression'},
    async({page})=>{
await page.goto('https://demo.learnwebdriverio.com/login')
await page.getByRole('textbox', { name: 'Email' }).fill('test7@mail.com')
await page.getByRole('textbox', { name: 'Password' }).fill('123321')
await page.getByRole('button', { name: 'Sign in' }).click()
await page.getByRole('link', { name: '  New Article' }).click()
await page.getByRole('textbox', { name: 'Article Title' }).fill('TestArticle')
await expect (page.getByRole('textbox', { name: 'Article Title' })).toHaveValue('TestArticle')
await page.getByRole('textbox', { name: 'What\'s this article about?' }).fill('The article about tests');
await expect(page.getByRole('textbox', { name: 'What\'s this article about?' })).toHaveValue('The article about tests');
await page.getByRole('textbox', { name: 'Write your article (in' }).fill('My test article about tests');
await expect(page.getByRole('textbox', { name: 'Write your article (in' })).toHaveValue('My test article about tests');
await page.getByRole('button', { name: 'Publish Article' }).click();
await expect(page.getByRole('heading')).toContainText('TestArticle');
}
)

test ('remove article',
{tag: ['@smoke', '@regression']},
async({page})=>{
await page.goto('https://demo.learnwebdriverio.com/login')
await page.getByRole('textbox', { name: 'Email' }).fill('test7@mail.com')
await page.getByRole('textbox', { name: 'Password' }).fill('123321')
await page.getByRole('button', { name: 'Sign in' }).click()
await page.getByRole('link', { name: '  New Article' }).click()
await page.getByRole('textbox', { name: 'Article Title' }).fill('TestArticle')
await expect (page.getByRole('textbox', { name: 'Article Title' })).toHaveValue('TestArticle')
await page.getByRole('textbox', { name: 'What\'s this article about?' }).fill('The article about tests');
await expect(page.getByRole('textbox', { name: 'What\'s this article about?' })).toHaveValue('The article about tests');
await page.getByRole('textbox', { name: 'Write your article (in' }).fill('My test article about tests');
await expect(page.getByRole('textbox', { name: 'Write your article (in' })).toHaveValue('My test article about tests');
await page.getByRole('button', { name: 'Publish Article' }).click();
await expect(page.getByRole('heading')).toContainText('TestArticle');
await page.getByRole('button', { name: '  Delete Article' }).first().click();
await expect(page.locator('#app')).toContainText('Global Feed');
}
)

test ('sign up with blank username and email',
{tag: ['@smoke', '@regression']},
async({page})=>{
await page.goto('https://demo.learnwebdriverio.com/register')
await page.getByRole('button', { name: 'Sign up' }).click();
await expect(page.locator('#app')).toContainText('username can\'t be blank');
await expect(page.locator('#app')).toContainText('email can\'t be blank');
}
)

test ('sign up with existing username and email',
{tag: ['@smoke', '@regression']},
async({page})=>{
await page.goto('https://demo.learnwebdriverio.com/register')
await page.getByRole('button', { name: 'Sign up' }).click();
await expect(page.locator('#app')).toContainText('username can\'t be blank');
await expect(page.locator('#app')).toContainText('email can\'t be blank');
}
)

test ('log in with blank email',
{tag: ['@smoke', '@regression']},
async({page})=>{
await page.goto('https://demo.learnwebdriverio.com/login')
await page.getByRole('button', { name: 'Sign in' }).click();
await expect(page.locator('#app')).toContainText('email can\'t be blank');
}
)

test ('log in with blank password',
{tag: ['@smoke', '@regression']},
async({page})=>{
await page.goto('https://demo.learnwebdriverio.com/login')
await page.getByRole('textbox', { name: 'Email' }).fill('test7@mail.com')
await page.getByRole('button', { name: 'Sign in' }).click();
await expect(page.locator('#app')).toContainText('password can\'t be blank');
}
)

