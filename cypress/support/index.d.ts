/// <reference types="cypress" />

declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable {
    showSideNav(): Chainable<Element>;
  }
}
