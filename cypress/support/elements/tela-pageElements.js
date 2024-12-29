export const ELEMENTS = {

    LOGIN: {
        User: '[data-test="email"]',
        Password: '[data-test="passwd"]',
        ButtonLogin: '.btn',
    },
    
    MESSAGE: '.toast-message',

    MENU: { 
        Setting: '[data-test="menu-settings"]',
        Account: '[href="/contas"]',
        Reset: '[href="/reset"]',
        Transaction: '[data-test="menu-movimentacao"]',
        Balance: '[data-test="menu-extrato"]'

    },
    
    TRANSACTIONS: {
        Description: '[data-test="descricao"]',
        Value: '[data-test="valor"]',
        Interest: '[data-test="envolvido"]',
        Status:'[data-test="status"]',
        ButtonTransactionSave: '.btn-primary',
        RemoveTransactions: ':nth-child(6) > .row > .col > [href="#"] > .far'
    },

    ACCOUNT: {
        Name: '[data-test="nome"]',
        ButtonSave: '.btn',
        ButtonUpdate: ':nth-child(7) > :nth-child(2) > :nth-child(1) > .far'
    }
}

