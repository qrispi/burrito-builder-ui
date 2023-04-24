describe('As a user, I should see a title, a form to create a burrito order, and all current orders displayed on the page when I first visit the site', () => {
    beforeEach(() => {
        cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {fixture: 'all-orders.json'});
        cy.visit('http://localhost:3000/');
    });

    it('should see a title', () => {
        cy.get('h1')
          .contains('Burrito Builder');
    });

    it('should see a form to create a burrito order', () => {
        cy.get('form')
          .get('input');
        cy.get('form')
          .get('button')
          .should('have.length', 13);
        cy.get('form')
          .get('p')
          .contains('Order: Nothing selected');
        cy.get('form')
          .contains('Submit Order');
    });

    it('should see all current orders', () => {
        cy.get('section')
          .get('.order')
          .should('have.length', 2);
        cy.get('.order')
          .first()
          .contains('Pat');
        cy.get('.order')
          .first()
          .get('ul')
          .contains('beanslettucecarnitasqueso frescojalapeno');
    });
});