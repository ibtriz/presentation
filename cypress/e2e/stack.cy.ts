// cypress/e2e/stack.cy.ts
describe('Stack Section', () => {
  beforeEach(() => cy.visit('/'));

  it('seção stack existe e tem o id correto', () => {
    cy.get('[data-cy="stack-section"]').should('exist');
    cy.get('#stack').should('exist');
  });

  it('renderiza 6 categorias de stack', () => {
    cy.get('[data-cy="stack-section"]').scrollIntoView();
    cy.get('[data-cy="stack-grid"] .stack-category').should('have.length', 6);
  });

  it('categoria Automation contém ferramentas essenciais', () => {
    cy.get('[data-cy="stack-section"]').scrollIntoView();
    cy.get('[data-cy="stack-cat-0"]')
      .should('contain.text', 'Robot Framework')
      .and('contain.text', 'Appium')
      .and('contain.text', 'pytest');
  });

  it('categoria API & Contract exibe Pact e Postman', () => {
    cy.get('[data-cy="stack-section"]').scrollIntoView();
    cy.get('[data-cy="stack-cat-1"]')
      .should('contain.text', 'Pact')
      .and('contain.text', 'Postman')
      .and('contain.text', 'Cucumber');
  });

  it('categoria CI/CD exibe GitLab e GitHub Actions', () => {
    cy.get('[data-cy="stack-section"]').scrollIntoView();
    cy.get('[data-cy="stack-cat-2"]')
      .should('contain.text', 'GitLab CI/CD')
      .and('contain.text', 'GitHub Actions')
      .and('contain.text', 'Terraform');
  });

  it('categoria Languages exibe Python, Java e JavaScript', () => {
    cy.get('[data-cy="stack-section"]').scrollIntoView();
    cy.get('[data-cy="stack-cat-4"]')
      .should('contain.text', 'Python')
      .and('contain.text', 'Java')
      .and('contain.text', 'JavaScript');
  });

  it('todos os badges são visíveis após scroll', () => {
    cy.get('[data-cy="stack-section"]').scrollIntoView();
    cy.get('[data-cy="stack-grid"] .badge').should('have.length.gte', 20);
  });

  it('reveal animation ativa nas categorias ao entrar na viewport', () => {
    cy.get('[data-cy="stack-cat-0"]').scrollIntoView({ duration: 400 });
    cy.get('[data-cy="stack-cat-0"]').should('have.class', 'visible');
  });
});
