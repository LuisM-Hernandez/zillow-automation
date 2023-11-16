// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  //Opens zillow and log the user in
  // await page.goto('https://www.zillow.com/homes/Orlando,-FL_rb/');
  await page.goto('https://www.zillow.com');
  await page.waitForTimeout(2000);
  await page.pause();


  //It closes the google popup
  await page.frameLocator('iframe[title="Sign in with Google Dialog"]').getByLabel('Close').click();
  await page.getByRole('link', { name: 'Sign In' }).click();
  const zipCode = await page.locator('data-test="property-card-addr"');
  console.log(zipCode);
  //Add your email and password to the fill strings
  await page.pause();
  await page.getByPlaceholder('Enter email').fill("mr.robot.o@outlook.com");
  // await page.pause();
  await page.getByPlaceholder('Enter password').fill("RobieOto123!");
  // await page.pause();
  await page.getByRole('button', {name: 'Sign in'}).click();
 
  
  
  //Searchbar fill
  // await page.getByRole('button', { name: 'Got it!' }).click();
  await page.getByPlaceholder('Enter an address, neighborhood, city, or ZIP code').fill("Orlando");
  // await page.pause();
  await page.getByRole('button', {name: 'Submit Search'}).click();


  
  // Filters
  
  // Filter Bed and Baths
  await page.getByRole('button', { name: 'Beds & Baths' }).click();
  await page.getByLabel('Beds Select').getByRole('button', { name: '4+' }).click();
  await page.getByLabel('Baths Select').getByRole('button', { name: '2+' }).click();
  await page.locator('[data-test="close-filters-button"]').click();
  
  // Filter price range
  await page.locator('[data-test="price-filters-button"]').click();
  await page.getByLabel('Price max').fill("400,000");
  await page.getByRole('button', {name: 'Apply'}).click();
});

// const zipCode= await page.locator('#first-collection').textContent();
//  console.log(zipCode);

//  if (zipCode?.includes("Loans")) {
//   console.log("We did it!!!");
//  }