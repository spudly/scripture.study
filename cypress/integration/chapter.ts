describe('Chapter', () => {
  it('renders each verse', () => {
    cy.visit('/scriptures/Old.Testament/Genesis/1');
    cy.findByRole('main')
      .findByText('IN the beginning God created the heaven and the earth.')
      .should('exist');
    cy.findByRole('main')
      .findByText(
        'And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.',
      )
      .should('exist');
  });
});
