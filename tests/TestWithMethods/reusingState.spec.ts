import { test } from './fixtureWithAuth';
import { expect } from '@playwright/test'
import { SignUpPage } from '../../apps/conduit/ui/pages/SignUpPage';

test.use({storageState: '.auth/storage-state_test001.json'})
test('use existing storage state', async ({ page }) => {
   const signUpPage = new SignUpPage(page)
  // await expect(page.locator('#app')).toContainText(signUpPage.testUserName);
  await page.goto('https://demo.learnwebdriverio.com');
  await expect(page.locator('#app')).toBeVisible()
  await expect(page.locator('#app')).toContainText(signUpPage.testUserName);
});

test('validate existing storage state', async ({ page }) => {
    const signUpPage = new SignUpPage(page)
  await page.goto('https://demo.learnwebdriverio.com');
 await expect(page.locator('#app')).toContainText(signUpPage.testUserName);
 console.log("the state is reused")
});