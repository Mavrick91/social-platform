describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('renders the login form', () => {
    cy.get('form').should('exist');
    cy.get('input#email').should('exist');
    cy.get('input#password').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('displays an error message for invalid credentials', () => {
    cy.mockGraphQLMutation(
      'Login',
      'mutations/authentication/invalidCredentials.json'
    );

    cy.get('input#email').type('test@example.com');
    cy.get('input#password').type('password');
    cy.get('button[type="submit"]').click();

    cy.wait('@Login');

    cy.get('#error-message')
      .should('be.visible')
      .and('contain', 'Invalid email or password');
  });

  it('logs in with valid credentials', () => {
    cy.mockGraphQLMutation(
      'Login',
      'mutations/authentication/successfulLogin.json'
    );
    cy.mockGraphQLMutation('GetUserProfile', 'queries/users/validUser.json');
    cy.mockGraphQLMutation(
      'GetPicturesFromFollowing',
      'queries/pictures/validAuthor.json'
    );

    cy.get('input#email').type('test@example.com');
    cy.get('input#password').type('password');
    cy.get('button[type="submit"]').click();

    cy.wait('@Login');
    cy.wait('@GetUserProfile');
    cy.wait('@GetPicturesFromFollowing');

    cy.url().should('include', '/');
  });
});
