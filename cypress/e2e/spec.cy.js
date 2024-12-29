
import TelaInicial from '../support/pageObjects/tela-pageObjects'

describe('template spec', () => {
  beforeEach(() => {
    cy.visit('/')
    TelaInicial.inputLogin()
    
     })

    it('Reset', () => {
      TelaInicial.Reset()
    });

    it('Should creante an account', () => {
        TelaInicial.AddAccount()
    });


    it('Should update account', () => {
      
      TelaInicial.UpdateAccount()
    });

    it('Should not create an account with the same name', () => {
        TelaInicial.CreateExistentAccount()
    });

    it('Should Add a transaction', () => {
        TelaInicial.AddTransaction()
    });

    it(' Should Remove transaction', () => {
        TelaInicial.RemoveTransiction()
    });



    

})





