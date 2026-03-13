// cypress/e2e/nav.cy.ts
describe('Navigation', () => {
  beforeEach(() => cy.visit('/'));

  it('renderiza a navbar com o logo', () => {
    cy.get('[data-cy="nav"]').should('be.visible');
    cy.get('[data-cy="nav-logo"]').should('contain.text', 'ibtriz');
    cy.get('[data-cy="nav-logo"]').should('contain.text', '.exe');
  });

  it('exibe todos os links de navegação', () => {
    const links = ['nav-about', 'nav-stack', 'nav-roadmap', 'nav-certs', 'nav-contact'];
    links.forEach(link => {
      cy.get(`[data-cy="${link}"]`).should('be.visible');
    });
  });

  it('links de navegação têm hrefs corretos', () => {
    cy.get('[data-cy="nav-about"]').should('have.attr', 'href', '#about');
    cy.get('[data-cy="nav-stack"]').should('have.attr', 'href', '#stack');
    cy.get('[data-cy="nav-roadmap"]').should('have.attr', 'href', '#roadmap');
    cy.get('[data-cy="nav-certs"]').should('have.attr', 'href', '#certs');
    cy.get('[data-cy="nav-contact"]').should('have.attr', 'href', '#contact');
  });

  it('navbar fica fixo no topo ao rolar', () => {
    cy.get('[data-cy="nav"]').should('have.css', 'position', 'fixed');
  });

  it('nav-about clicado navega para a seção about', () => {
    cy.get('[data-cy="nav-about"]').click();
    cy.get('[data-cy="about-section"]').should('be.visible');
    cy.url().should('include', '#about');
  });
});
