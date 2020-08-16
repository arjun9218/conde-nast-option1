import configDataResponse from '../fixtures/configDataResponse.json';

describe('News test spec', function () {
    beforeEach(() => {
        cy.initRequests();
        cy.visit('/');
    });

    it('On first launch it should ask for API Token', () => {
        cy.wait('@getConfigData').then(xhr => {
            expect(xhr.status).to.equal(200);
            const configData = xhr.response.body;
            expect(JSON.stringify(configData)).to.deep.equal(JSON.stringify(configDataResponse));
        });
        cy.wait('@getApiToken').then(xhr => {
            expect(xhr.status).to.equal(404);
        });
        cy.get('label').contains('API Token').should('be.visible');
        cy.get('label').contains('Submit').should('be.visible');
    });

    it('Should ask for API Token again if invalid token is submitted', () => {
        cy.get('input').type('{selectall}{backspace}randomstring');
        cy.contains('Submit').click();
        cy.wait('@setApiToken').then(xhr => {
            expect(xhr.status).to.equal(200);
            expect(xhr.request.headers.Authorization).to.equal('randomstring');
        });
        cy.wait('@getLatestNews1').then(xhr => {
            expect(xhr.status).to.equal(401);
        });
        cy.get('label').contains('API Token').should('be.visible');
        cy.get('label').contains('Submit').should('be.visible');
    });

    it('Should display search filters and default country data on submitting valid API Token', () => {
        cy.get('input').type('{selectall}{backspace}9e9f8d40b60449fc8bbee79d2b5bb64e');
        cy.contains('Submit').click();
        cy.wait('@setApiToken').then(xhr => {
            expect(xhr.status).to.equal(200);
            expect(xhr.request.headers.Authorization).to.equal('9e9f8d40b60449fc8bbee79d2b5bb64e');
        });
        cy.wait('@getLatestNews1').then(xhr => {
            expect(xhr.status).to.equal(200);
            expect(xhr.response.body.articles).to.exist;
            cy.get('label').contains('Keyword').should('be.visible');
            cy.get('label').contains('Country').should('be.visible');
            cy.get('[data-cy="newsCard"]').should('have.length', xhr.response.body.articles.length);
        });
    });

    it('Should be able to filter by keyword', () => {
        cy.get('input[id="keyword"]').type('{selectall}{backspace}modi');
        cy.get('label').contains('Search').click();
        cy.wait('@getLatestNews2').then(xhr => {
            expect(xhr.status).to.equal(200);
            expect(xhr.response.body.articles).to.exist;
            cy.get('[data-cy="newsCard"]').should('have.length', xhr.response.body.articles.length);
        });
    });

    it('Should be able to search by country', () => {
        cy.get('div[id="country"]').click();
        cy.get('div > ul > li').contains('(us)').click();
        cy.get('label').contains('Search').click();
        cy.wait('@getLatestNews3').then(xhr => {
            expect(xhr.status).to.equal(200);
            expect(xhr.response.body.articles).to.exist;
            cy.get('[data-cy="newsCard"]').should('have.length', xhr.response.body.articles.length);
        });
    });

    it('Should load next page data on scroll to bottom of the page', () => {
        cy.wait('@getLatestNews1').then(xhr => {
            expect(xhr.status).to.equal(200);
            expect(xhr.response.body.articles).to.exist;
            cy.get('label').contains('Keyword').should('be.visible');
            cy.get('label').contains('Country').should('be.visible');
            cy.get('[data-cy="newsCard"]').should('have.length', xhr.response.body.articles.length);
            if (xhr.response.body.totalResults > 10) {
                cy.get('div[id="root"] > div').scrollTo('bottom');
                cy.wait('@getLatestNews4').then(xhr2 => {
                    expect(xhr.status).to.equal(200);
                    expect(xhr.response.body.articles).to.exist;
                    cy.get('[data-cy="newsCard"]').should('have.length', xhr2.response.body.articles.length + xhr.response.body.articles.length);
                });
            }
        });

    });

});