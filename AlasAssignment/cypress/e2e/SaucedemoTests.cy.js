import {
  conf
} from '../support/sauce.conf.js'
// A JS file containing all configurable input data was created and imported in order for easier future manipulation
// of input data used for testing ( See sauce.conf.js for more info )

describe('Tests', () => {

    beforeEach(() => {

        // Logged on User is required for all further testing; Standard User credentials were used, since the scope of the testing
        // are Order flow functionalities and not the Login Page
        cy.StandardLogin()

    })

    it('Verify inventory page elements visibility', () => {

        // Before any functional testing is done, a simple page elements visiblity test is executed
        cy.url().should('include', '/inventory.html')
        cy.get('.inventory_item').should('be.visible')
            .should('have.length.greaterThan', 0)
        cy.get('button').contains('Open Menu').should('be.visible')
        cy.get('select.product_sort_container').should('be.visible')
        cy.get('a.shopping_cart_link').should('be.visible')

        conf.socials.forEach(function(value) {
            cy.get(`.social_${value}`).should('be.visible')
        })

    })

    it('Verify Cart icon update on adding items', () => {

        cy.AddItemToCart(conf.productName1)
        cy.get('.shopping_cart_badge').should('contain', '1')
        cy.AddItemToCart(conf.productName2)
        cy.get('.shopping_cart_badge').should('contain', '2')

    })

    it('Adding one item to Cart through its details page', () => {

        // Most of the Product manipulation / verification actions are executed as custom made Commands because the nature of the Testing
        // calls for multiple uses for the same actions between tests ( See commands.js file for more detailed info )
        cy.get('a').contains(conf.productName1).click()
        cy.url().should('include', '/inventory-item')
        cy.AddDescItemToCart(conf.productName1)
        cy.GoToCart()
        cy.VerifyCartItems([conf.productName1])

    })

    it('Adding two items to Cart', () => {

        cy.AddItemToCart(conf.productName1)
        cy.AddItemToCart(conf.productName2)
        cy.GoToCart()
        cy.VerifyCartItems([conf.productName1, conf.productName2])

    })

    it('Verify removing items from Cart', () => {

        cy.AddItemToCart(conf.productName1)
        cy.AddItemToCart(conf.productName2)
        cy.GoToCart()
        cy.VerifyCartItems([conf.productName1, conf.productName2])
        cy.RemoveItemFromCart(conf.productName1)
        cy.VerifyCartItems([conf.productName2])

    })

    it('Verify Order Completion', () => {

        // Lastly, a Test verifing the complete happy path flow of ordering a single item;
        // assertions are made after each step in the order flow
        cy.AddItemToCart(conf.productName1)
        cy.GoToCart()
        cy.get('#checkout').click()
        cy.url().should('include', '/checkout-step-one')
        cy.get('input#first-name').type(conf.FirstName)
        cy.get('input#last-name').type(conf.LastName)
        cy.get('input#postal-code').type(conf.ValidZip)
        cy.get('#continue').click()
        cy.url().should('include', '/checkout-step-two')
        cy.VerifyCartItems([conf.productName1])
        cy.get('#finish').click()
        cy.url().should('include', '/checkout-complete')
        cy.contains(conf.completeOrderHeader).should('be.visible')
        cy.contains(conf.completeOrderText).should('be.visible')

    })

})
