const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
const owner = web3.eth.accounts[0]

const accounts = [
  '0x9Cb47a806AC793CE9739dd138Be3b9DEB16C14E4'
]

fundAccounts()

/**
 * Send 10 ether to each account
 */
async function fundAccounts() {
  for (let i = 0; i < accounts.length; i++) {
    console.log(web3.eth.sendTransaction({from: owner, to: accounts[i], value: 10*10**18}))
  }
}
