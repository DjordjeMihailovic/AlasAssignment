import {
  ProvidedHeaders,
  newUserData,
  Endpoints,
  UpdateUserData,
} from '../support/api.conf.js'

// cypress-plugin-api was used as a handy plugin for api testing in Cypress; basically cy.api() works exactly like cy.request() 
// but in addition to calling API, it will print out information about the API call in Cypress runner
// Install this package with CMD by command: npm i cypress-plugin-api

describe('Tests', () => {

  it('Should Create a new user', () => {

      // Happy path creating a User; endpoint, headers and body content are imported from api.conf.js file
      cy.api({
          method: 'POST',
          url: Endpoints.users,
          headers: ProvidedHeaders,
          body: newUserData,
      }).then((response) => {
          expect(response.status).to.equal(201)
          expect(response.body).to.have.property('id').that.is.a('number')
          expect(response.body).to.have.property('name', newUserData.name)
          expect(response.body).to.have.property('gender', newUserData.gender)
          expect(response.body).to.have.property('email', newUserData.email)
          expect(response.body).to.have.property('status', newUserData.status)

          // Created Users' ID is saved in an Environment variable which is used later for Updating and Deleting selected User
          const userId = response.body.id
          Cypress.env('userId', userId)

      })
  })

  it('Should not Create a new user with missing Auth', () => {

      cy.api({
          method: 'POST',
          url: Endpoints.users,
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: newUserData,
          failOnStatusCode: false,
      }).then((response) => {
          expect(response.status).to.equal(401)
          expect(response.body).to.have.property('message', 'Authentication failed')

      })
  })

  it('Should not Create a new user with already existing email', () => {

      // Verifying that the creation of the new User with same parameters is disabled; each User should have an unique email
      // we know that we have already created a User with these parameters in the Database
      cy.api({
          method: 'POST',
          url: Endpoints.users,
          headers: ProvidedHeaders,
          body: newUserData,
          failOnStatusCode: false,
      }).then((response) => {
          expect(response.status).to.equal(422)
          expect(response.body[0].field).to.equal('email')
          expect(response.body[0].message).to.equal('has already been taken')

      })
  })

  it('Should not Create a new user with missing fields passed through body', () => {

      cy.api({
          method: 'POST',
          url: Endpoints.users,
          headers: ProvidedHeaders,
          body: {},
          failOnStatusCode: false
      }).then((response) => {
          expect(response.status).to.equal(422)
          expect(response.body[0].field).to.equal('email')
          expect(response.body[0].message).to.equal("can't be blank")
          expect(response.body[1].field).to.equal('name')
          expect(response.body[1].message).to.equal("can't be blank")
          expect(response.body[2].field).to.equal('gender')
          expect(response.body[2].message).to.equal("can't be blank, can be male of female")
          expect(response.body[3].field).to.equal('status')
          expect(response.body[3].message).to.equal("can't be blank")

      })
  })

  it('Should Update User', () => {

      cy.api({
          method: 'PATCH',
          url: Endpoints.users + Cypress.env('userId'),
          headers: ProvidedHeaders,
          body: UpdateUserData,
      }).then((response) => {
          expect(response.status).to.equal(200)
          expect(response.body).to.have.property('id', Cypress.env('userId'))
          expect(response.body).to.have.property('name', UpdateUserData.name)
          expect(response.body).to.have.property('gender', UpdateUserData.gender)
          expect(response.body).to.have.property('email', UpdateUserData.email)
          expect(response.body).to.have.property('status', UpdateUserData.status)

      })
  })

  it('Should not Update User with invalid gender', () => {

      cy.api({
          method: 'PATCH',
          url: Endpoints.users + Cypress.env('userId'),
          headers: ProvidedHeaders,
          body: {
              gender: 'helicopter' // 'gender' field is only selective of the content passed ( male or female ), other fields will allow any strings
          },
          failOnStatusCode: false,
      }).then((response) => {
          expect(response.status).to.equal(422)
          expect(response.body[0].field).to.equal('gender')
          expect(response.body[0].message).to.equal("can't be blank, can be male of female")

      })
  })

  it('Should Delete User', () => {

      cy.api({
          method: 'DELETE',
          url: Endpoints.users + Cypress.env('userId'),
          headers: ProvidedHeaders
      }).then((response) => {
          expect(response.status).to.equal(204)

      })
  })

  it('Should not Delete non-existing User', () => {

      cy.api({
          method: 'DELETE',
          url: Endpoints.users + 123456789, // 123456789 is the selected number in constructing a non-existing User; User ID's are constructed from 7 digits
          headers: ProvidedHeaders,
          failOnStatusCode: false,
      }).then((response) => {
          expect(response.status).to.equal(404)
          expect(response.body).to.have.property('message', 'Resource not found')

      })
  })
  
})
