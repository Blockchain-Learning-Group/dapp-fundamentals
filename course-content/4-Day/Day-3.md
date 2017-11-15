## Day 3: DApp Extension

## Table of Contents
1. [Stage 1: Dev Enviroment Setup and App Bootstrapping](#stage-1-dev-enviroment-setup-and-application-bootstrap)
2. [Stage 2: Token Interface](#stage-2-token-interface)
3. [Stage 3: Token Interaction](#stage-3-token-interaction--get)
4. [Stage 4: Minting Tokens](#stage-4-token-interaction--mint-tokens)
5. [Stage 5: Events](#stage-5-events)
6. [Stage 6: Transfer Tokens](#stage-6-transfer-tokens)
7. [Bonus](#bonus-extend-your-wallet)
8. [Day 2 Clean up](#day-2-clean-up)
---
### Stage 1: Restart Your Dev Environment and App
![Completed](https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Wallet/03-stage-1.png)

*Begin instructions in a fresh terminal instance.  Not within any existing window manager, ie. screen or tmux.*

#### [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Wallet/02_video_tutorials/02-stage-1-01.mp4?raw=true)

1. Start your container back up
```
docker start blg-env
```
- *Example output:*
```
adam@adam:~$ docker start blg-env
blg-env
adam@adam:~$
```

2. Attach into your container

*Container will serve as your virtual environment.*
```
docker exec -it blg-env bash
```
- *Example output:*
```
adam@adam:~$ docker exec -it blg-env bash
root@9c52f3787e28:/blg/wallet-template#
```

3. Start up your window manager, screen
```
screen
```
- *Example output:*
```
root@ebab36647c9e:/blg/wallet-template/src# screen
Screen version 4.02.01 (GNU) 28-Apr-14
[...]
                [Press Space or Return to end.]
```
*PRESS ENTER*
```
#
```

4. Start the app
```
yarn start
```
- *Example output:*
```
# yarn start
yarn run v1.2.0
$ react-scripts start
Starting the development server...

Compiled successfully!

You can now view my-app in the browser.

  Local:            http://localhost:3000/
  On Your Network:  http://172.17.0.2:3000/

Note that the development build is not optimized.
To create a production build, use yarn build.
```

5. Create a new window, Ethereum client

*ctrl AND a THEN c*
```
ctrl+a c  
```
- *Example output: Result in new empty window, in same directory.*
```
#
```

6. Start up your Ethereum client, testrpc
```
testrpc
```
- *Example output:*
```
# testrpc
EthereumJS TestRPC v4.1.3 (ganache-core: 1.1.3)
[...]
Listening on localhost:8545
```

7. Create a new window, Truffle

*ctrl AND a THEN c*
```
ctrl+a c  
```
- *Example output: Result in new empty window, in same directory.*
```
#
```

8. Deploy your Token
```
cd src && truffle migrate
```
- *Example output:*
```
# cd src && truffle migrate
Using network 'development'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0x26ff3f480502a228f34363e938289c3164edf8bc49c75f5d6d9623a05da92dbf
  Migrations: 0x3e47fad1423cbf6bd97fee18ae2de546b0e9188a
Saving successful migration to network...
  ... 0x19a7a819df452847f34815e2573765be8c26bac43b1c10d3b7528e6d952ac02c
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Deploying Token...
  ... 0x4a69e7840d0f96067964fb515ffea1a04a98fc5759849d3308584af4770c8f7b
  Token: 0xd58c6b5e848d70fd94693a370045968c0bc762a7
Saving successful migration to network...
  ... 0xd1e9bef5f19bb37daa200d7e563f4fa438da60dbc349f408d1982f8626b3c202
Saving artifacts...
#
```

9. Load the app in chrome, [localhost:3000](http://localhost:3000/)

### END Stage 1: Dev Enviroment Set up and Application Bootstrapped!
---
### Stage 2: Create the Exchange Component

7. Refresh chrome, server may already have done so.

*View in the developer console the token instance is now present*

- *Example output:*
```
Contract {_eth: Eth, transactionHash: null, address: "0xd58c6b5e848d70fd94693a370045968c0bc762a7", abi: Array[20]}
```

### END Stage 2: Token Interface
---
### Stage 3: Token Interaction - GET
![Completed](https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Wallet/02-stage-3.png)

_Time to start coding!_

#### [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Wallet/02_video_tutorials/02-stage-3-01.mp4?raw=true)

1. Open up the repo ~/Desktop/blg/wallet-template in a text editor of your choice

2. Set the default account's ether balance, [wallet-template/src/App.js#L55](https://github.com/Blockchain-Learning-Group/wallet-eod2/blob/6095b3cad3b3aff0628c17f52cba15c8f2171ece/src/App.js#L55)
```
this.web3.eth.getBalance(defaultAccount, (err, ethBalance) => {
  this.setState({ ethBalance })
})
```

3. Set the default account's token balance, [wallet-template/src/App.js#L74](https://github.com/Blockchain-Learning-Group/wallet-eod2/blob/274116cb3b1d335282b3b9058067b34d758605e5/src/App.js#L74)
```
token.balanceOf(defaultAccount, (err, tokenBalance) => {
  this.setState({ tokenBalance })
})
```

4. Set the token's symbol, [wallet-template/src/App.js#L81](https://github.com/Blockchain-Learning-Group/wallet-eod2/blob/274116cb3b1d335282b3b9058067b34d758605e5/src/App.js#L81)
```
token.symbol((err, tokenSymbol) => {
  this.setState({ tokenSymbol })
})
```

5. Set the token's decimal places, [wallet-template/src/App.js#L88](https://github.com/Blockchain-Learning-Group/wallet-eod2/blob/274116cb3b1d335282b3b9058067b34d758605e5/src/App.js#L88)
```
token.decimals((err, tokenDecimals) => {
  this.setState({ tokenDecimals })
})
```

6. View the default account balances and token information in your browser!

### END Stage 3: Token Interaction - GET
---
### Stage 4: Token Interaction - Mint Tokens
![Completed](https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Wallet/02-stage-4.png)
![Completed 2](https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Wallet/02-stage-4-2.png)

#### [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Wallet/02_video_tutorials/02-stage-4-01.mp4?raw=true)

1. Add a method to mint tokens, sending a transaction to the token contract. [wallet-template/src/App.js#L155](https://github.com/Blockchain-Learning-Group/wallet-eod2/blob/274116cb3b1d335282b3b9058067b34d758605e5/src/App.js#L170)
```
this.state.token.mint(
  user,
  amount*10**this.state.tokenDecimals, // Convert to correct decimal places
  { from: this.web3.eth.accounts[this.state.defaultAccount] },
  (err, res) => {
    console.log(err)
    console.log(res)
  }
)
```

2. In the GUI mint tokens to available accounts.

*Note transaction hash in develop console*
*Note the transaction is sent from the current default account and only the contract owner, account 0, has permission to do so.*
- *Example output:*
```
null
0x4b396191e87c31a02e80160cb6a2661da6086c073f6e91e9bd1f796e29b0c983
```

3. Refresh chrome and view the account's balance of shiny new tokens!

### END Stage 4: Token Interaction - Mint Tokens
---
### Stage 5: Events
![Completed](https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Wallet/02-stage-5.png)
![Completed](https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Wallet/02-stage-5-2.png)

#### [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Wallet/02_video_tutorials/02-stage-5-01.mp4?raw=true)

1. Add an event to listen for when tokens are minted, [wallet-template/src/App.js#L131](https://github.com/Blockchain-Learning-Group/wallet-eod2/blob/274116cb3b1d335282b3b9058067b34d758605e5/src/App.js#L135)
```
this.state.token.LogTokensMinted({ fromBlock: 'latest', toBlock: 'latest' })
.watch((err, res) => {
  alert('Tokens Minted!')
  this.loadAccountBalances(this.web3.eth.accounts[this.state.defaultAccount])
})
```

2. Update the default account's token balance when the event is fired.
[wallet-template/src/App.js#L115](https://github.com/Blockchain-Learning-Group/wallet-eod2/blob/274116cb3b1d335282b3b9058067b34d758605e5/src/App.js#L115)
```
this.state.token.balanceOf(account, (err, tokenBalance) => {
  this.setState({ tokenBalance })
})
```

3. Update the default account's ETH balance when the event is fired.
[wallet-template/src/App.js#L122](https://github.com/Blockchain-Learning-Group/wallet-eod2/blob/274116cb3b1d335282b3b9058067b34d758605e5/src/App.js#L122)
```
this.web3.eth.getBalance(account, (err, ethBalance) => {
  this.setState({ ethBalance })
})
```

4. Load the contract events, [wallet-template/src/App.js#L95](https://github.com/Blockchain-Learning-Group/wallet-eod2/blob/274116cb3b1d335282b3b9058067b34d758605e5/src/App.js#L95)
```
this.loadEventListeners()
```

5. Add another event listener to watch for errors, [wallet-template/src/App.js#L149](https://github.com/Blockchain-Learning-Group/wallet-eod2/blob/274116cb3b1d335282b3b9058067b34d758605e5/src/App.js#L153)
```
this.state.token.LogErrorString({ fromBlock: 'latest', toBlock: 'latest' })
.watch((err, res) => {
  alert(res.args.errorString)
})
```

6. Mint tokens and view the dialog confirmation and token and ETH balance updated!  Also mint tokens from an account that is not the owner and view the error message.

*Note testrpc known bug where it will re-broadcast the latest event every time a new connection is made.  For example every the browser refreshes in our case the event dialog will appear.*

### END Stage 5: Events
---
### Stage 6: Transfer Tokens
![Completed](https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Wallet/02-stage-6.png)
![Completed](https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Wallet/02-stage-6-2.png)
![Completed](https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Wallet/02-stage-6-3.png)
_Try this portion on your own!_

#### [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Wallet/02_video_tutorials/02-stage-6-01.mp4?raw=true)

The required components included:
1. Add the React transfer tokens form component. [Solution](https://github.com/Blockchain-Learning-Group/wallet-eod2/blob/274116cb3b1d335282b3b9058067b34d758605e5/src/App.js#L269)

2. Complete the transfer method to send the transfer transaction. [Solution](https://github.com/Blockchain-Learning-Group/wallet-eod2/blob/274116cb3b1d335282b3b9058067b34d758605e5/src/App.js#L193)

3. Add an event listener to watch for token transfers. [Solution](https://github.com/Blockchain-Learning-Group/wallet-eod2/blob/274116cb3b1d335282b3b9058067b34d758605e5/src/App.js#L144)

_Finally tranfer tokens between accounts and review balances._

### END Stage 6: Transfer Tokens
---
### Bonus: Extend Your Wallet
1. Enable the wallet to support multiple ERC20 tokens.
---
### Day 2 Clean up

#### [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Wallet/02_video_tutorials/02-stage-cleanup-01.mp4?raw=true)

1. Detach from your screen session

*ctrl AND a THEN d*
```
ctrl+a d
```

2. Detach from the container
```
ctrl+d
```

3. Stop the container
```
docker stop blg-env
```
- *Example output:*
```
adam@adam:~/$ docker stop blg-env
blg-env
adam@adam:~/$
```
