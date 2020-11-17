describe('Volumes', () => {
  it('has a link to each scripture volume', () => {
    cy.visit('/');
    cy.findByRole('main').findByText('Old Testament').should('exist');
    cy.findByRole('main').findByText('Book of Mormon').should('exist');
  });
});
