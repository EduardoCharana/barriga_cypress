
import { ELEMENTS } from "../elements/tela-pageElements";

class TelaInicial {
    inputLogin() {
      cy.get(ELEMENTS.LOGIN.User).type('ed@ed')
      cy.get(ELEMENTS.LOGIN.Password).type('ed')
      cy.get(ELEMENTS.LOGIN.ButtonLogin).click()
      cy.get(ELEMENTS.MESSAGE).should('contain', 'Bem vindo, ed!')
    }

    AddAccount() {
      cy.get(ELEMENTS.MENU.Setting).click()
      cy.get(ELEMENTS.MENU.Account).click()
      cy.get(ELEMENTS.ACCOUNT.Name).type('Conta teste')
      cy.get(ELEMENTS.ACCOUNT.ButtonSave).click()
      cy.get(ELEMENTS.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    }

    UpdateAccount() {
      cy.get(ELEMENTS.MENU.Setting).click()
      cy.get(ELEMENTS.MENU.Account).click()
      
      cy.get(ELEMENTS.ACCOUNT.ButtonUpdate).click()
      cy.get(ELEMENTS.ACCOUNT.Name)
      .clear()
      .type('Conta atualizada')
      cy.get(ELEMENTS.ACCOUNT.ButtonSave).click()
      cy.get(ELEMENTS.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    }

    Reset() {
      cy.get(ELEMENTS.MENU.Setting).click()
      cy.get(ELEMENTS.MENU.Reset).click()

    }

    CreateExistentAccount() {
      cy.get(ELEMENTS.MENU.Setting).click()
      cy.get(ELEMENTS.MENU.Account).click()
      cy.get(ELEMENTS.ACCOUNT.Name)
      .clear()
      .type('Conta atualizada')
      cy.get(ELEMENTS.ACCOUNT.ButtonSave).click()
      cy.get(ELEMENTS.MESSAGE).should('contain', 'code 400')

    }

    AddTransaction() {
      cy.get(ELEMENTS.MENU.Transaction).click()
      cy.get(ELEMENTS.TRANSACTIONS.Description).type('Desc')
      cy.get(ELEMENTS.TRANSACTIONS.Value).type('123')
      cy.get(ELEMENTS.TRANSACTIONS.Interest).type('Inter')
      cy.get(ELEMENTS.TRANSACTIONS.Status).click()
      cy.get(ELEMENTS.TRANSACTIONS.ButtonTransactionSave).click()
      cy.get(ELEMENTS.MESSAGE).should('contain', 'sucesso')
    }

    RemoveTransiction() {
      cy.get(ELEMENTS.MENU.Balance).click()
      cy.get(ELEMENTS.TRANSACTIONS.RemoveTransactions).click()
      cy.get(ELEMENTS.MESSAGE).should('contain', 'removida com sucesso')

    }
  }


export default new TelaInicial