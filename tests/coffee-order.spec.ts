import { test, expect } from '@playwright/test';

test('CS-0001 Cofee items are added to the cart', 
  { tag: "@regression" }, 
  async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.getByRole('link', { name: 'Cart page' }).click();
  await expect(page.locator('#app')).toContainText('Espresso');
  await page.locator('div').filter({ hasText: /^Espresso Macchiato$/ }).click();
});

test('CS-0002 Valid total value is displayed', 
  { tag: "@smoke" },
  async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
  await page.getByRole('link', { name: 'Cart page' }).click();
  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $29.00');
});

test('CS-0003 Add-remove an item', 
  { tag: "@smoke" }, 
  async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso"]').click();
  await page.getByRole('link', { name: 'Cart page' }).click();
  await page.getByRole('button', { name: 'Add one Espresso' }).click();
  await expect(page.locator('#app')).toContainText('$10.00 x 2');
  await page.getByRole('button', { name: 'Remove one Espresso' }).click();
  await expect(page.locator('#app')).toContainText('$10.00 x 1');
});

test('CS-0004 Remove the items from the cart', 
  { tag: "@smoke" },
  async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.getByRole('link', { name: 'Cart page' }).click();
  await page.getByRole('button', { name: 'Remove all Espresso', exact: true }).click();
  await page.getByRole('button', { name: 'Remove all Espresso Macchiato' }).click();
  await expect(page.getByRole('paragraph')).toContainText('No coffee, go add some.');
});

test('CS-0005 Payment details pop-up is displayed',
  { tag: "@smoke" },
  async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="checkout"]').click();
  await expect(page.locator('h1')).toContainText('Payment details');
});

test('CS-0006 Payment Details popup - the name and email values are displayed', 
  { tag: "@smoke" },
   async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.getByRole('textbox', { name: 'Name' }).fill('test1');
  await page.getByRole('textbox', { name: 'Email' }).fill('test@mail.com');
  await expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue('test1');
  await expect(page.getByRole('textbox', { name: 'Email' })).toHaveValue('test@mail.com');
});

test('CS-0007 Payment details are successfully sent',
  { tag: "@smoke" }, 
  async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.getByRole('textbox', { name: 'Name' }).fill('test1');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test@mail.com');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#app')).toContainText('Thanks for your purchase. Please check your email for payment.');
});

test('CS-0008 Extra cup suggestion when 3 cups ordered', 
{ tag: ["@regression", "@sanity"] },
  async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
  await expect(page.locator('#app')).toContainText('It\'s your lucky day! Get an extra cup of Mocha for $4.');
});