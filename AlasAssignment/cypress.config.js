const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,     // chromeWebSecurity: false was added because of the problems occuring on testing page: https://www.saucedemo.com/
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});