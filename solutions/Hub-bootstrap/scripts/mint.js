const contract = require('truffle-contract')
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
const tokenArtifacts = require('../build/contracts/Token.json')
const Token = contract(tokenArtifacts)
Token.setProvider(web3.currentProvider)

const owner = web3.eth.accounts[0]

mint()

async function mint() {
  const token = await Token.deployed()
  let tx
  let user

  // Mint tokens to 10 users
  for (let i = 1; i < 6; i++) {
    user = web3.eth.accounts[i]
    console.log('Minting to: ' + user)

    tx = await token.mint(user, 1000, { from: owner, gas: 4e6 })

    console.log(tx.logs[0])
  }
}
