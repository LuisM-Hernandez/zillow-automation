// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  //This handles the "Timeout Exceeded" error and helps execute the while loop as it goes through each iteration
  test.setTimeout(200000)

  // Login and House filtering preferences
  const email = "ENTER YOUR EMAIL";
  const password = "ENTER YOUR PASSWORD";
  const city = "ENTER CITY NAME"
  const bedAmount = "ENTER YOUR NUMBER IN THIS FORMAT (3+)"
  const bathAmount = "ENTER YOUR NUMBER IN THIS FORMAT (3+)"
  const maxPriceRange = "ENTER MAX PRICE RANGE IN THIS FORMAT (400,000)"
  const zipCode = "ENTER THE ZIPCODE"
  
  //Opens zillow and log the user in
  await page.goto('https://www.zillow.com/');
  // await page.pause();
  
  //It closes the google popup
  await page.frameLocator('iframe[title="Sign in with Google Dialog"]').getByLabel('Close').click();
  await page.getByRole('link', { name: 'Sign In' }).click();
  
  //Add your email and password to the fill the fields

  await page.getByPlaceholder('Enter email').fill(email);
  await page.getByPlaceholder('Enter password').fill(password);
  await page.getByRole('button', {name: 'Sign in'}).click();
  
  //Searchbar fill
  await page.getByRole('button', { name: 'Got it!' }).click();
  await page.getByPlaceholder('Enter an address, neighborhood, city, or ZIP code').fill(city);
  // await page.waitForTimeout(2000);
  await page.getByRole('button', {name: 'Submit Search'}).click();
  //This timeout is set so the test keeps running
  await page.waitForTimeout(2000);

  // Filters
  

  // Filter Bed and Baths
  await page.getByRole('button', { name: 'Beds & Baths' }).click();
  await page.getByLabel('Beds Select').getByRole('button', { name: bedAmount }).click();
  await page.getByLabel('Baths Select').getByRole('button', { name: bathAmount }).click();
  await page.locator('[data-test="close-filters-button"]').click();

  // Filter Price
   await page.locator('[data-test="price-filters-button"]').click();
   await page.getByLabel('Price max').fill(maxPriceRange);
   await page.getByRole('button', {name: 'Apply'}).click();
     //This timeout is set so the test keeps running
  await page.waitForTimeout(2000);


  const liCount = await page.$$eval('.List-c11n-8-84-3__sc-1smrmqp-0 > li', lis => lis.length);

  // Get all li elements within the UL
  const liElements = await page.$$('.List-c11n-8-84-3__sc-1smrmqp-0 li');


  // Iterate through each li element
  for (const liElement of liElements) {
    // Find the address element within the li
    const addressElement = await liElement.$('[data-test="property-card-addr"]');
    if (addressElement) {
      await page.waitForTimeout(4000);
      // Get the text content of the address element
      const addressText = await addressElement.textContent();
     
      if (addressText?.includes(zipCode)) {
        const saveButton = await liElement.$('[data-test="property-card-save"]');
        saveButton?.click()
        console.log(addressText);
      }
    }
  }

  });




