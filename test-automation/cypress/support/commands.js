Cypress.Commands.add('initRequests', () => {
    cy.server();
    cy.route({
        method: 'GET',
        url: '/news/getConfigData'
    }).as('getConfigData');

    cy.route({
        method: 'GET',
        url: '/news/getApiToken'
    }).as('getApiToken');

    cy.route({
        method: 'POST',
        url: '/news/setApiToken'
    }).as('setApiToken');

    cy.route({
        method: 'GET',
        url: '/news/getLatestNews?page=1&country=in&'
    }).as('getLatestNews1');

    cy.route({
        method: 'GET',
        url: '/news/getLatestNews?page=1&keyword=modi&country=in&'
    }).as('getLatestNews2');

    cy.route({
        method: 'GET',
        url: '/news/getLatestNews?page=1&country=us&'
    }).as('getLatestNews3');

    cy.route({
        method: 'GET',
        url: '/news/getLatestNews?page=2&country=in&'
    }).as('getLatestNews4');
});