declare namespace Cypress {
  interface Chainable {
    mockGraphQLMutation(mutationName: string, fixturePath: string): void;
  }
}
