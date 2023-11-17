// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  //This handles the "Timeout Exceeded" error and helps execute the while loop as it goes through each iteration
  test.setTimeout(200000)

  //Opens zillow and log the user in
  await page.goto('https://www.zillow.com');
  // await page.waitForTimeout(2000);
  // await page.pause();
  // //It closes the google popup
  await page.frameLocator('iframe[title="Sign in with Google Dialog"]').getByLabel('Close').click();
  await page.getByRole('link', { name: 'Sign In' }).click();
  
  //Add your email and password to the fill strings
  // await page.pause();
  await page.getByPlaceholder('Enter email').fill("mr.robot.o@outlook.com");
  await page.getByPlaceholder('Enter password').fill("RobieOto123!");
  await page.getByRole('button', {name: 'Sign in'}).click();
  // await page.waitForTimeout(2000);
  
  //Searchbar fill
  await page.getByRole('button', { name: 'Got it!' }).click();
  await page.getByPlaceholder('Enter an address, neighborhood, city, or ZIP code').fill("32837");
  // await page.waitForTimeout(2000);
  await page.getByRole('button', {name: 'Submit Search'}).click();
  await page.waitForTimeout(2000);
  // await page.pause();
  
  const ulElement = await page.$$('.List-c11n-8-84-3__sc-1smrmqp-0.StyledSearchListWrapper-srp__sc-1ieen0c-0.doa-doM.fgiidE.photo-cards.photo-cards_extra-attribution li');
  
  // Process a limited number of elements in each iteration
  const elementsPerIteration = 20;
  let currentIndex = 0;
  
  
  while (currentIndex < ulElement.length) {
    const endIndex = Math.min(currentIndex + elementsPerIteration, ulElement.length);
    console.log('Processing elements from index', currentIndex, 'to', endIndex);




    for (let i = currentIndex; i < endIndex; i++) {
      const liElement = ulElement[i];
      
      try {
        const textContent = await page.evaluate(li => li.textContent, liElement);
  
        if (textContent?.includes('32837')) {
          const button = await liElement.$('button');

          if (button) {
            await page.waitForTimeout(2000);

            await button.click();
            console.log('Text content of li element:', textContent);
            
          }
        }
      } catch (error) {
        console.error('Error during processing:', error);
      }
    }
    
    // Update the current index for the next iteration
    currentIndex = endIndex;
    console.log('Finished processing elements from index', currentIndex, 'to', endIndex);

    // Introduce a delay between iterations to avoid overloading the website
    // await new Promise(resolve => setTimeout(resolve, 2000));
  }

  });




