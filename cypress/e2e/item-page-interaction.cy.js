describe('Wikipedia item page navigation', () => {
  beforeEach(() => {
    cy.visit('https://www.wikipedia.org/');
    cy.get('input#searchInput').type('Fernando Pessoa{enter}');
    cy.origin('https://en.wikipedia.org', () => {
      cy.url().should('include', '/wiki/Fernando_Pessoa');
      cy.get('#firstHeading').should('contain.text', 'Fernando Pessoa');
    });
  });

  it('should exhibit the correct title', () => {
    cy.origin('https://en.wikipedia.org', () => {
      cy.title().should('include', 'Fernando Pessoa');
      cy.get('#firstHeading').should('contain', 'Fernando Pessoa');
    });
  });

  it('should be able to navigate to other item through a reference', () => {
    cy.origin('https://en.wikipedia.org', () => {
  

      cy.url().should('include', '/wiki/Álvaro_de_Campos');
      cy.get('#firstHeading').should('contain', 'Álvaro de Campos');
    });
  });

  it('should scroll to subsection and verify it', () => {
    cy.origin('https://en.wikipedia.org', () => {
      cy.contains('h2', 'Obras')
        .scrollIntoView()
        .should('be.visible')
        .nextUntil('h2')
        .should('not.be.empty');
    });
  });

  it('should have enough resources on bottom', () => {
    cy.origin('https://en.wikipedia.org', () => {
      cy.get('ol.references > li')
        .should('have.length.greaterThan', 4);
    });
  });

  it('should allow navigation to privacy policy page', () => {
    cy.origin('https://en.wikipedia.org', () => {
      cy.scrollTo('bottom');
      cy.get('#footer-places a')
        .contains('Política de privacidade')
        .should('have.attr', 'href')
        .then((href) => {
          cy.wrap(href).as('privacyPolicyUrl');
        });
    });
    
    cy.get('@privacyPolicyUrl').then(href => {
      cy.origin('https://foundation.wikimedia.org', { args: { href } }, ({ href }) => {
        cy.visit(href);
        cy.url().should('include', '/wiki/Policy:Privacy_policy');
        cy.contains('Privacy policy').should('be.visible');
      });
    });
  });
});
