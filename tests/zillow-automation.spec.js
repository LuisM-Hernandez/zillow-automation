// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  //This handles the "Timeout Exceeded" error and helps execute the while loop as it goes through each iteration
  test.setTimeout(200000)

  //Opens zillow and log the user in
  await page.goto('https://www.zillow.com');

  // //It closes the google popup
  await page.frameLocator('iframe[title="Sign in with Google Dialog"]').getByLabel('Close').click();
  await page.getByRole('link', { name: 'Sign In' }).click();
  
  //Add your email and password to the fill the fields
  await page.getByPlaceholder('Enter email').fill("mr.robot.o@outlook.com");
  await page.getByPlaceholder('Enter password').fill("RobieOto123!");
  await page.getByRole('button', {name: 'Sign in'}).click();
  
  //Searchbar fill
  await page.getByRole('button', { name: 'Got it!' }).click();
  await page.getByPlaceholder('Enter an address, neighborhood, city, or ZIP code').fill("Orlando");
  // await page.waitForTimeout(2000);
  await page.getByRole('button', {name: 'Submit Search'}).click();
  //This timeout is set so the test keeps running
  await page.waitForTimeout(2000);

  // Filters
  
  // Filter Bed and Baths
  await page.getByRole('button', { name: 'Beds & Baths' }).click();
  await page.getByLabel('Beds Select').getByRole('button', { name: '4+' }).click();
  await page.getByLabel('Baths Select').getByRole('button', { name: '2+' }).click();
  await page.locator('[data-test="close-filters-button"]').click();

  // Filter Price
   await page.locator('[data-test="price-filters-button"]').click();
   await page.getByLabel('Price max').fill("400,000");
   await page.getByRole('button', {name: 'Apply'}).click();
     //This timeout is set so the test keeps running
  await page.waitForTimeout(2000);
  // await page.pause();

  // This code goes through the ul holding the house listings and clicks the save button on the ones that match the textContent

  // Select all list items (li) elements within a specific type of container on the page
  const ulElement = await page.$$('.List-c11n-8-84-3__sc-1smrmqp-0.StyledSearchListWrapper-srp__sc-1ieen0c-0.doa-doM.fgiidE.photo-cards.photo-cards_extra-attribution li');
  
  // Process a limited number of elements in each iteration
  const elementsPerIteration = 20;
  let currentIndex = 0;

  // Iterate through the list elements in chunks of 'elementsPerIteration'
  while (currentIndex < ulElement.length) {
    // Calculate the end index for the current iteration
    const endIndex = Math.min(currentIndex + elementsPerIteration, ulElement.length);
    console.log('Processing elements from index', currentIndex, 'to', endIndex);

      // Iterate through the selected range of list elements
    for (let i = currentIndex; i < endIndex; i++) {
          // Get the current list item element
      const liElement = ulElement[i];

      try {
         // Extract the text content of the current list item element
        const textContent = await page.evaluate(li => li.textContent, liElement);
        // Check if the text content includes the specified string '32811'
        if (textContent?.includes('32811')) {
        // Find a button element within the current list item element
          const button = await liElement.$('button');
        // If a button is found, wait for a timeout, click the button, and log the text content
          if (button) {
            await page.waitForTimeout(3000);
            await button.click();
            console.log('Text content of li element:', textContent);
          }
        }
      } catch (error) {
        // Log an error if there is an exception during processing
        console.error('Error during processing:', error);
      }
    }
    // Update the current index for the next iteration
    currentIndex = endIndex;
    console.log('Finished processing elements from index', currentIndex, 'to', endIndex);
    // Introduce a delay between iterations to avoid overloading the website
    await new Promise(resolve => setTimeout(resolve, 5000));
  }

  });




