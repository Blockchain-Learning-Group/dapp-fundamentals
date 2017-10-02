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

   - Deploy your token
   ```
   hub-template $ truffle migrate
   ```
   
   - Copy the token address from the migration output and update the address in home.js
   - Also copy in the token artifact json from /build/contracts/Token.json
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
   
   - Mint some tokens.
   ```
   scripts $ node mint --token 0xbb1ca29e60971dfa434fc1e44912a4b1082e7873
   ```

   - Confirm deployed hub references
   ```
   hub.token_() == token.address
   ```

