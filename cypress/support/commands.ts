import '@testing-library/cypress/add-commands';

Cypress.Commands.add('showSideNav', () => {
  cy.findByTestId('side-nav').then($sideNav => {
    if (!$sideNav.is(':visible')) {
      cy.findByTitle('Show Side Navigation').click();
    }
  });
});
