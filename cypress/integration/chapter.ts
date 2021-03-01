import {firstNephi1Verse1, firstNephi1Verse2} from '../../src/fixtures/verses';

describe('Chapter', () => {
  it('renders each verse', () => {
    cy.visit('/scriptures/Book.of.Mormon/1.Nephi/1');
    cy.findByRole('main')
      .findByText(firstNephi1Verse1.text, {timeout: 10000})
      .should('exist');
    cy.findByRole('main').findByText(firstNephi1Verse2.text).should('exist');
  });
});
