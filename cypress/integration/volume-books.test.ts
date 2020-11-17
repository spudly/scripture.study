describe('Volume Books', () => {
  it('has a link to each book in the volume', () => {
    cy.visit('/scriptures/Old.Testament');
    cy.findByRole('main')
      .findByText('Genesis', {selector: 'a'})
      .should('exist');
    cy.findByRole('main').findByText('Exodus', {selector: 'a'}).should('exist');
  });
});
