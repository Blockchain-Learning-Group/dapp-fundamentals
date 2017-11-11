## Day 3
- Solution to Day 2 available here:   [solution/Hub.sol](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/tree/master/solutions/Hub)

or may be cloned here:
```
blg $ git clone https://github.com/Blockchain-Learning-Group/Hub-eod2.git
blg $ cd Hub-eod2 && npm install
```

- Stop your ethereum client. Your real Ethereum client, parity.
- Note --rpccorsdomain flag required.

_Full Node_
```
parity --chain kovan --tracing off --rpccorsdomain '*' ui
```

- If troubles connecting to ui update ui and dapps ports
```
parity --chain kovan --tracing off --rpccorsdomain '*' --ui-port 3333 --dapps-port 4444 ui
```

- Fund your parity account, send a transaction from your metamask account.

- Clone the complete exchange and install dependencies.
```
blg $ git clone https://github.com/Blockchain-Learning-Group/exchange-complete.git
blg $ cd exchange-complete && npm install
```

- Deploy the exchange contract
```
exchange-complete $ truffle migrate
```

*NOTE known parity truffle race condition*
- Solution: simply run the migration again.  Fix to be introduced in upcoming parity version.
```
Error encountered, bailing. Network state unknown. Review successful transactions manually.
Error: The contract code couldn't be stored, please check your gas amount.
```

- Update the exchange address at [exchange-complete/app/client/js/ether.js#L7](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/12d3b25c24d9059a2e91b58d850b498f6953e66d/solutions/Exchange/app/client/js/ether.js#L7).

- View the exchange contract at [https://kovan.etherscan.io/address/< Exchange Address >](https://kovan.etherscan.io/address/0xc6cccf463b30d8f79159435edccb348dcec5023c)

- Deploy the hub and token.
```
hub-template $ truffle migrate
```

- View the hub and token contracts at [https://kovan.etherscan.io/address/< Hub or Token Address >](https://kovan.etherscan.io/address/0xc6cccf463b30d8f79159435edccb348dcec5023c)

- Update the hub and token address at [hub-template/app/client/js/home.js#L7](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/12d3b25c24d9059a2e91b58d850b498f6953e66d/solutions/Hub/app/client/js/home.js#L7).
- Update the hub and token address at [exchange-complete/app/client/js/ether.js#8](https://github.com/Blockchain-Learning-Group/exchange-complete/blob/57a93e957ef5b5ce6c6ec8875d35673bdecb3f8b/app/client/js/ether.js#L8).

- Also don't forget to update the mapping of the address to token symbol for the ui. [exchange-complete/app/client/js/ether.js#L20](https://github.com/Blockchain-Learning-Group/exchange-complete/blob/57a93e957ef5b5ce6c6ec8875d35673bdecb3f8b/app/client/js/ether.js#L20).
```
// Line 20 - within $(window).ready(() => {
window.tokenAddressToSymbol = {
  '0x0000000000000000000000000000000000000000': 'ETH',
  '0x87dec673238cd9fe9bc1479c21f9f8165bc3879b': 'BLG'
}
```

- Start the hub
```
hub-template/app $ node server
```

- Add your Metamask address to the hub. Ensure Metamask is connected to Kovan.
- View your transaction on Kovan [https://kovan.etherscan.io/tx/<tx id(accessible direct in parity)>](https://kovan.etherscan.io/tx/0x33137753b9798c1c3a123a53cf1f36476c6d0f415cb126d2bd8166d716313975)

### IPFS
- Deploy the exchange to ipfs.
```
$ pip3 install ipfsapi
cd exchange/deploy
deploy $ python3 deploy_to_ipfs.py

**********************************
* Success, App deployed to IPFS! *
**********************************


**********************************************************************************************
* Naviagte to: https://ipfs.io/ipfs/QmRppv7LMa5LXEJjGFqg5wVAAMon3kForG7Jy8xxG1EaCj/home.html *
**********************************************************************************************
```
- Navigate to your decentralized app! [Example](https://ipfs.io/ipfs/QmRppv7LMa5LXEJjGFqg5wVAAMon3kForG7Jy8xxG1EaCj/home.html)

- Add your Metamask account to the hub.

- Submit a resource!

_Note if events are not caught within the exchange but they are in the hub try disabling and re-enabling Metamask and subsequently unlocking your Metamask account._

- Submit an order!
