describe('Landing Page', function(){
    it('Visits the landing page', function(){
        cy.visit('http://localhost:3000/landingpage')

        cy.contains('Home').click()
        cy.url()
            .should('include', 'http://localhost:3000/landingpage')

        cy.contains('Analytics').click()
        cy.url()
            .should('include', 'http://localhost:3000/analytics')

        cy.contains('Profile').click()
        cy.url()
            .should('include', 'http://localhost:3000/profile')

        cy.contains('Learn more about Klout!').click()
        cy.url().should('include', 'http://localhost:3000/app.html')
        
    })
})

describe('Analytics Page', function(){
    it('Visits the landing page', function(){
        cy.visit('http://localhost:3000/analytics')

        cy.contains('Home').click()
        cy.url()
            .should('include', 'http://localhost:3000/landingpage')

        cy.contains('Analytics').click()
        cy.url()
            .should('include', 'http://localhost:3000/analytics')

        cy.contains('Profile').click()
        cy.url()
            .should('include', 'http://localhost:3000/profile')

        cy.contains('Learn more about Klout!').click()
        cy.url().should('include', 'http://localhost:3000/app.html')
        
    })
})

describe('Profile Page', function(){
    it('Visits the landing page', function(){
        cy.visit('http://localhost:3000/profile')

        cy.contains('Home').click()
        cy.url()
            .should('include', 'http://localhost:3000/landingpage')

        cy.contains('Analytics').click()
        cy.url()
            .should('include', 'http://localhost:3000/analytics')

        cy.contains('Profile').click()
        cy.url()
            .should('include', 'http://localhost:3000/profile')

        cy.contains('Learn more about Klout!').click()
        cy.url().should('include', 'http://localhost:3000/app.html')
        
    })
})

describe('Google SSO', function(){
    it('Visits the landing page', function(){
        cy.visit('http://localhost:3000/profile')

        Cypress.Commands.add('login', (overrides = {}) => {
            Cypress.log({
              name: 'loginViaAuth0',
            });
          
            const options = {
              method: 'POST',
              url: Cypress.env('auth_url'),
              body: {
                grant_type: 'password',
                username: Cypress.env('auth_username'),
                password: Cypress.env('auth_password'),
                audience: Cypress.env('auth_audience'),
                scope: 'openid profile email',
                client_id: Cypress.env('auth_client_id'),
                client_secret: Cypress.env('auth_client_secret'),
              },
            };
            cy.request(options);
          });
        
    })
})





