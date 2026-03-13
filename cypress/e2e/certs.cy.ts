// cypress/e2e/certs.cy.ts
describe('Certifications Section', () => {
  beforeEach(() => cy.visit('/'));

  it('seção certs existe', () => {
    cy.get('[data-cy="certs-section"]').should('exist');
    cy.get('#certs').should('exist');
  });

  it('lista 6 certificações', () => {
    cy.get('[data-cy="certs-section"]').scrollIntoView();
    cy.get('[data-cy="cert-list"] .cert-item').should('have.length', 6);
  });

  it('GitHub Foundations está marcado como done', () => {
    cy.get('[data-cy="certs-section"]').scrollIntoView();
    cy.get('[data-cy="cert-item-0"]').should('contain.text', 'GitHub Foundations');
    cy.get('[data-cy="cert-status-0"]')
      .should('have.class', 'done')
      .and('contain.text', '✓');
  });

  it('AWS Cloud Practitioner está marcado como active/now', () => {
    cy.get('[data-cy="certs-section"]').scrollIntoView();
    cy.get('[data-cy="cert-item-1"]').should('contain.text', 'AWS Cloud Practitioner');
    cy.get('[data-cy="cert-status-1"]').should('have.class', 'active');
  });

  it('ISTQB CTFL v4.0 está como pending', () => {
    cy.get('[data-cy="certs-section"]').scrollIntoView();
    cy.get('[data-cy="cert-item-2"]').should('contain.text', 'ISTQB CTFL v4.0');
    cy.get('[data-cy="cert-status-2"]').should('have.class', 'pending');
  });

  it('AWS Solutions Architect Associate está presente', () => {
    cy.get('[data-cy="certs-section"]').scrollIntoView();
    cy.get('[data-cy="cert-list"]').should('contain.text', 'AWS Solutions Architect Associate');
  });

  it('ISTQB CTAL-TAE está presente', () => {
    cy.get('[data-cy="certs-section"]').scrollIntoView();
    cy.get('[data-cy="cert-list"]').should('contain.text', 'ISTQB CTAL-TAE');
  });

  it('cert item com "in progress" tem tag com classe current', () => {
    cy.get('[data-cy="certs-section"]').scrollIntoView();
    cy.get('[data-cy="cert-item-1"] .cert-tag')
      .should('have.class', 'current')
      .and('contain.text', 'in progress');
  });

  it('reveal animation ativa ao scroll', () => {
    cy.get('[data-cy="cert-item-0"]').scrollIntoView({ duration: 400 });
    cy.get('[data-cy="cert-item-0"]').should('have.class', 'visible');
  });
});
