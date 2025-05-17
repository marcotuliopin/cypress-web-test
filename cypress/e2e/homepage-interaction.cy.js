describe('Wikipedia homepage', () => {
  beforeEach(() => {
    cy.visit('https://www.wikipedia.org/');
  });

  it('should search for Fernando Pessoa and load the page', () => {
    cy.get('input#searchInput').type('Fernando Pessoa{enter}');

    cy.origin('https://en.wikipedia.org', () => {
      cy.url().should('include', '/wiki/Fernando_Pessoa');
      cy.get('#firstHeading').should('contain.text', 'Fernando Pessoa');
    });
  });

  it('should change the text size by zooming the page', () => {
    cy.viewport(1280, 720);
    cy.document().then((doc) => {
      doc.body.style.zoom = '150%';
    });
    cy.document().its('body.style.zoom').should('eq', '150%');
  });

  it('should change language to Portuguese', () => {
    cy.get('a#js-link-box-pt').click();

    cy.origin('https://pt.wikipedia.org', () => {
      cy.url().should('include', 'pt.wikipedia.org');
      cy.get('html').should('have.attr', 'lang', 'pt');
    });
  });

  it('should correctly redirect when clicking on Privacy Policy link', () => {
    cy.visit('https://www.wikipedia.org');
    cy.get('body').should('be.visible');

    cy.scrollTo('bottom');

    cy.contains('Privacy Policy').should('have.attr', 'href').and('include', 'Privacy_policy');
    cy.contains('Privacy Policy').click();

    cy.origin('https://foundation.wikimedia.org', () => {
      cy.url().should('include', '/wiki/Policy:Privacy_policy');
      cy.get('h1').should('contain', 'Privacy Policy');
    });
  });

  it('should fail to find a non-existent page', () => {
    cy.get('input#searchInput').type('ThisPageDoesNotExist{enter}');

    cy.origin('https://en.wikipedia.org', () => {
      cy.get('#firstHeading').should('contain.text', 'Search results');
      cy.get('.mw-search-results-info').should('contain.text', 'The page "ThisPageDoesNotExist" does not exist.');
    });
  });
});
