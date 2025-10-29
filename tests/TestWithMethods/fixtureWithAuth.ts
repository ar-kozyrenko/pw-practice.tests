import { test as base, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { SignUpPage } from '../../apps/conduit/ui/pages/SignUpPage';

export const test = base.extend({
  storageState: async ({browser}, use) => {
    const page = await browser.newPage();
    const signUpPage = new SignUpPage(page);
    const storageStatePath = path.join('.auth', `storage-state_${signUpPage.testUserName}.json`);

    if (!fs.existsSync(storageStatePath)) {
      console.log(`Storage file not found, creating new: ${storageStatePath}`);

      await signUpPage.signUpAction();
      await expect(page.locator('#app')).toContainText(signUpPage.testUserName);

      await page.context().storageState({ path: storageStatePath });
      console.log(`✅ Storage state saved: ${storageStatePath}`);
    } else {
      console.log(`Storage state already exists: ${storageStatePath}`);
    }

    await page.close();
    await use(storageStatePath);
  }
});
