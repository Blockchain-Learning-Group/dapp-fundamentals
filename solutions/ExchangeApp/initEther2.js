/*
 Initialize web3 instances of blg token, hub and exchange contracts.
 Load all relevant accounts, balances, orders.
 NOTE web3 globally available as linked in in home.html
 */

// Exchange, blgToken, hub contract data
const exchangeAddress = '0x9ec0d5ec757bc14699fd9e7ddf97dde405e7c1c5'
const exchangeJSON = {}

const blgTokenAddress = '0xfec1266f7e026363be4a7b0d10df790bbd92bff4'
const blgTokenJSON = {}

const hubAddress = '0x4519b80e842c4e8a9538997c39550dc724c28427'
const hubJSON = {}

$(document).ready(() => {
  // If metamask is present than connect to it
  if (window.web3) {
    const web3 = new Web3(window.web3.currentProvider) // Metamask

    // Load metamask accounts
    web3.eth.getAccounts((err, accounts) => {
      if (err) {
        console.error(err)

      } else if (accounts.length <= 0){
        alert('Please create at least one account.')

      } else {
        window.defaultAccount = accounts[0]

        // Create instance of the exchange, blg token and hub

        // Create relevant listeners for all contracts

        // Load balances for the user as well as the order book contents
      }
    })

  } else {
    alert('Please install Metamask to use this application!\n https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en')
  }
})
