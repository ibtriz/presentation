// cypress/support/commands.ts

/**
 * Scroll an element into view and wait for .visible class (reveal animation)
 */
Cypress.Commands.add('scrollIntoViewAndReveal', (selector: string) => {
  cy.get(selector).scrollIntoView({ duration: 300 });
  cy.get(selector).should('have.class', 'visible');
});

declare global {
  namespace Cypress {
    interface Chainable {
      scrollIntoViewAndReveal(selector: string): Chainable<void>;
    }
  }
}
