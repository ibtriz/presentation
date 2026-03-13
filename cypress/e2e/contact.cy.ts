// cypress/e2e/contact.cy.ts
describe('Contact Section', () => {
  beforeEach(() => cy.visit('/'));

  it('seção contact existe', () => {
    cy.get('[data-cy="contact-section"]').should('exist');
    cy.get('#contact').should('exist');
  });

  it('renderiza 4 links de contato', () => {
    cy.get('[data-cy="contact-section"]').scrollIntoView();
    cy.get('[data-cy="contact-grid"] .contact-card').should('have.length', 4);
  });

  it('link LinkedIn aponta para URL correta e abre em nova aba', () => {
    cy.get('[data-cy="contact-section"]').scrollIntoView();
    cy.get('[data-cy="contact-linkedin"]')
      .should('have.attr', 'href', 'https://www.linkedin.com/in/beatriz-francelino-borges-carneiro/')
      .and('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noopener');
  });

  it('link GitHub aponta para ibtriz', () => {
    cy.get('[data-cy="contact-section"]').scrollIntoView();
    cy.get('[data-cy="contact-github"]')
      .should('have.attr', 'href', 'https://github.com/ibtriz')
      .and('have.attr', 'target', '_blank');
  });

  it('link HackerRank aponta para perfil correto', () => {
    cy.get('[data-cy="contact-section"]').scrollIntoView();
    cy.get('[data-cy="contact-hackerrank"]')
      .should('have.attr', 'href', 'https://www.hackerrank.com/profile/ibtriz');
  });

  it('link LeetCode aponta para perfil correto', () => {
    cy.get('[data-cy="contact-section"]').scrollIntoView();
    cy.get('[data-cy="contact-leetcode"]')
      .should('have.attr', 'href', 'https://leetcode.com/u/ibtriz/');
  });

  it('todos os links de contato têm texto visível', () => {
    cy.get('[data-cy="contact-section"]').scrollIntoView();
    const labels = ['LinkedIn', 'GitHub', 'HackerRank', 'LeetCode'];
    labels.forEach(label => {
      cy.get('[data-cy="contact-grid"]').should('contain.text', label);
    });
  });

  it('reveal animation ativa nos cards ao scroll', () => {
    cy.get('[data-cy="contact-linkedin"]').scrollIntoView() 
    cy.get('[data-cy="contact-linkedin"]')
      .should($el => {
        expect($el.hasClass('visible')).to.be.true
  })
  });
});
