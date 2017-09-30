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
>>> import sha3
>>> sha3.sha3_256(bytes(1)).hexdigest()
b'5d53469f20fef4f8eab52b88044ede69c77a6a68a60728609fc4a65ff531e7d0'

>>> sha3.sha3_256(bytes(2)).hexdigest()
b'762ba6a3d9312bf3e6dc71e74f34208e889fc44e6ff400724deecfeda7d5b3ce'
```
7. [Bitcoin 51% Attack Cost](https://gobitcoin.io/tools/cost-51-attack/)
8. [Remix](https://ethereum.github.io/browser-solidity/)

9. [DappDeveloper.sol](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/contracts/samples/DappDeveloper.sol)

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
11. [Voting Exercise](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/contracts/exercises/Voting.sol)

12. [Token Exercise](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/contracts/exercises/Token.sol)

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
truffle migrate
truffle test
```

3. DApp Development

```
git clone https://github.com/Blockchain-Learning-Group/hub-template
cd hub-template
```
