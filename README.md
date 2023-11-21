# zillow-automation

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  ## Description
  Automation made using playwright that will filter and save house listings with the user's own provided price, bed and bath options and zip code

  ## Installation
  ```
  npm i
  ```

  ## Usage
  1. [Need to have an account on zillow]
  2. [On line 16 add your Email]
  3. [On line 17 add your password]
  4. [On line 22 add a city]
  5. [Lines 32 (beds), 33 (baths) and 38 (price) you can change it to whatever options you like]
  6. [On line 68 provide a zip code]
  
  I made this as a learning experience using playwright, its functional but still in development for further improvements.
  It will only run firefox web browser for the automation because bot detection is quicker on Chrome.

  ## Test
  ```
  npx playwright test tests/zillow-automation.spec.js --headed
  ```

  ## Contact

  If you have any questions about this repository, open an issue or contact me directly at m.luishernandez@outlook.com. 
  
  You can find more of my work at https://github.com/LuisM-Hernandez

  ## License

    This project is licensed under the MIT license.

    

