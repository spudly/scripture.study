it('loads', () => {
  cy.visit('/');
});

it('has a link to each scripture volume', () => {
  cy.visit('/');
  cy.findByText('The Old Testament').should('exist');
  cy.findByText('The Book of Mormon').should('exist');
});
