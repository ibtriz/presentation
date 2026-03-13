// cypress/e2e/a11y-visual.cy.ts
// Testes de acessibilidade básica e integridade visual

describe('Acessibilidade & Visual', () => {
  beforeEach(() => cy.visit('/'));

  it('links externos têm rel="noopener"', () => {
    cy.get('a[target="_blank"]').each($a => {
      expect($a.attr('rel')).to.include('noopener');
    });
  });

  it('seção hero tem height mínimo de 100vh', () => {
    cy.window().then(win => {
      const vh = win.innerHeight;
      cy.get('[data-cy="hero-section"]')
        .invoke('outerHeight')
        .should('gte', vh * 0.9);
    });
  });

  it('botões CTA são visíveis e clicáveis', () => {
    cy.get('[data-cy="cta-connect"]').should('be.visible').and('not.be.disabled');
    cy.get('[data-cy="cta-stack"]').should('be.visible').and('not.be.disabled');
  });

it('nome "Be." está acima do fold', () => {
  cy.get('[data-cy="hero-name"]').should($el => {
    const rect = $el[0].getBoundingClientRect()
    expect(rect.top).to.be.lessThan(Cypress.config('viewportHeight'))
  });
});

  it('nav tem z-index alto (é sobreposto ao conteúdo)', () => {
    cy.get('[data-cy="nav"]')
      .invoke('css', 'z-index')
      .then((z) => {
        const zIndex = Array.isArray(z) ? z[0] : z;
        expect(parseInt(zIndex as string)).to.be.gte(100);
      });
  });

  it('section titles têm font-family Orbitron aplicada', () => {
    cy.get('[data-cy="about-section"] .section-title')
      .invoke('css', 'font-family')
      .should('include', 'Orbitron');
  });

  it('variável CSS --neon-blue está definida no root', () => {
    cy.document().then(doc => {
      const val = getComputedStyle(doc.documentElement).getPropertyValue('--neon-blue').trim();
      expect(val).to.not.be.empty;
    });
  });

  it('background da página não é branco', () => {
    cy.get('body').invoke('css', 'background-color').should('not.eq', 'rgb(255, 255, 255)');
  });
});
