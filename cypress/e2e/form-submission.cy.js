describe('As a user, I should be able to input my burrito order into the form and see my order with my name and ingredients I chose on the page after I click submit', () => {
    beforeEach(() => {
        cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {fixture: 'all-orders.json'});
        cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {fixture: 'new-order.json'});
        cy.visit('http://localhost:3000/');
    });

    it('should be able to input data into the form', () => {
        cy.get('input')
          .type('Gerald');
        cy.get('input')
          .should('have.value', 'Gerald');
        cy.get('[name="beans"]')
          .click();
        cy.get('p')
          .contains('Order: beans');
        cy.get('[name="carnitas"]')
          .click();
        cy.get('p')
          .contains('Order: beans, carnitas');
        cy.get('[name="jalapenos"]')
          .click();
        cy.get('p')
          .contains('Order: beans, carnitas, jalapenos');
    });

    it('should be able to submit the order', () => {
        cy.get('input')
          .type('Gerald');
        cy.get('[name="beans"]')
          .click();
        cy.get('[name="carnitas"]')
          .click();
        cy.get('[name="jalapenos"]')
          .click();
        cy.get('button')
          .contains('Submit Order')
          .click();
    });

    it('should see the order displayed after submitting', () => {
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

        cy.get('input')
          .type('Gerald');
        cy.get('[name="beans"]')
          .click();
        cy.get('[name="carnitas"]')
          .click();
        cy.get('[name="jalapenos"]')
          .click();
        cy.get('button')
          .contains('Submit Order')
          .click();

        cy.get('section')
          .get('.order')
          .should('have.length', 3);
        cy.get('.order')
          .last()
          .contains('Gerald');
        cy.get('.order')
          .last()
          .get('ul')
          .contains('beanscarnitasjalapeno');
    });
});