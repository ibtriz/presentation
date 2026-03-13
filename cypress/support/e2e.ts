// cypress/support/e2e.ts
import './commands';

// Global config
Cypress.on('uncaught:exception', () => false); // ignore Angular zone errors in tests
