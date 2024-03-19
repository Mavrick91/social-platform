/// <reference types="cypress" />

Cypress.Commands.add('mockGraphQLMutation', (mutationName, fixturePath) => {
  cy.readFile(`cypress/fixtures/${fixturePath}`).then((fixtureData) => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.query && req.body.query.includes(mutationName)) {
        req.reply(fixtureData);
      }
    }).as(mutationName);
  });
});
