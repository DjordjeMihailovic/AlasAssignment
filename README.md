# AlasAssignment
This repository contains suggested solutions for the QA Automation assignment submitted by the candidate, Djordje Mihailovic.

The purpose of this document is to provide insights into the contents of the repository, as well as to provide guidance on how to import and run tests.

Candidate's tool choice for this assignment was Cypress, and below you can find more information on how to properly setup tests from this repository.


### Configuring Cypress and importing tests

  1. Firstly, make sure that you have properly set up Cypress on your machine ( more info can be found on the link: https://docs.cypress.io/guides/getting-started/installing-cypress )
  2. Copy and save the Clone link from the repo ( eg. https://github.com/DjordjeMihailovic/AlasAssignment.git )
  3. Make a local folder on your machine where you want to import the project
  4. Open git bash and navigate to the newly created folder
  5. Type in the bash: `git clone "provided-link"`
  6. The project should be imported to your machine and you can access it now like any other Cypress project

### Running specs in headless mode via the command line

  1. Firstly, install Node.js to your machine ( more info on the link:  https://nodejs.org/ )
  2. Open CMD and navigate to the location of the installed cypress project ( eg. in the picture )
  <br/><br/>
  ![image](https://github.com/DjordjeMihailovic/AlasAssignment/assets/84343168/244dfa2d-dd82-4df1-8584-4d873aaedbdc)
  <br/><br/>
  3. Type into the terminal: `npx cypress run --headless --spec "path-to-your-desired-spec"` ( eg. of a successful test run in the picture )
  <br/><br/>
  ![image](https://github.com/DjordjeMihailovic/AlasAssignment/assets/84343168/4636f47c-20f6-427d-b88d-b56f638f74c8)
  <br/><br/>
  4. If you wish to run multiple specs use the next command: `npx cypress run --headless --spec "path-to-your-desired-spec, path-to-your-2nd-desired-spec"`
  <br/><br/>
  
  All other relevant information about the tests is properly commented within the code of the tests themselves.

  Thank you for your time! :)
