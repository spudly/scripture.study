describe('Volume Books', () => {
  it('has a link to each book in the volume', () => {
    cy.visit('/scriptures/Book.of.Mormon');
    cy.findByRole('main')
      .findByText('1 Nephi', {selector: 'a'})
      .should('exist');
    cy.findByRole('main')
      .findByText('2 Nephi', {selector: 'a'})
      .should('exist');
  });
});
