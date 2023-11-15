// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  const pause = await page.pause();
  //Opens zillow and log the user in
  await page.goto('https://www.zillow.com/');
  // await page.pause();
  //It closes the google popup
  await page.frameLocator('iframe[title="Sign in with Google Dialog"]').getByLabel('Close').click();
  await page.getByRole('link', { name: 'Sign In' }).click();
  //Add your email to the fill string
  await page.getByPlaceholder('Enter email').fill("mr.robot.o@outlook.com")
  await page.pause();
  //Add your password to the fill string
  await page.getByPlaceholder('Enter password').fill("Honda1991!")
  await page.pause();
  // await page.locator('text=Sign In').click();
  // pause

});

