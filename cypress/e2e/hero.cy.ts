// cypress/e2e/hero.cy.ts
describe('Hero Section', () => {
  beforeEach(() => cy.visit('/'));

  it('renderiza a seção hero', () => {
    cy.get('[data-cy="hero-section"]').should('exist');
  });

  it('exibe o nome "Be."', () => {
    cy.get('[data-cy="hero-name"]').should('be.visible');
    cy.get('[data-cy="hero-name"]').should('contain.text', 'Be');
  });

  it('exibe a tag de localização e role', () => {
    cy.get('[data-cy="hero-tag"]')
      .should('be.visible')
      .and('contain.text', 'QA Automation Engineer')
      .and('contain.text', 'SP, Brasil');
  });

  it('typing animation exibe texto na hero-title', () => {
    cy.get('[data-cy="hero-typed"]').should('exist');
    // aguarda o typewriter escrever pelo menos 3 chars
    cy.get('[data-cy="hero-typed"]', { timeout: 5000 }).invoke('text').should('have.length.gte', 3);
  });

  it('exibe a bio com shift-left mindset', () => {
    cy.get('[data-cy="hero-bio"]')
      .should('be.visible')
      .and('contain.text', 'automação')
      .and('contain.text', 'confiabilidade');
  });

  it('renderiza todas as pills', () => {
    cy.get('[data-cy="hero-pills"]').should('be.visible');
    cy.get('[data-cy="hero-pills"] .pill').should('have.length.gte', 4);
  });

  it('pills contêm termos técnicos esperados', () => {
    const expectedPills = ['shift-left testing', 'mobile automation', 'contract testing'];
    expectedPills.forEach(pill => {
      cy.get('[data-cy="hero-pills"]').should('contain.text', pill);
    });
  });

  it('botão connect aponta para #contact', () => {
    cy.get('[data-cy="cta-connect"]')
      .should('be.visible')
      .and('have.attr', 'href', '#contact');
  });

  it('botão view stack aponta para #stack', () => {
    cy.get('[data-cy="cta-stack"]')
      .should('be.visible')
      .and('have.attr', 'href', '#stack');
  });

  it('hero ocupa pelo menos a altura da viewport', () => {
    cy.get('[data-cy="hero-section"]').invoke('outerHeight').should('gte', 600);
  });
});
