const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
const amount = 10e18 // Send each address 10 ether
let tx

const addresses = [
  '0x00e7d5760069363F59116c9177C069F45ca28D46'
]

sendEther()

function sendEther() {
  for (let i = 0; i < addresses.length; i++) {
    tx = web3.eth.sendTransaction({
      from: web3.eth.accounts[0],
      to: addresses[i],
      value: amount
    })

    console.log('\n' + amount / 1e18 + ' ETH sent to: ' + addresses[i] + '\nTx Hash: ' + tx)
  }
}
