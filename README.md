# Decentralized Application Development Fundamentals
This serves as an outline of useful resources leveraged over the duration of Blockchain Learning Group's DApp Development Fundamentals course.

## Pre-requisites and Installs
1. Python 3+
2. Node and npm
- Node.js >= v6.9.1
- [Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04)
   Ensure build-essential apt package installed as well.
- [MacOS](http://yoember.com/nodejs/the-best-way-to-install-node-js/)
   - macOS ensure you have the XCode command line tools installed. 
- Use the official Node.js packages, do not use the package supplied by your distribution.

2. [Metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)

3. [Truffle](http://truffleframework.com/)

```npm install -g truffle```

Having problems? Be sure to check out the [FAQ](https://github.com/ethereumjs/testrpc/wiki/FAQ) and if you're still having issues and you're sure its a problem with testrpc

4. [testrpc](https://github.com/ethereumjs/testrpc)

```npm install -g ethereumjs-testrpc```

5. [Partiy](https://parity.io/)

Download from here and sync beforehand if possible.

Ubuntu / mac: 

```bash <(curl https://get.parity.io -L)```

Sync the node to Kovan

```parity --chain kovan --warp --mode active --tracing off --cache-size 1024```

6. [Web3](https://github.com/ethereum/wiki/wiki/JavaScript-API)

```npm install web3``` 

7. [PySha3](https://pypi.python.org/pypi/pysha3)

```pip3 install sha3```


## Useful Resources
### Day 1
1. [https://ethstats.net/](https://ethstats.net/)
2. [http://ethgasstation.info/](http://ethgasstation.info/)
3. [https://etherscan.io/](https://etherscan.io/)
    * [Augur](https://etherscan.io/token/REP#readContract)
    * [Golem Multi-sig Wallet](https://etherscan.io/address/0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9#code)
4. [https://www.ethernodes.org/](https://www.ethernodes.org/network/1)
5. [Metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)
6. [PySha3](https://pypi.python.org/pypi/pysha3)
```
$ pip3 install pysha3==1.0.2
$ python3
>>> from sha3 import keccak_256
>>> keccak_256(bytes(1)).hexdigest()
bc36789e7a1e281436464229828f817d6612f7b477d66591ff96a9e064bcc98a

>>> keccak_256(bytes(2)).hexdigest()
54a8c0ab653c15bfb48b47fd011ba2b9617af01cb45cab344acd57c924d56798
```
7. [Bitcoin 51% Attack Cost](https://gobitcoin.io/tools/cost-51-attack/)
8. [Remix](https://ethereum.github.io/browser-solidity/)

9. [DappDeveloper.sol](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/samples/DappDeveloper.sol)

10. Exceed Block Gas Limit

_Add the below to DappDeveloper.sol_

```
uint256 value;

function reachGasLimit() {
  for (uint256 i = 0; i < 10**18; i++) {
      value_ = i;
      value_ = i + 1;
      value_ = i + 2;
  }
}
```
11. [Voting Exercise](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/exercises/Voting.sol)

12. [Token Exercise](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/exercises/Token.sol)

### Day 2
1. TestRpc
```
npm install -g ethereum-testrpc
testrpc
```

2.Truffle Usage
```
npm install -g truffle
mkdir ether && cd ether && truffle init
truffle version
truffle compile
testrpc
truffle test
truffle migrate
```

3. DApp Development

   - Clone the repo
   ```
   git clone https://github.com/Blockchain-Learning-Group/hub-template
   cd hub-template
   ```
   
   - In another window run your client, testrpc
   ```
   testrpc
   ```
   
   - Copy over your token
   - Utilize code written during Day 1 or Copy the [TokenSolution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/305c778dee2164259c091c7e037c9bd5f61466e9/solutions/TokenSolution_EOD1.sol#L106)
   - And paste it within [contract/token/Token.sol](https://github.com/Blockchain-Learning-Group/hub-template/blob/58d7ab1ab1230fcf72bfa8a3e96acc4ba325a5ef/contracts/token/Token.sol#L14)
   - Test the token's mint function
   ```
   truffle test test/Token/test_mint.js
   ```
   - Add another test case, should not be able to mint 0 tokens
   - [Token Mint Test Case Solutions](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/517605e79d900c5439505775dff5b3ad619428fe/solutions/TokenTests/test_mints.js#L65)
   - Confirm new test passing
   ```
   truffle test test/Token/test_mint.js
   ```
   - Run the current test suite and confirm all passing, just the mint test case at this time.
   ```
   hub-template $ truffle test
   ```
   
   - Run the application server
   ```
   npm install
   truffle compile
   cd app
   node server
   ```
   
   - Load the app
   [http://localhost:8081](https://localhost:8081)
   _Pop open the console and note the error, we must deploy our token contract._

   - Deploy your token, in another terminal window. Note this should be your 3rd window. 1. testrpc, 2. App server and now 3. Truffle
   ```
   truffle migrate
   ```
   
   - Copy the token address from the migration output and update the address in [app/client/js/home.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/0e3c950d388fb822a6a4312de85c9b2d547bd582/solutions/HubApp/home.js#L12)
   - Also copy in the token artifact json from build/contracts/Token.json and paste into [app/client/js/home.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/0e3c950d388fb822a6a4312de85c9b2d547bd582/solutions/HubApp/home.js#L14) as tokenJson
   - refresh [http://localhost:8081](https://localhost:8081)
   
   - Interact with the token
   - Within the browser console
   ```
   token.address
   token.totalSupply().toNumber()
   ```
   
   - Run the server with the token address
   ```
   app $ node server --token 0xbb1ca29e60971dfa434fc1e44912a4b1082e7873
   ```
   
   - Method to retrieve the total supply server side.  Add the following to your [initHub Method](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/3794646c23648d104a8029d01dddf4ed1ca31180/solutions/HubApp/ether.js#L36).
   ```
    // Get the total supply of the token
    totalSupply = (await token.totalSupply()).toNumber()
    console.log('Total Supply: ' + totalSupply)
   ```
   
   - Update to ui with the total supply on load adding the below to [app/client/js/home.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/3794646c23648d104a8029d01dddf4ed1ca31180/solutions/HubApp/home.js#L1103)
   ```
    // Set the total supply and symbol
    window.totalSupply = (await token.totalSupply()).toNumber()
    window.symbol = (await token.symbol()).valueOf()
    $('#totalSupply').text('Total Supply: ' + totalSupply + ' ' + symbol)
   ```
   
   - Create a listener for when tokens are minted, adding the below to [app/client/js/home.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/3794646c23648d104a8029d01dddf4ed1ca31180/solutions/HubApp/home.js#L1118)
   ```
    // Listen for tokens being minted
    // Listen starting from now, 'latest'.
    token.LogTokensMinted({ fromBlock: 'latest', toBlock: 'latest'})
    .watch((error, result) => {
      if (error) {
        console.error(error)

      } else {
        console.log(result)
        // Update the total supply
        totalSupply += result.args.value.toNumber()
        $('#totalSupply').text('Total Supply: ' + totalSupply + ' ' + symbol)
      }
    })
   ```
   
   - Create a script to mint some tokens
   - Make a new scripts directory
   ```
   mkdir scripts && cd scripts
   ```
   - Create a new file, mint.js, for our minting script, and copy the following [mint.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/HubApp/mint.js)
   
   - Mint some tokens.
   ```
   scripts $ node mint --token 0xbb1ca29e60971dfa434fc1e44912a4b1082e7873
   ```
   - Review the existing [contracts/Hub.sol](https://github.com/Blockchain-Learning-Group/hub-template/blob/master/contracts/Hub.sol)
   - Update the deployment script to include the hub. [migrations/2_deploy_contracts.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/3794646c23648d104a8029d01dddf4ed1ca31180/solutions/HubApp/2_deploy_contracts.js#L11) adding the below lines.
   
  ```
  const Hub = artifacts.require('./Hub.sol')
   
  // Deploy Token contract
  deployer.deploy(Token, { from: owner, gas: 4e6 })
  .then(() => {
    // Deploy the hub with refernce to the token
    return deployer.deploy(Hub, Token.address, { from: owner, gas: 4e6 })
   })
  ```
   
  - Deploy the hub and token
  ```
  hub-template $ truffle migrate
  ```
  - First update the address of the token
  - Copy the output of the migration to [app/client/js/home.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/3794646c23648d104a8029d01dddf4ed1ca31180/solutions/HubApp/home.js#L12)
  - Restart the server with the new address
  ```
  ctrl+c
  node server --token 0xe23390561b9e7e75a2e0b2a3c4513e7bbc23cc5b
  ```
  
  - Create a client side reference of the Hub as well adding the below lines to [app/client/js/home.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/3794646c23648d104a8029d01dddf4ed1ca31180/solutions/HubApp/home.js#L664)
  - Copy the hub address from the migration output
  - Copy the contents of build/contracts/Hub.json
  ```
   const hubAddress = '0x5d61309756460093947261d105e71c2f4b90220e'
   // Copy the contents of ../build/contracts/Hub.json
   const hubJson = <contents of Hub.json>
  ```
 
   - And create a reference to the object in [app/client/js/home.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/3794646c23648d104a8029d01dddf4ed1ca31180/solutions/HubApp/home.js#L1108) as well.
   ```
   // Create a reference to the Hub
   window.hub = await web3.eth.contract(hubJson.abi).at(hubAddress)
   ```

   - Confirm deployed hub token matches the token address, within browser console.
   ```
   hub.token_() == token.address
   ```

