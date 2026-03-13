// cypress/e2e/roadmap.cy.ts
describe('Roadmap Section', () => {
  beforeEach(() => cy.visit('/'));

  it('seção roadmap existe', () => {
    cy.get('[data-cy="roadmap-section"]').should('exist');
    cy.get('#roadmap').should('exist');
  });

  it('renderiza 6 itens no roadmap', () => {
    cy.get('[data-cy="roadmap-section"]').scrollIntoView();
    cy.get('[data-cy="roadmap-grid"] .road-item').should('have.length', 6);
  });

  it('primeiro item é Contract Testing com Pact', () => {
    cy.get('[data-cy="roadmap-section"]').scrollIntoView();
    cy.get('[data-cy="roadmap-item-0"]')
      .should('contain.text', 'Contract Testing')
      .and('contain.text', 'Pact');
  });

  it('segundo item é Mutation Testing', () => {
    cy.get('[data-cy="roadmap-section"]').scrollIntoView();
    cy.get('[data-cy="roadmap-item-1"]')
      .should('contain.text', 'Mutation Testing')
      .and('contain.text', 'PIT');
  });

  it('terceiro item é Java para Automação', () => {
    cy.get('[data-cy="roadmap-section"]').scrollIntoView();
    cy.get('[data-cy="roadmap-item-2"]')
      .should('contain.text', 'Java para Automação')
      .and('contain.text', 'RestAssured');
  });

  it('último item é Digital Bank Quality Platform com ★', () => {
    cy.get('[data-cy="roadmap-section"]').scrollIntoView();
    cy.get('[data-cy="roadmap-item-5"]')
      .should('contain.text', 'Digital Bank Quality Platform');
    cy.get('[data-cy="roadmap-pct-5"]').should('contain.text', '★');
  });

  it('percentuais são números válidos ou ★', () => {
    for (let i = 0; i < 6; i++) {
      cy.get(`[data-cy="roadmap-pct-${i}"]`)
        .invoke('text')
        .then(t => t.replace(/\s/g, ''))
        .should('match', /^(\d+%|★)$/);
    }
  });




  it('barras de progresso animam ao entrar na viewport', () => {
  cy.get('[data-cy="roadmap-item-0"]').scrollIntoView();
  cy.get('[data-cy="roadmap-item-0"] .road-bar-fill')
    .should($el => {
      const height = parseFloat($el.css('height'));
      expect(height).to.be.greaterThan(0);
  });
  });
});
