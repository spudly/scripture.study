/// <reference path="../support/index.d.ts" />

describe('Nav', () => {
  before(() => {
    cy.visit('/');
  });

  describe('Top Nav', () => {
    it('shows the side nav when you click the "Show Side Navigation" button', () => {
      cy.findByTestId('side-nav').should('not.be.visible');
      cy.findByTitle('Show Side Navigation').click();
      cy.findByTestId('side-nav').should('be.visible');
    });
  });

  describe('Side Nav', () => {
    it('closes when close button is clicked', () => {
      cy.showSideNav();
      cy.findByTestId('side-nav').should('be.visible');
      cy.findByTestId('side-nav').findByLabelText('Close').click();
      cy.findByTestId('side-nav').should('not.be.visible');
    });

    it('has a link to /scriptures', () => {
      cy.showSideNav();
      cy.findByTestId('side-nav')
        .findByText('Scriptures')
        .closest('a')
        .should('have.attr', 'href', '/scriptures');
    });

    it('has a link to /people', () => {
      cy.showSideNav();
      cy.findByTestId('side-nav')
        .findByText('People')
        .closest('a')
        .should('have.attr', 'href', '/people');
    });

    it('has a link to /auth/google', () => {
      cy.showSideNav();
      cy.findByTestId('side-nav')
        .findByText('Login')
        .closest('a')
        .should(
          'have.attr',
          'href',
          '/auth/google?authRedirectUrl=/scriptures',
        );
    });
  });
});
