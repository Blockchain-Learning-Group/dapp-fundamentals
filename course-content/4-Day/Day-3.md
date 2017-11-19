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
![Completed](https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Exchange/03-stage-1.png)

*Begin instructions in a fresh terminal instance.  Not within any existing window manager, ie. screen or tmux.*

#### [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Exchange/03_video_tutorials/03-stage-1.mp4?raw=true)

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

### END Stage 1: Restart Your Dev Environment and App
---
### Stage 2: Create the Exchange Contract
#### [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Exchange/03_video_tutorials/03-stage-2.mp4?raw=true)

1. Create a new file wallet-template/src/contracts/Exchange.sol
```
Exchange.sol
```

2. Copy [Exchange Template](https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/exercises/ExchangeTemplate.sol) into the new file, wallet-template/src/contracts/Exchange.sol.

3. Review the contents of the provided template.

### END Stage 2: Create the Exchange Contract
---
### Stage 3: Write the submitOrder Method
#### [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Exchange/03_video_tutorials/03-stage-3.mp4?raw=true)

1. Ensure the exchange has been given a sufficient token allowance [wallet-template/src/contracts/Exchange.sol#L61](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/c40e4f3bf96f36c0adc5d0f26084192d568e1c8f/src/contracts/Exchange.sol#L61).
```
require(ERC20(_bidToken).allowance(msg.sender, this) >= _bidAmount);
```

2. Compute a `unique` id for the order, [wallet-template/src/contracts/Exchange.sol#L66](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/c40e4f3bf96f36c0adc5d0f26084192d568e1c8f/src/contracts/Exchange.sol#L66)
```
bytes32 orderId = keccak256(_bidToken, _bidAmount, _askToken, _askAmount);
```

3. Confirm this order does not already exist, [wallet-template/src/contracts/Exchange.sol#L67](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/c40e4f3bf96f36c0adc5d0f26084192d568e1c8f/src/contracts/Exchange.sol#L67)
```
require(orderBook_[orderId].askAmount == 0); // check for existence, default to 0, assume no one is giving tokens away for free
```

4. Add the order to the order book, [wallet-template/src/contracts/Exchange.sol#L72](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/c40e4f3bf96f36c0adc5d0f26084192d568e1c8f/src/contracts/Exchange.sol#L72)
```
orderBook_[orderId] = Order({
  maker: msg.sender,
  bidToken: _bidToken,
  bidAmount: _bidAmount,
  askToken: _askToken,
  askAmount: _askAmount
});
```

5. Emit the order submitted event, [wallet-template/src/contracts/Exchange.sol#L83](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/c40e4f3bf96f36c0adc5d0f26084192d568e1c8f/src/contracts/Exchange.sol#L83)
```
LogOrderSubmitted(orderId, msg.sender, _bidToken,_bidAmount, _askToken, _askAmount);
```

### END Stage 3: Write the submitOrder Method
---
### Stage 4: Test the submitOrder Method
#### [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Exchange/03_video_tutorials/03-stage-4.mp4?raw=true)

1. Create a new file wallet-template/src/test/test_submit_executeOrder.js
```
test_submit_executeOrder.js
```

2. Copy the [test template](https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/exercises/test_submit_executeOrder-template.js) into wallet-template/src/test/test_submit_executeOrder.js

__Test Setup__

3. Define the accounts to be used, maker and taker, [wallet-template/src/test/test_submit_executeOrder.js#L12](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/test/test_submit_executeOrder.js#L12)
```
const maker = accounts[0]
const taker = accounts[1]
```

4. Deploy a new exchange and token in the test case, [wallet-template/src/test/test_submit_executeOrder.js#L19](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/test/test_submit_executeOrder.js#L19)
```
exchange = await Exchange.new()
token = await Token.new({ from: maker })
```

5. Define the order parameters, [wallet-template/src/test/test_submit_executeOrder.js#L25](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/test/test_submit_executeOrder.js#L25)
```
const bidToken = token.address
const bidAmount = 1
const askToken = 0
const askAmount = 100
```

6. Setup the transaction by minting tokens to the maker and giving allowance to the exchange, [wallet-template/src/test/test_submit_executeOrder.js#L33](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/test/test_submit_executeOrder.js#L33)
```
await token.mint(maker, bidAmount, { from: maker });
await token.approve(exchange.address, bidAmount, { from: maker })
```

7. Send the transaction submitting the order, [wallet-template/src/test/test_submit_executeOrder.js#L39](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/test/test_submit_executeOrder.js#L39)
```
const tx = await exchange.submitOrder(bidToken, bidAmount, askToken, askAmount, {
    from: maker,
    gas : 4e6
  }
)
```

__Assertions__

8. Confirm the correct event emitted, [wallet-template/src/test/test_submit_executeOrder.js#L48](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/test/test_submit_executeOrder.js#L48)
```
const log = tx.logs[0]
assert.equal(log.event, 'LogOrderSubmitted', 'Event not emitted')
```

9. Confirm the order stored on-chain is correct, [wallet-template/src/test/test_submit_executeOrder.js#L54](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/test/test_submit_executeOrder.js#L54)
```
orderId = tx.logs[0].args.id
const order = await exchange.orderBook_(orderId)
assert.equal(order[0], maker, 'maker incorrect')
assert.equal(order[1], bidToken, 'bid token incorrect')
assert.equal(order[2], bidAmount, 'bid amount incorrect')
assert.equal(order[3], askToken, 'ask token incorrect')
assert.equal(order[4], askAmount, 'ask amount incorrect')
```

10. Execute the test and confirm it is passing!
```
truffle test test/test_submit_executeOrder.js
```
- *Example output:*
```
# truffle test test/test_submit_executeOrder.js
[...]
Contract: Exchange.submitOrder() && executeOrder()
  � submitOrder(), should succeed by adding a new order to the orderBook on-chain. (648ms)
  � executeOrder(), should succeed by trading the tokens. Maker bids ether.


2 passing (694ms)

#
```

### END Stage 4: Test the submitOrder method
---
### Stage 5: Write the executeOrder Method
#### [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Exchange/03_video_tutorials/03-stage-6.mp4?raw=true)

1. Load the order struct into memory(will save gas cost for subsequent reads), [wallet-template/src/contracts/Exchange.sol#L98](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/contracts/Exchange.sol#L98)
```
Order memory order = orderBook_[_orderId];
```

2. Confirm enough ether was sent with the transaction to fill the order, [wallet-template/src/contracts/Exchange.sol#L103](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/contracts/Exchange.sol#L103)
```
require(msg.value == order.askAmount);
```

3. Execute the trade.
  - Moving ether to the maker, [wallet-template/src/contracts/Exchange.sol#L108](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/contracts/Exchange.sol#L108)
  ```
  order.maker.transfer(order.askAmount);
  ```
  - AND tokens to the taker, [wallet-template/src/contracts/Exchange.sol#L109](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/contracts/Exchange.sol#L109)
  ```
  require(ERC20(order.bidToken).transferFrom(order.maker, msg.sender, order.bidAmount));
  ```

4.  Remove the filled order from the order book, [wallet-template/src/contracts/Exchange.sol#L114](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/contracts/Exchange.sol#L114)
```
delete orderBook_[_orderId];
```

5. Emit the order executed event, [wallet-template/src/contracts/Exchange.sol#L119](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/contracts/Exchange.sol#L119)
```
LogOrderExecuted(_orderId, order.maker, msg.sender, order.bidToken, order.bidAmount, order.askToken, order.askAmount);
```
### END Stage 5: Write the executeOrder Method
---
### Stage 6: Test the executeOrder Method
#### [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Exchange/03_video_tutorials/03-stage-6.mp4?raw=true)

__Test Setup__

1. Get the initial ether balances for both accounts, [wallet-template/src/test/test_submit_executeOrder.js#L67](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/test/test_submit_executeOrder.js#L67)
```
const makerBalanceBefore = web3.eth.getBalance(maker).toNumber()
const takerBalanceBefore = web3.eth.getBalance(taker).toNumber()
```

2. Submit the transaction to execute the order, [wallet-template/src/test/test_submit_executeOrder.js#L73](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/test/test_submit_executeOrder.js#L73)
```
const tx = await exchange.executeOrder(orderId, {
    from: taker,
    gas : 4e6,
    value: 100 // ask amount from previously submitted order
  }
)
```

__Assertions__

3. Confirm the execute order event emitted, [wallet-template/src/test/test_submit_executeOrder.js#L83](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/test/test_submit_executeOrder.js#L83)
```
const log = tx.logs[0]
assert.equal(log.event, 'LogOrderExecuted', 'Event not emitted')
```

4. Confirm the token balances updated correctly, [wallet-template/src/test/test_submit_executeOrder.js#L89](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/test/test_submit_executeOrder.js#L89)
```
const makerTokenBalance = (await token.balanceOf(maker)).toNumber()
const takerTokenBalance = (await token.balanceOf(taker)).toNumber()
assert.equal(makerTokenBalance, 0, 'Maker token balance incorrect.')
assert.equal(takerTokenBalance, 1, 'Taker token balance incorrect.')
```

5. Confirm the ether balances updated correctly, [wallet-template/src/test/test_submit_executeOrder.js#L97](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/test/test_submit_executeOrder.js#L97)
```
const makerBalanceAfter = web3.eth.getBalance(maker).toNumber()
const takerBalanceAfter = web3.eth.getBalance(taker).toNumber()
assert.equal(makerBalanceAfter, makerBalanceBefore + 100, 'Maker eth balance incorrect')
// Note taker also had to pay for the executeOrder tx
assert.isBelow(takerBalanceAfter, takerBalanceBefore - 100, 'Taker eth balance incorrect')
```

6. Confirm the order was removed from the order book, [wallet-template/src/test/test_submit_executeOrder.js#L106](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/test/test_submit_executeOrder.js#L106)
```
const order = await exchange.orderBook_(orderId)
assert.equal(order[4], 0)
```

7. Execute the test and confirm it is passing!
```
truffle test test/test_submit_executeOrder.js
```
- *Example output:*
```
# truffle test test/test_submit_executeOrder.js
[...]
Contract: Exchange.submitOrder() && executeOrder()
  � submitOrder(), should succeed by adding a new order to the orderBook on-chain. (648ms)
  � executeOrder(), should succeed by trading the tokens. Maker bids ether.


2 passing (994ms)

#
```

__Success, The exchange contract is complete!__

### END Stage 6: Test the executeOrder Method
---
### Stage 7: Add Basic Routing to the DApp
![Completed](https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Exchange/03-stage-7-blank-exchange.png)

#### [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Exchange/03_video_tutorials/03-stage-7.mp4?raw=true)

1. Add # based routing to render the exchange component, [wallet-template/src/App.js#L215](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/App.js#L363)
```
if (window.location.hash === '#exchange') {

} else {

}
```
- *Example:*
```
215:  if (window.location.hash === '#exchange') {

217:  } else {
        component = <div>
        [...]
        </div>
253:  }
```

2. Confirm the routing is working, open [localhost:3000/#exchange](http://localhost:3000/#exchange)

### END Stage 7: Add Basic Routing to the DApp
---
### Stage 8: Deploy the Exchange
#### [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Exchange/03_video_tutorials/03-stage-8.mp4?raw=true)

1. Add the exchange to the deployment script, [wallet-template/master/src/migrations/2_deploy_contracts.js](https://raw.githubusercontent.com/Blockchain-Learning-Group/exchange-eod3/master/src/migrations/2_deploy_contracts.js)
```
const Token = artifacts.require("./Token.sol");
const Exchange = artifacts.require("./Exchange.sol");
const owner = web3.eth.accounts[0]

module.exports = deployer => {
  deployer.deploy(Token, { from: owner, gas: 4e6 })
  deployer.deploy(Exchange, { from: owner, gas: 4e6 })
}
```

2. Deploy the exchange and a new token.
```
truffle migrate --reset
```
- *Example output:*
```
# truffle migrate --reset
Using network 'development'.

Running migration: 1_initial_migration.js
  Replacing Migrations...
  ... 0xaf3df4616497a63d75879d900ee9bd580881e3d88b359942aa89beb12ff05416
  Migrations: 0x4d52502c81f1b7119a59d7a69ca8b061d557e071
Saving successful migration to network...
  ... 0xa57ed9864bf4a34835ad0f074083030011e9f36aae813b58182f7d8cde8d4571
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Replacing Token...
  ... 0xfb84339717eebb27f7593d5419633086c6961a46736d9f730185f9584bbca671
  Token: 0x1f8fbc989937346cbc923da292b1b6f9f958eafe
  Deploying Exchange...
  ... 0xd4566da630267b7f41a554b3773ea4c2880d98828275632e4c9e6fd7f8d26b03
  Exchange: 0xb9d7ffb8c064384f167199025ef2ad0a130c49c6
Saving successful migration to network...
  ... 0x97f51a0d5d97de1bf4d3f5028783349616fa25e0ddbadadecafe76fb1895189d
Saving artifacts...
#
```

### END Stage 8: Deploy the Exchange
---
### Stage 9: Create the Reference Exchange Object
![Completed](https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Exchange/03-stage-9.png)

#### [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Exchange/03_video_tutorials/03-stage-9.mp4?raw=true)

1. Import the exchange build artifacts, [wallet-template/src/App.js#L15](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/App.js#L23)
```
import exchangeArtiacts from './build/contracts/Exchange.json'
```

2. Add the exchange to the state, [wallet-template/src/App.js#L32](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/App.js#L42)
```
exchange: null, // exchange contract
```

3. Create the reference object to the deployed exchange, [wallet-template/src/App.js#L73](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/App.js#L89)
```
const exchangeAddress = exchangeArtiacts.networks[netId].address
const exchange = this.web3.eth.contract(exchangeArtiacts.abi).at(exchangeAddress)
this.setState({ exchange })
console.log(exchange)

// Bind to window for testing
window.exchange = exchange
```

4. View the exchange object in the browser developer console.

### END Stage 9: Create the Reference Exchange Object
---
### Stage 10: Create the UI Component to Submit an Order
![Completed](https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Exchange/03-stage-10.png)

#### [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Exchange/03_video_tutorials/03-stage-10.mp4?raw=true)

1. Create the container div, [wallet-template/src/App.js#226](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/App.js#L364)
```
component = <div>
  </div>
```

2. Add the components to load the active accounts, [wallet-template/src/App.js#L227](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/App.js#L365)
```
<h3>Active Account</h3>
<DropDownMenu maxHeight={300} width={500} value={this.state.defaultAccount} onChange={this.handleDropDownChange} >
  {this.state.availableAccounts}
</DropDownMenu>
<h3>Account Balances</h3>
<p className="App-intro">{this.state.ethBalance / 1e18} ETH</p>
<p className="App-intro"> {this.state.tokenBalance / 10**this.state.tokenDecimals} {this.state.tokenSymbol}</p>
<br />
```

3. Add the form to submit an order, [wallet-template/src/App.js#L235](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/App.js#L373)
```
<h3>Submit an Order!</h3>
<p>The default exchange supports only the pairing of {this.state.tokenSymbol} / ETH</p>
<TextField floatingLabelText="Bid" style={{width: 75}} value={this.state.tokenSymbol} />
<TextField floatingLabelText="Amount" style={{width: 75}} value={this.state.bidAmount}
  onChange={(e, bidAmount) => this.setState({ bidAmount })}
/>
<TextField floatingLabelText="Ask" style={{width: 75}} value="ETH" />
<TextField floatingLabelText="Amount" style={{width: 75}} value={this.state.askAmount}
  onChange={(e, askAmount) => this.setState({ askAmount })}
/>
<br />
<RaisedButton label="Submit" labelPosition="after" style={{width: 300}} primary={true} onClick={() => this.submitOrder()}/>
<br />
<br />
```

4. Add the bid and ask amounts to the state, [wallet-template/src/App.js#L31](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/App.js#L39)
```
bidAmount: 10,
askAmount: 1,
```

5. Write the method to submit and order, [wallet-template/src/App.js#L194](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/App.js#L303)
```
/**
 * Submit a new order to the order book.
 */
submitOrder() {
  // First give the exchange the appropriate allowance
  // NOTE if the submitOrder fails the exchange still has the allowance
  this.state.token.approve(
    this.state.exchange.address,
    this.state.bidAmount*10**this.state.tokenDecimals, {
      from: this.web3.eth.accounts[this.state.defaultAccount],
      gas: 1e6
    }, (err, res) => {
      if (err) console.error(err)
      else console.log(res)
      // Submit the order to the exchange
      this.state.exchange.submitOrder(
        this.state.token.address,
        this.state.bidAmount*10**this.state.tokenDecimals,
        '0', // Ether address
        this.state.askAmount*10**18 /* harcoded ETH decimal places */, {
          from: this.web3.eth.accounts[this.state.defaultAccount],
          gas: 1e6
        }, (err, res) => {
          if (err) console.error(err)
          else console.log(res)
        }
      )
  })
}
```

6. Mint tokens to ensure the account has a sufficient token balance.

7. Submit an order and view the transaction hashes(approve and submitOrder) in the browser developer console.

### END Stage 10: Create the UI Component to Submit an Order
---


### Stage X:
![Completed](https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Exchange/03-stage-9.png)

#### [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Exchange/03_video_tutorials/03-stage-6.mp4?raw=true)

1.

### END Stage X:
---

  - create ui form to submit an order
    - add bid and ask amount to the state
    - add on change method to set the bid and ask amount
  - create submitOrder method to submit orders

- create listener for order submitted

- add a list of orders to the state
  - orderBook: []

- Order book table
  - Add table and table react components
  - Add the table div

- Add the addOrder method
- Call it when the orderSubmitted event fires
- add the Font Icon element from material

- on check change set selected order to execute!

- add selected order to state

- raised button to execute order

- add execute order method

- order executed event listener

- load the order book via events
  - loadOrderBook method
  - call to it in bottom of componentDidMount

- Update the addOrder to check that the order does not already exist

- convert to metamask

- note won't be able to mint tokens from the browser!  Will need to do a transfer...
  - disable metamask, transfer to that account that re-enable

### Bonus: Extend Your Exchange
TODO:
  - pre-condition checks!  amounts > 0, etc.
  - Integrate error logging pattern in place of requires
  - ERC20 / ETH pairings
  - ERC20 / ERC20 pairings
  - Partial fills, matched by ratio not exact

  - Write tests for the exchange!
  - Move storage of order book off-chain to reduce cost

    TODO
    map the ether to a specific user, therefore they have a balance not
    just the exchange total.
- gas estimation!

- clean up the allowance is the transaction fails

- sort the orders
- allow multiple orders with the same parameters to exist

---
### Clean up

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
