import {
  conf
} from '../support/sauce.conf.js'

Cypress.Commands.add('StandardLogin', () => {

    // Login Command which uses Standard Username / Pass passed from sauce.conf file
    cy.visit(conf.devHomeURL)
    cy.get('input#user-name').type(conf.StandardUsername)
    cy.get('input#password').type(conf.Standardpassword)
    cy.get('#login-button').click()

})

Cypress.Commands.add('AddItemToCart', (name) => {

    // Add Item to Cart by passing the item name as displayed to the User on the Page
    cy.contains('[class^=inventory_item_name]', name)
        .parents('[class^=inventory_item_description]')
        .find('[id^="add-to-cart"]')
        .click()

})

Cypress.Commands.add('AddDescItemToCart', (name) => {

    cy.contains('[class^=inventory_details_name]', name)
        .parents('[class^=inventory_details_desc]')
        .find('[id^="add-to-cart"]')
        .click()

})

Cypress.Commands.add('GoToCart', () => {

    cy.get('.shopping_cart_badge').click()

})
Cypress.Commands.add('VerifyCartItems', (names) => {

    // Pass an Array of items to verify if they are present in the cart, firstly the function will check if the length of the array
    // passed is equal to the number of items present in cart and, nextly, if the exact items are present in the cart   
    cy.get('.cart_item').should('have.length', names.length)
    names.forEach((name) => {
        cy.get('.cart_item').contains(name).should('exist')
    })

})

Cypress.Commands.add('RemoveItemFromCart', (name) => {

    cy.contains('.inventory_item_name', name)
        .closest('.cart_item')
        .find('.cart_button')
        .click()

})