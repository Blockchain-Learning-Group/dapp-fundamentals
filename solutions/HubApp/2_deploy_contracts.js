const Token = artifacts.require('./Token.sol')
const Hub = artifacts.require('./Hub.sol')
const owner = web3.eth.accounts[0]

// NOTE do not make method async as truffle will not resolve when utilizing .deployed()
module.exports = deployer => {
  // Deploy Token contract
  deployer.deploy(Token, { from: owner, gas: 4e6 })
  .then(() => {
    // Deploy the hub with refernce to the token
    return deployer.deploy(Hub, Token.address, { from: owner, gas: 4e6 })

  /*
  Section 2: Not required initially until adding the hub address to the token
   */
  }).then(() => {
    // Get reference to the deployed token
    return Token.deployed()

  }).then(token => {
    token.setHub(Hub.address, { from: owner, gas: 4e6 })
  })
}
