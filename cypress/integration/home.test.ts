it('loads', () => {
  cy.visit('/');
});

it('has a link to each scripture volume', () => {
  cy.visit('/');
  cy.findByText('The Old Testament').should('exist');
  cy.findByText('The New Testament').should('exist');
  cy.findByText('The Book of Mormon').should('exist');
  cy.findByText('The Doctrine and Covenants').should('exist');
  cy.findByText('The Pearl of Great Price').should('exist');
});
