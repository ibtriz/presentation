// cypress/e2e/smoke.cy.ts
// Garante que todas as seções existem, carregam e são acessíveis

describe('Smoke Test — Portfolio completo', () => {
  beforeEach(() => cy.visit('/'));

  it('página carrega sem erros no console', () => {
    cy.on('window:console', (msg) => {
      if (msg.type === 'error') {
        throw new Error(`Console error: ${msg.message}`);
      }
    });
    cy.get('app-root').should('exist');
  });

  it('título da página está correto', () => {
    cy.title().should('contain', 'Be');
  });

  it('todas as seções existem no DOM', () => {
    const sections = ['hero-section', 'about-section', 'stack-section', 'roadmap-section', 'certs-section', 'contact-section'];
    sections.forEach(s => cy.get(`[data-cy="${s}"]`).should('exist'));
  });

  it('ordem das seções está correta (top → bottom)', () => {
    const sections = ['hero-section', 'about-section', 'stack-section', 'roadmap-section', 'certs-section', 'contact-section'];
    const tops: number[] = [];

    sections.forEach(s => {
      cy.get(`[data-cy="${s}"]`).then($el => {
        tops.push($el[0].getBoundingClientRect().top + window.scrollY);
      });
    });

    cy.then(() => {
      for (let i = 1; i < tops.length; i++) {
        expect(tops[i]).to.be.greaterThan(tops[i - 1]);
      }
    });
  });

  it('glitch dividers estão presentes', () => {
    cy.get('[data-cy="divider"]').should('exist');
    cy.get('.glitch-divider').should('have.length.gte', 1);
  });

  it('footer exibe mensagem correta', () => {
    cy.scrollTo('bottom');
    cy.get('footer').should('contain.text', 'ibtriz').and('contain.text', 'SP, Brasil');
  });

  it('scroll completo do topo ao rodapé sem layout quebrado', () => {
    cy.scrollTo('bottom', { duration: 1000 });
    cy.get('footer').should('be.visible');
    cy.scrollTo('top', { duration: 500 });
    cy.get('[data-cy="hero-section"]').should('exist');
  });

it('nenhuma seção tem overflow horizontal visível', () => {
  cy.get('body').invoke('prop', 'scrollWidth').then(scrollWidth => {
    cy.window().its('innerWidth').then(innerWidth => {
      expect(scrollWidth).to.be.lte(innerWidth + 1) // tolerância 1px
    })
  })
})

  it('viewport mobile 375px — page carrega sem quebrar', () => {
    cy.viewport(375, 812);
    cy.reload();
    cy.get('[data-cy="hero-section"]').should('be.visible');
    cy.get('[data-cy="hero-name"]').should('be.visible');
  });
});
