# Day 2: DApp Development

[Download Completed Wallet Demo](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/raw/master/course-content/video-tutorials/wallet.mp4)

## Table of Contents
1. [Stage 1: Dev Enviroment Setup and App Bootstrapping](#stage-1-dev-enviroment-setup-and-application-bootstrap)
2. [Stage 2: Token Interface](#stage-2-token-interface)
3. [Stage 3: Token Interaction](#stage-3-token-interaction--get)
4. [Stage 4: Minting Tokens](#stage-4-token-interaction--mint-tokens)
5. [Stage 5: Events](#stage-5-events)
6. [Stage 6: Transfer Tokens](#stage-6-transfer-tokens)
7. [Bonus](#bonus-extend-your-wallet)
8. [Clean up](#clean-up)
---
### Stage 1: Dev Enviroment Setup and Application Bootstrap
![Completed](https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Wallet/02-stage-1.png)

*Begin instructions in a fresh terminal instance.  Not within any existing window manager, ie. screen or tmux.*

#### [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Wallet/02_video_tutorials/02-stage-1-01.mp4?raw=true)

1. Make a blg directory on your desktop

*Linux and Mac*
```
cd ~/Desktop && mkdir blg && cd blg
```
*Windows*
```
cd c:\Users\USERNAME\desktop && MD blg && cd blg
```
- *Example output:*
```
adam@adam:/$ cd ~/Desktop && mkdir blg && cd blg
adam@adam:~/Desktop/blg$
```

2. Clone the wallet template
```
git clone https://github.com/Blockchain-Learning-Group/wallet-template.git
```
- *Example output:*
```
adam@adam:~/Desktop/blg$ git clone https://github.com/Blockchain-Learning-Group/wallet-template.git
Cloning into 'wallet-template'...
remote: Counting objects: 30, done.
remote: Compressing objects: 100% (28/28), done.
remote: Total 30 (delta 0), reused 30 (delta 0), pack-reused 0
Unpacking objects: 100% (30/30), done.
Checking connectivity... done.
adam@adam:~/Desktop/blg$
```

3. Run your docker container

*Replace `<USERNAME>` with your username.*

*Linux*
```
docker run -dit -p 3000:3000 -p 8545:8545 -v /home/<USERNAME>/Desktop/blg:/blg --name=blg-env blockchainlg/dapp-dev-env
```
*Mac*
```
docker run -dit -p 3000:3000 -p 8545:8545 -v /Users/<USERNAME>/Desktop/blg:/blg --name=blg-env blockchainlg/dapp-dev-env
```
*Windows*
- Follow the steps [here](https://rominirani.com/docker-on-windows-mounting-host-directories-d96f3f056a2c) to share your C drive with docker.
```
docker run -dit -p 3000:3000 -p 8545:8545 -v c:/Users/<USERNAME>/desktop/blg:/blg --name=blg-env blockchainlg/dapp-dev-env
```
- *Example output:*
```
adam@adam:~$ docker run -dit -p 3000:3000 -p 8545:8545 -v /home/adam/Desktop/blg:/blg --name=blg-env blockchainlg/dapp-dev-env
1bb232a56e6868e2bc4dbeaf86405ec3ed892090809fcab1823cab38e8337dc1
adam@adam:~$
```
- __Common Error:__
```
adam@adam:~/Desktop/blg$ docker run -dit -p 3000:3000 -p 8545:8545 -v /home/adam/Desktop/blg:/blg --name=blg-env blockchainlg/dapp-dev-env
docker: Error response from daemon: Conflict. The container name "/blg-env" is already in use by container "9c52f3787e28c64b197e22ec509fb2a73cd5066543ec6345956e11b6e69ba41c". You have to remove (or rename) that container to be able to reuse that name.
See 'docker run --help'.
```
- Solution:
```
docker stop blg-env && docker rm blg-env
```
- *Examle Output*
```
adam@adam:~/Desktop/blg$ docker stop blg-env && docker rm blg-env
blg-env
blg-env
adam@adam:~/Desktop/blg$
```

4. Attach into the container

*Container will serve as your virtual environment.*
```
docker exec -it blg-env bash
```
- *Example output:*
```
adam@adam:~$ docker exec -it blg-env bash
root@182d123ec039:/blg/wallet-template#
```

5. Install dependencies
```
yarn
```
- *Example output:*
```
root@2e9e0eda980d:~/blg/wallet-template# yarn
yarn install v1.2.0
[1/4] Resolving packages...
[....]
Done in 42.65s.
root@2e9e0eda980d:~/blg/wallet-template#
```

6. Compile the contracts
```
cd src && truffle compile
```
- *Example output:*
```
root@2e9e0eda980d:~/blg/wallet-template# cd src && truffle compile
Compiling ./contracts/token/ERC20.sol...
[...]
Writing artifacts to ./build/contracts

root@2e9e0eda980d:~/blg/wallet-template/src#
```

7. Start up your window manager, tmux
```
tmux
```
- *Example output:*
```
root@a75baed9ceba:/blg/wallet-template#
```

8. Start the app
```
yarn start
```
- *Example output:*
```
# yarn start
yarn run v1.2.0
$ react-scripts start
Starting the development server...
Compiled with warnings.

./src/App.js
  Line 41:  'defaultAccount' is assigned a value but never used  no-unused-vars

Search for the keywords to learn more about each warning.
To ignore, add // eslint-disable-next-line to the line before.
```

9. Load the app in chrome, [localhost:3000](http://localhost:3000/)

### END Stage 1: Dev Enviroment Set up and Application Bootstrapped!
---
### Stage 2: Token Interface
![Completed](https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Wallet/02-stage-2.png)

#### [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Wallet/02_video_tutorials/02-stage-2-01.mp4?raw=true)

1. Create a new window, Ethereum client

*ctrl AND b THEN c*
```
ctrl+b c  
```
- *Example output: Result in new empty window, in same directory.*
```
#
```

2. Start up your Ethereum client, testrpc
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

3. Create a new window, Truffle

*ctrl AND b THEN c*
```
ctrl+b c  
```
- *Example output: Result in new empty window, in same directory.*
```
#
```

4. Test Your Token contract

*contracts/Token.sol has been provided or do update it with the Token that was completed at the end of Day 1.*
*Also one test file has been provided to confirm the mint method was implemented correctly.*
```
truffle test
```
- *Example output:*
```
# truffle test
Using network 'development'.
  Contract: Token.mint()
    � should mint new tokens and allocate to user. (416ms)
    � should return false and LogErrorString when not from owner. (379ms)
    � should return false and LogErrorString when minting a value of 0. (318ms)
  3 passing (1s)
#
```

5. Refresh your chrome browser and open up the developer console

`right click => inspect`

*Note the error message:* `Token has not been deployed to the detected network.`

6. Deploy your Token
```
truffle migrate
```
- *Example output:*
```
# truffle migrate
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

1. Add a method to mint tokens, sending a transaction to the token contract. [wallet-template/src/App.js#L155](https://github.com/Blockchain-Learning-Group/wallet-eod2/blob/734732d713514efcdb125e27d1cb3409757c1a93/src/App.js#L170)
```
this.state.token.mint(
  user,
  amount*10**this.state.tokenDecimals, // Convert to correct decimal places
  { from: this.web3.eth.accounts[this.state.defaultAccount] },
  (err, res) => {
    if (err) console.error(err)
    else console.log(res)
  }
)
```

2. In the GUI mint tokens to available accounts.

*Note transaction hash in develop console*
*Note the transaction is sent from the current default account and only the contract owner, account 0, has permission to do so.*
- *Example output:*
```
0x4b396191e87c31a02e80160cb6a2661da6086c073f6e91e9bd1f796e29b0c983
```

3. Refresh chrome and view the account's balance of shiny new tokens!

### END Stage 4: Token Interaction - Mint Tokens
---
### Stage 5: Events
![Completed](https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Wallet/02-stage-5.png)
![Completed](https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Wallet/02-stage-5-2.png)

#### [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Wallet/02_video_tutorials/02-stage-5-01.mp4?raw=true)

1. Add an event to listen for when tokens are minted, [wallet-template/src/App.js#L131](https://github.com/Blockchain-Learning-Group/wallet-eod2/blob/734732d713514efcdb125e27d1cb3409757c1a93/src/App.js#L135)
```
this.state.token.LogTokensMinted({ fromBlock: 'latest', toBlock: 'latest' })
.watch((err, res) => {
  console.log(`Tokens Minted! TxHash: https://kovan.etherscan.io/tx/${res.transactionHash}`)
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

5. Add another event listener to watch for errors, [wallet-template/src/App.js#L149](https://github.com/Blockchain-Learning-Group/wallet-eod2/blob/734732d713514efcdb125e27d1cb3409757c1a93/src/App.js#L153)
```
this.state.token.LogErrorString({ fromBlock: 'latest', toBlock: 'latest' })
.watch((err, res) => {
  console.error(res.args.errorString)
})
```

6. Mint tokens and view the log confirmation in the developer console and token and ETH balance updated!  Also mint tokens from an account that is not the owner and view the error message.

*Note testrpc known bug where it will re-broadcast the latest event every time a new connection is made.  For example every time the browser refreshes in our case the event log will appear.*

### END Stage 5: Events
---
### Stage 6: Transfer Tokens
![Completed](https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Wallet/02-stage-6.png)
![Completed](https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Wallet/02-stage-6-2.png)

_Try this portion on your own!_

#### [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Wallet/02_video_tutorials/02-stage-6-01.mp4?raw=true)

The required components included:
1. Add the React transfer tokens form component. [Solution](https://github.com/Blockchain-Learning-Group/wallet-eod2/blob/734732d713514efcdb125e27d1cb3409757c1a93/src/App.js#L238)

2. Complete the transfer method to send the transfer transaction. [Solution](https://github.com/Blockchain-Learning-Group/wallet-eod2/blob/734732d713514efcdb125e27d1cb3409757c1a93/src/App.js#L193)

3. Add an event listener to watch for token transfers. [Solution](https://github.com/Blockchain-Learning-Group/wallet-eod2/blob/734732d713514efcdb125e27d1cb3409757c1a93/src/App.js#L144)

_Finally transfer tokens between accounts and review balances._

### END Stage 6: Transfer Tokens
---
### Bonus: Extend Your Wallet
1. Metamask Integration
- [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Wallet/02_video_tutorials/02-bonus-metamask-integration.mp4?raw=true)
- Ensure Metamask is installed, unlocked and connected to the local client(localhost:8545).
- Fund your metamask account!
```
truffle console
truffle(development)> web3.eth.sendTransaction({ from: web3.eth.accounts[0], to: 'METAMASK_ADDRESS', value: 1e18 })
```
- Transfer tokens to your metamask account(from within the application).
- Add a conditional to use the Metamask web3 provider if present, [wallet-template/src/App.js#L35](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/0779b46516bc5c697c5fb986cad1080b8c8121af/src/App.js#L49)
```
if (window.web3)
    this.web3 = new Web3(window.web3.currentProvider)
else
```
- Refresh the browser and connect to your Metamask account. View your Metamask account now available within the application.

2. Enable the wallet to support multiple ERC20 tokens.
---
### Clean up

#### [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Wallet/02_video_tutorials/02-stage-cleanup-01.mp4?raw=true)

1. Detach from your tmux session

*ctrl AND b THEN d*
```
ctrl+b d
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
