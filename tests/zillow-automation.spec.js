// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  //Opens zillow and log the user in
  await page.goto('https://www.zillow.com');
  await page.waitForTimeout(2000);
  // await page.pause();
  // //It closes the google popup
  await page.frameLocator('iframe[title="Sign in with Google Dialog"]').getByLabel('Close').click();
  await page.getByRole('link', { name: 'Sign In' }).click();
  
  //Add your email and password to the fill strings
  // await page.pause();
  await page.getByPlaceholder('Enter email').fill("mr.robot.o@outlook.com");
  // await page.pause();
  await page.getByPlaceholder('Enter password').fill("RobieOto123!");
  await page.getByRole('button', {name: 'Sign in'}).click();
  await page.waitForTimeout(2000);

  // await page.pause();
  //   await page.getByPlaceholder('Enter an address, neighborhood, city, or ZIP code').fill("Orlando");

  const ulElement = await page.$$('ul[role="list"] li');
  if (ulElement.length > 0) {
    // Process each li element in the array
    for (const liElement of ulElement) {
      const textContent = await page.evaluate(li => li.textContent, liElement);

      if (textContent?.includes('34746')) {
        const button = await liElement.$('button');
        if (button) {
          await button.click();
          await page.waitForTimeout(2000);
          console.log('Text content of li element:', textContent);
        }
      }
    }
  } else {
    console.log('No li elements found inside the ul with role="list".');
  }

//     //Searchbar fill
//     // await page.getByRole('button', { name: 'Got it!' }).click();
//     await page.getByPlaceholder('Enter an address, neighborhood, city, or ZIP code').fill("Orlando");
//     // await page.pause();
//     await page.getByRole('button', {name: 'Submit Search'}).click();
  
  
//     // Filters
  
//     // Filter Bed and Baths
//    await page.getByRole('button', { name: 'Beds & Baths' }).click();
//    await page.getByLabel('Beds Select').getByRole('button', { name: '4+' }).click();
//    await page.getByLabel('Baths Select').getByRole('button', { name: '2+' }).click();
//  await page.locator('[data-test="close-filters-button"]').click();
// // Filter Price
//  await page.locator('[data-test="price-filters-button"]').click();
//  await page.getByLabel('Price max').fill("400,000");
//  await page.getByRole('button', {name: 'Apply'}).click();

});