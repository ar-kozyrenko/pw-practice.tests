import { test, expect, type Page } from '@playwright/test';

// Блокировка рекламы и трекеров
test.beforeEach(async ({ page }) => {
    await page.route('**/*', (route) => {
        const url = route.request().url()
        const blockedResources = ['ads', 'analytics', 'googletag', 'doubleclick', 'googlesyndication']

        if (blockedResources.some(resource => url.includes(resource))) {
            route.abort()
        } else {
            route.continue()
        }
    })
})

test('text box',
    async ({ page }) => {
        await page.goto('https://demoqa.com/')
        await page.locator("//h5[text()='Elements']").click()
        await page.locator("//*[contains(text(), 'Text Box')]").click()
        await page.locator("//label[text()='Full Name']/ancestor::div[contains(@class, 'mt-2')]//input").fill('Test Full Name1')
        await page.locator("//label[text()='Email']/ancestor::div[contains(@class, 'mt-2')]//input").fill('test@mail.com')
        await page.locator("//label[text()='Current Address']/ancestor::div[contains(@class, 'mt-2')]//textarea").fill('Test Current Address')
        await page.locator("//label[text()='Permanent Address']/ancestor::div[contains(@class, 'mt-2')]//textarea").fill('Test Permanent Address')
        await page.locator("//button[text()='Submit']/ancestor::div[contains(@class, 'mt-2')]//button").click()



    }
)

test('checkbox',
    async ({ page }) => {
        await page.goto('https://demoqa.com/')
        await page.locator("//h5[text()='Elements']").click()
        await page.locator("//span[text() = 'Check Box']").click()
        await page.locator("//*[@class='rct-icon rct-icon-expand-all']").click()
        await page.locator("//span[text()='Desktop']/ancestor::label//span[@class='rct-title']").click()
        await page.locator("//span[text()='Documents']/ancestor::label//span[@class='rct-title']").click()
        await page.locator("//span[text()='Office']/ancestor::label//span[@class='rct-title']").click()
        await page.locator("//span[text()='Downloads']/ancestor::label//span[@class='rct-title']").click()

    }
)

test('radio button',
    async ({ page }) => {
        await page.goto('https://demoqa.com/')
        await page.locator("//h5[text()='Elements']").click()
        await page.locator("//span[text() = 'Radio Button']").click()
        //await page.locator("//label[text()='Impressive']/ancestor::div//input[@id='impressiveRadio']").click()       
        await page.locator("//label[text()='Impressive']").click()

    }
)

test('buttons',
    async ({ page }) => {
        await page.goto('https://demoqa.com/')
        await page.locator("//h5[text()='Elements']").click()
        await page.locator("//span[text() = 'Buttons']").click()
        await page.locator("//button[@id='doubleClickBtn']").dblclick()
        await page.locator("//button[@id='rightClickBtn']").click({ button: 'right' })
        await page.locator("//button[text()='Click Me']").click()



    }
)