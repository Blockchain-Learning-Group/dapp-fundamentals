# Blockchain Learning Group Inc. Decentralized Exchange
A decentralized example to enable ETH / BLG trading as well as BLG token generation via resource submission to the community hub.

## DApp Developmnet Fundamentals Quick Start

__[BLG Live Exchange - Kovan](https://ipfs.io/ipfs/QmWHnpKds9JUKPwPsPdqQZVwep2dLBfZz3tDCDTqAAUw4B/home.html)__
_Connect Metamask to Kovan network in order to view live order book and connect to deployed contracts._

1. Install and Configure [Metamask Chrome Extension](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)

2. Clone Me :)
```
$ cd /fav_dir/
$ git clone git@github.com:Blockchain-Learning-Group/blg-eth-exchange.git
$ cd blg-eth-exchange
```

3. Install Dependencies
```
blg-eth-exchange $ npm install
```

4. Run an Ethereum Client

  *In a separate terminal window / tab.*
```
$ testrpc
```

5. Compile All Contracts
```
blg-eth-exchange $ truffle compile
```

6. Execute Test Suite
```
blg-eth-exchange $ truffle test
```

7. Deploy All Contracts
```
blg-eth-exchange $ truffle migrate
```

8. Update the Client with Deployed Contract Addresses

  *For complete functionality hub and blg token addresses are also required.*

  *blg-eth-exchange/app/client/js/initEther.js#L8*
```
const exchangeAddress = <deployed Exchange address>
ie. const exchangeAddress = '0x9ec0d5ec757bc14699fd9e7ddf97dde405e7c1c5'
```

  *blg-eth-exchange/app/client/js/initEther.js#L1102*
```
const blgTokenAddress = <deployed BLG address>
ie. const blgTokenAddress = '0xfec1266f7e026363be4a7b0d10df790bbd92bff4'
```

  *blg-eth-exchange/app/client/js/initEther.js#L1793*
```
const hubAddress = <deployed Hub address>
ie. const hubAddress = '0x4519b80e842c4e8a9538997c39550dc724c28427'
```

9. Start the Server
```
blg-eth-exchange $ cd app
app $ node server
```

10. Navigate to http://localhost:9191

Connect metamask to localhost 8545 via dropdown menu.

## Usage
... TODO ...
- Placing orders
- Contributing resources
