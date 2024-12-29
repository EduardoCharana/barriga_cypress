


describe('template spec', () => {
    let token
    before(()=>{
      cy.getToken('ed@ed', 'ed')
      .then(tkn=>{
        token =tkn
      }) 
    })

    beforeEach(()=>{
      cy.resetRest()
    })
    

    it('Should create an account', () => {
      
      cy.request({
        method: 'POST',
        headers: { Authorization: `JWT ${token}` },
        url: 'https://barrigarest.wcaquino.me/contas',
        body: {
          nome: 'Conta via rest',
        },
      }).as('response');
      
    
      cy.get('@response').then((res) => {
        expect(res.status).to.be.eql(201);
        expect(res.body).to.have.property('id')
        expect(res.body).to.have.property('nome', 'Conta via rest')
      });
    });


    it('Should update account', () => {
      cy.request({
        method: 'GET',
        url: 'https://barrigarest.wcaquino.me/contas',
        headers: { Authorization: `JWT ${token}` },
        qs: {
          nome: 'Conta para alterar'
        }
      }).then(res=> {
        cy.request({
        method: 'PUT',
        headers: { Authorization: `JWT ${token}` },
        url: `https://barrigarest.wcaquino.me/contas/${res.body[0].id}`,

        body: {
            nome: 'conta alterada via rest'
        }
      }).as('response')
       cy.get('@response').its('status').should('be.eql', 200)

      })
      
    });


    it('Should not create an account with the same name', () => {
      cy.request({
        method: 'POST',
        headers: { Authorization: `JWT ${token}` },
        url: 'https://barrigarest.wcaquino.me/contas',
        body: {
          nome: 'Conta mesmo nome',
        },
        failOnStatusCode: false
      }).as('response');
      
    
      cy.get('@response').then((res) => {
        console.log(res)
        expect(res.status).to.be.eql(400)
        expect(res.body.error).to.be.eql('Já existe uma conta com esse nome!')
      });
    });

    it('Should Add a transaction', () => {
      cy.getContaByName('Conta para movimentacoes')
        .then(contaId => {
          cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/transacoes',
            headers: { Authorization: `JWT ${token}` },
            body: {
              id: contaId,
              descricao: "desc",
              envolvido: "inter",
              observacao: null,
              tipo: "REC",
              data_transacao: "25/12/2024",  
              data_pagamento: "25/12/2024",  
              valor: "123.00",
              status: true,
              conta_id: contaId,  
              usuario_id: 58055,  
              transferencia_id: null,
              parcelamento_id: null
            }
          }).as('response')
          });
          cy.get('@response').its('status').should('be.eql', 201)
        });



        it('Should get balance', () => {
          cy.request({
            method: 'GET',
            url: 'https://barrigarest.wcaquino.me/saldo',
            headers: { Authorization: `JWT ${token}` },
          }).then(res => {
            let saldoConta = null;
            res.body.forEach(c => {
              if (c.conta === 'Conta para saldo') saldoConta = c.saldo;
            });
            expect(Number(saldoConta)).to.be.eql(534.00);
          });

          cy.request ({
            method: 'GET',
            url: 'https://barrigarest.wcaquino.me/transacoes',
            headers: { Authorization: `JWT ${token}` },
            qs: { descricao: 'Movimentacao 1, calculo saldo'}
          }).then(res=>{
            console.log(res.body[0])

            const hoje = new Date();
            const dataAtual = hoje.toLocaleDateString('pt-BR');

            cy.request({
            method:'PUT',
            url: `https://barrigarest.wcaquino.me/transacoes/${res.body[0].id}`,
            headers: { Authorization: `JWT ${token}` },
            body: {
              status: true,
              data_transacao : dataAtual,
              data_pagamento : dataAtual,
              descricao: res.body[0].descricao,
              envolvido: res.body[0].descricao,
              valor: res.body[0].valor,
              conta_id: res.body[0].conta_id
            }
          }).its('status').should('be.eql',200)

          })

          cy.request({
            method: 'GET',
            url: 'https://barrigarest.wcaquino.me/saldo',
            headers: { Authorization: `JWT ${token}` },
          }).then(res => {
            let saldoConta = null;
            res.body.forEach(c => {
              if (c.conta === 'Conta para saldo') saldoConta = c.saldo;
            });
            expect(Number(saldoConta)).to.be.eql(4034.00);
          });
          
        });

        it('Delete transaction', () => {
          cy.request ({
            method: 'GET',
            url: 'https://barrigarest.wcaquino.me/transacoes',
            headers: { Authorization: `JWT ${token}` },
            qs: { descricao: 'Movimentacao para exclusao'}
          }).then(res=>{
            cy.request({
              url: `https://barrigarest.wcaquino.me/transacoes/${res.body[0].id}`,
              method: 'DELETE',
              headers: { Authorization: `JWT ${token}` }
            })
          }).its('status').should('be.eql', 204)
            
        });


});

    



    
