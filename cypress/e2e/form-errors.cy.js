describe('As a user, I should not be able to submit my burrito order if I have not input my name or selected at least one ingredient and should be given helpful messages to guide me', () => {
    beforeEach(() => {
        cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {fixture: 'all-orders.json'});
        cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {fixture: 'new-order.json'});
        cy.visit('http://localhost:3000/');
    });

    it('should not be able to submit an order without my name', () => {
        cy.get('section')
          .get('.order')
          .should('have.length', 2);
        
        cy.get('input')
          .should('have.value', '');
        cy.get('button')
          .contains('Submit Order')
          .click();

        cy.get('section')
          .get('.order')
          .should('have.length', 2);
    });

    it('should not be able to submit an order without selecting an ingredient', () => {
        cy.get('section')
          .get('.order')
          .should('have.length', 2);
        
        cy.get('p')
          .contains('Order: Nothing selected');
        cy.get('button')
          .contains('Submit Order')
          .click();

        cy.get('section')
          .get('.order')
          .should('have.length', 2);
    });

    it('should see an error message if I try to submit without inputting my name', () => {
        cy.get('section')
          .get('.order')
          .should('have.length', 2);
      
        cy.get('input')
            .should('have.value', '');
        cy.get('button')
            .contains('Submit Order')
            .click();
        cy.get('input').then((input) => {
            expect(input[0].validationMessage).to.eq('Please fill out this field.');
        });

        cy.get('section')
          .get('.order')
          .should('have.length', 2);
    });

    it('should see an error message if I try to submit with my name but without selecting at least one ingredient', () => {
        cy.get('section')
          .get('.order')
          .should('have.length', 2);
        
        cy.get('input')
          .type('Gerald');
        cy.get('p')
          .contains('Order: Nothing selected');
        cy.get('button')
          .contains('Submit Order')
          .click();
        cy.get('.none-selected-msg')
          .contains('Please select at least one ingredient before submitting');
        
        cy.get('section')
          .get('.order')
          .should('have.length', 2);
    });
});