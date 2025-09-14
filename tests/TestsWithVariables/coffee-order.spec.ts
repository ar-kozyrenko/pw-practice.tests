import { test, expect } from '@playwright/test';
const mainPage = 'https://coffee-cart.app/'
let count = 2+2
console.log(count)



test('CS-0001 Cofee items are added to the cart', 
  { tag: "@regression" }, 
  async ({ page }) => {
const selectEspresso = page.locator('[data-test="Espresso"]')
const selectEspressoMacchiato = page.locator('[data-test="Espresso_Macchiato"]')
const cartPage = page.locator('[aria-label="Cart page"]')
const cartItems = page.locator('#app')

await page.goto(mainPage);
  await selectEspresso.click();
  await selectEspressoMacchiato.click();
  await cartPage.click();
  await expect(cartItems).toContainText('Espresso');
  await expect(cartItems).toContainText('Espresso Macchiato');
});

test('CS-0002 Valid total value is displayed', 
  { tag: "@smoke" },
  async ({ page }) => {
const selectEspresso = page.locator('[data-test="Espresso"]')
const selectCappuccino = page.locator('[data-test="Cappuccino"]')
const cartPage = page.locator('[aria-label="Cart page"]')
const checkoutTotal = page.locator('[data-test="checkout"]')

  await page.goto(mainPage);
  await selectEspresso.click();
  await selectCappuccino.click();
  await cartPage.click();
  await expect(checkoutTotal).toContainText('Total: $29.00');
});

test('CS-0003 Add-remove an item', 
  { tag: "@smoke" }, 
  async ({ page }) => {
const selectEspresso = page.locator('[data-test="Espresso"]')
const cartPage = page.locator('[aria-label="Cart page"]')
const addOneEspresso = page.locator('[data-v-8965af83][aria-label="Add one Espresso"]')
const cartItems = page.locator('#app')
const removeOneEspresso = page.locator('[data-v-8965af83][aria-label="Remove one Espresso"]')

  await page.goto(mainPage);
  await selectEspresso.click();
  await cartPage.click();
  await addOneEspresso.click()
  await expect(cartItems).toContainText('$10.00 x 2');  
  await removeOneEspresso.click()
  await expect(cartItems).toContainText('$10.00 x 1');
});

test('CS-0004 Remove the items from the cart', 
  { tag: "@smoke" },
  async ({ page }) => {
const selectEspresso = page.locator('[data-test="Espresso"]')
const selectEspressoMacchiato = page.locator('[data-test="Espresso_Macchiato"]')
const cartPage = page.locator('[aria-label="Cart page"]')
const removeAllEspressso = page.locator('[aria-label="Remove all Espresso"]')
const removeAllEspresssoMacchiato = page.locator('[aria-label="Remove all Espresso Macchiato"]')
 const paragrapgh = page.getByRole('paragraph')

  await page.goto(mainPage);
  await selectEspresso.click();
  await selectEspressoMacchiato.click();
  await cartPage.click();
  await removeAllEspressso.click()
  await removeAllEspresssoMacchiato.click()
  await expect(paragrapgh).toContainText('No coffee, go add some.');
});

test('CS-0005 Payment details pop-up is displayed',
  { tag: "@smoke" },
  async ({ page }) => {
const selectEspresso = page.locator('[data-test="Espresso"]')
const checkoutTotal = page.locator('[data-test="checkout"]')
const h1 = page.locator('h1')

  await page.goto(mainPage);
  await selectEspresso.click();
  await checkoutTotal.click();
  await expect(h1).toContainText('Payment details');
});


test('CS-0006 Payment Details popup - the name and email values are displayed', 
  { tag: "@smoke" },
   async ({ page }) => {
const selectEspresso = page.locator('[data-test="Espresso"]')
const checkoutTotal = page.locator('[data-test="checkout"]')
const paymentPopupName = page.locator('[id="name"]')
const paymentPopupEmail = page.locator('[id="email"]')

  await page.goto(mainPage);
  await selectEspresso.click();
  await checkoutTotal.click();
  await paymentPopupName.fill('test1');
  await paymentPopupEmail.fill('test@mail.com');
  await expect(paymentPopupName).toHaveValue('test1')
  await expect(paymentPopupEmail).toHaveValue('test@mail.com');
});

test('CS-0007 Payment details are successfully sent',
  { tag: "@smoke" }, 
  async ({ page }) => {
const selectEspresso = page.locator('[data-test="Espresso"]')
const checkoutTotal = page.locator('[data-test="checkout"]')
const paymentPopupName = page.locator('[id="name"]')
const paymentPopupEmail = page.locator('[id="email"]')
const paymentPopupSubmitBtn = page.locator('[id="submit-payment"]')
const successPaymentNotification = page.locator('#app')

  await page.goto(mainPage);
  await selectEspresso.click();
  await checkoutTotal.click();
  await paymentPopupName.fill('test1');
  await paymentPopupEmail.fill('test@mail.com');
  await paymentPopupSubmitBtn.click()
  await expect(successPaymentNotification).toContainText('Thanks for your purchase. Please check your email for payment.');
});

test('CS-0008 Extra cup suggestion when 3 cups ordered', 
{ tag: ["@regression", "@sanity"] },
  async ({ page }) => {
const selectEspresso = page.locator('[data-test="Espresso"]')
const selectEspressoMacchiato = page.locator('[data-test="Espresso_Macchiato"]')
const selectCappuccino = page.locator('[data-test="Cappuccino"]')
const getExtraCup = page.locator('#app')
  
  await page.goto(mainPage);
  await selectEspresso.click();
  await selectEspressoMacchiato.click();
  await selectCappuccino.click();
  await expect(getExtraCup).toContainText('It\'s your lucky day! Get an extra cup of Mocha for $4.');
});