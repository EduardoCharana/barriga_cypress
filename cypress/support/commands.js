
Cypress.Commands.add('getToken', (user, passwrd)=>{
    cy.request({
        method: 'POST',
        url: 'https://barrigarest.wcaquino.me/signin',
        body: {
          email: 'ed@ed',
          redirecionar: false,
          senha: 'ed',
        },
      })
        .its('body.token')
        .should('not.be.empty')
        .then(token=>{
            return token
        })
})



Cypress.Commands.add('resetRest', () => {
    cy.getToken('ed@ed','ed').then(token => {
        cy.request({
        method: 'GET',
        url: 'https://barrigarest.wcaquino.me/reset',
        headers: { Authorization: `JWT ${token}` },

    }).its('status').should('be.eql', 200)
    

    })
})


Cypress.Commands.add('getContaByName', name => {
    cy.getToken('ed@ed','ed').then(token => {
        cy.request({
        method: 'GET',
        url: 'https://barrigarest.wcaquino.me/contas',
        headers: { Authorization: `JWT ${token}` },
        qs: {
            nome: name
        }

        }).then(res=> {
            return res.body[0].id
        })
    })

})



import dayjs from 'dayjs';

Cypress.Commands.add('getDayjs', () => {
  return dayjs;
});