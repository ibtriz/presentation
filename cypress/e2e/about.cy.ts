// cypress/e2e/about.cy.ts
describe('About Section', () => {
  beforeEach(() => cy.visit('/'));

  it('seção about existe no DOM', () => {
    cy.get('[data-cy="about-section"]').should('exist');
  });

  it('terminal block exibe role e company corretos', () => {
    cy.get('[data-cy="about-section"]').scrollIntoView();
    cy.get('[data-cy="about-terminal"]')
      .should('contain.text', 'QA Automation Engineer')
      .and('contain.text', 'Itaú Unibanco')
      .and('contain.text', 'mobile · auth · digital security');
  });

  it('terminal block exibe mensagem de shift-left', () => {
    cy.get('[data-cy="about-section"]').scrollIntoView();
    cy.get('[data-cy="about-terminal"]').should('contain.text', 'shift-left or shift regret');
  });

  it('lista de mindset contém os 5 princípios', () => {
    cy.get('[data-cy="about-section"]').scrollIntoView();
    cy.get('[data-cy="about-mindset"] .mindset-list li').should('have.length', 5);
  });

  it('mindset inclui Shift-left e Arquitetura', () => {
    cy.get('[data-cy="about-section"]').scrollIntoView();
    cy.get('[data-cy="about-mindset"]')
      .should('contain.text', 'Shift-left')
      .and('contain.text', 'Arquitetura primeiro')
      .and('contain.text', 'Observabilidade');
  });

  it('reveal animation dispara ao scroll', () => {
    cy.get('[data-cy="about-terminal"]').scrollIntoView({ duration: 400 });
    cy.get('[data-cy="about-terminal"]').should('have.class', 'visible');
  });
});
