describe('Book Chapters', () => {
  it('has a link to each chapter in the book', () => {
    cy.visit('/scriptures/Book.of.Mormon/1.Nephi');
    cy.findByRole('main').findByText('1', {selector: 'a'}).should('exist');
    cy.findByRole('main').findByText('2', {selector: 'a'}).should('exist');
  });
});
