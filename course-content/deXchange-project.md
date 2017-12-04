# Decentralized Exchange Development

## Table of Contents
1. [Stage 1: Restart Your Dev Enviroment and App](#stage-1-restart-your-dev-environment-and-app)
2. [Stage 2: Create the Exchange Contract](#stage-2-create-the-exchange-contract)
3. [Stage 3: Write the submitOrder Method](#stage-3-write-the-submitorder-method)
4. [Stage 4: Test the submitOrder Method](#stage-4-test-the-submitorder-method)
5. [Stage 5: Write the executeOrder Method](#stage-5-write-the-executeorder-method)
6. [Stage 6: Test the executeOrder Method](#stage-6-test-the-executeorder-method)
7. [Stage 7: Add Basic Routing to the DApp](#stage-7-add-basic-routing-to-the-dapp)
8. [Stage 8: Deploy the Exchange](#stage-8-deploy-the-exchange)
9. [Stage 9: Create the Reference Exchange Object](#stage-9-create-the-reference-exchange-object)
10. [Stage 10: Create the UI Component to Submit an Order](#stage-10-create-the-ui-component-to-submit-an-order)
11. [Stage 11: Listen for Submitted Order Events](#stage-11-listen-for-submitted-order-events)
12. [Stage 12: Create the Order Book Table](#stage-12-create-the-order-book-table)
13. [Stage 13: Add an Order Element to the Table When Submitted](#stage-13-add-an-order-element-to-the-table-when-submitted)
14. [Stage 14: Select and Execute an Order](#stage-14-select-and-execute-an-order)
15. [Stage 15: Load the Order Book](#stage-15-load-the-order-book)
16. [Bonus: Extend Your Exchange](#bonus-extend-your-exchange)
17. [Clean up](#clean-up)
---
### Stage 1: Restart Your Dev Environment and App
![Completed](https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Exchange/03-stage-1.png)

*Begin instructions in a fresh terminal instance.  Not within any existing window manager, ie. screen or tmux.*

#### [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Exchange/03_video_tutorials/03-stage-1.mp4?raw=true)

__Docker Machine ONLY__
- Double-click the `Docker QuickStart` icon on your Desktop to restart docker machine.
- Execute everything following from within the Docker shell.

__1. Start your container back up__
```
docker start blg-env
```
- *Example output:*
```
adam@adam:~$ docker start blg-env
blg-env
adam@adam:~$
```

__2. Attach into your container__

*Container will serve as your virtual environment.*
```
docker exec -it blg-env bash
```
- *Example output:*
```
adam@adam:~$ docker exec -it blg-env bash
root@9c52f3787e28:/blg/wallet-template#
```

__3. Start up your window manager, tmux__
```
tmux
```
- *Example output:*
```
root@a75baed9ceba:/blg/wallet-template#
```

__4. Start the app__
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

__5. Create a new window, Ethereum client__

*ctrl AND b THEN c*
```
ctrl+b c  
```
- *Example output: Result in new empty window, in same directory.*
```
#
```

__6. Start up your Ethereum client, testrpc__
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

__7. Create a new window, Truffle__

*ctrl AND b THEN c*
```
ctrl+b c  
```
- *Example output: Result in new empty window, in same directory.*
```
#
```

__8. Deploy your Token__
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

__9. Load the app in chrome, [localhost:3000](http://localhost:3000/)__

### END Stage 1: Restart Your Dev Environment and App
---
### Stage 2: Create the Exchange Contract
#### [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Exchange/03_video_tutorials/03-stage-2.mp4?raw=true)

__1. Create a new file wallet-template/src/contracts/Exchange.sol__
```
Exchange.sol
```

__2. Copy [Exchange Template](https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/exercises/ExchangeTemplate.sol) into the new file, wallet-template/src/contracts/Exchange.sol.__

__3. Review the contents of the provided template.__

### END Stage 2: Create the Exchange Contract
---
### Stage 3: Write the submitOrder Method
#### [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Exchange/03_video_tutorials/03-stage-3.mp4?raw=true)

__1. Ensure the exchange has been given a sufficient token allowance [wallet-template/src/contracts/Exchange.sol#L61](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/c40e4f3bf96f36c0adc5d0f26084192d568e1c8f/src/contracts/Exchange.sol#L61).__
```
require(ERC20(_bidToken).allowance(msg.sender, this) >= _bidAmount);
```

__2. Compute a `unique` id for the order, [wallet-template/src/contracts/Exchange.sol#L66](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/5423f063a28d13328297a9eda0b274ff2e506159/src/contracts/Exchange.sol#L66)__
```
bytes32 orderId = keccak256(msg.sender, _bidToken, _bidAmount, _askToken, _askAmount);
```

__3. Confirm this order does not already exist, [wallet-template/src/contracts/Exchange.sol#L67](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/c40e4f3bf96f36c0adc5d0f26084192d568e1c8f/src/contracts/Exchange.sol#L67)__
```
require(orderBook_[orderId].askAmount == 0); // check for existence, default to 0, assume no one is giving tokens away for free
```

__4. Add the order to the order book, [wallet-template/src/contracts/Exchange.sol#L72](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/c40e4f3bf96f36c0adc5d0f26084192d568e1c8f/src/contracts/Exchange.sol#L72)__
```
orderBook_[orderId] = Order({
  maker: msg.sender,
  bidToken: _bidToken,
  bidAmount: _bidAmount,
  askToken: _askToken,
  askAmount: _askAmount
});
```

__5. Emit the order submitted event, [wallet-template/src/contracts/Exchange.sol#L83](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/c40e4f3bf96f36c0adc5d0f26084192d568e1c8f/src/contracts/Exchange.sol#L83)__
```
LogOrderSubmitted(orderId, msg.sender, _bidToken,_bidAmount, _askToken, _askAmount);
```

### END Stage 3: Write the submitOrder Method
---
### Stage 4: Test the submitOrder Method
#### [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Exchange/03_video_tutorials/03-stage-4.mp4?raw=true)

__1. Create a new file wallet-template/src/test/test_submit_executeOrder.js__
```
test_submit_executeOrder.js
```

__2. Copy the [test template](https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/exercises/test_submit_executeOrder-template.js) into wallet-template/src/test/test_submit_executeOrder.js__

__Test Setup__

__3. Define the accounts to be used, maker and taker, [wallet-template/src/test/test_submit_executeOrder.js#L12](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/test/test_submit_executeOrder.js#L12)__
```
const maker = accounts[0]
const taker = accounts[1]
```

__4. Deploy a new exchange and token in the test case, [wallet-template/src/test/test_submit_executeOrder.js#L19](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/test/test_submit_executeOrder.js#L19)__
```
exchange = await Exchange.new()
token = await Token.new({ from: maker })
```

__5. Define the order parameters, [wallet-template/src/test/test_submit_executeOrder.js#L25](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/test/test_submit_executeOrder.js#L25)__
```
const bidToken = token.address
const bidAmount = 1
const askToken = 0
const askAmount = 100
```

__6. Setup the transaction by minting tokens to the maker and giving allowance to the exchange, [wallet-template/src/test/test_submit_executeOrder.js#L33](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/test/test_submit_executeOrder.js#L33)__
```
await token.mint(maker, bidAmount, { from: maker });
await token.approve(exchange.address, bidAmount, { from: maker })
```

__7. Send the transaction submitting the order, [wallet-template/src/test/test_submit_executeOrder.js#L39](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/test/test_submit_executeOrder.js#L39)__
```
const tx = await exchange.submitOrder(bidToken, bidAmount, askToken, askAmount, {
    from: maker,
    gas : 4e6
  }
)
```

__Assertions__

__8. Confirm the correct event emitted, [wallet-template/src/test/test_submit_executeOrder.js#L48](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/test/test_submit_executeOrder.js#L48)__
```
const log = tx.logs[0]
assert.equal(log.event, 'LogOrderSubmitted', 'Event not emitted')
```

__9. Confirm the order stored on-chain is correct, [wallet-template/src/test/test_submit_executeOrder.js#L54](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/test/test_submit_executeOrder.js#L54)__
```
orderId = tx.logs[0].args.id
const order = await exchange.orderBook_(orderId)
assert.equal(order[0], maker, 'maker incorrect')
assert.equal(order[1], bidToken, 'bid token incorrect')
assert.equal(order[2], bidAmount, 'bid amount incorrect')
assert.equal(order[3], askToken, 'ask token incorrect')
assert.equal(order[4], askAmount, 'ask amount incorrect')
```

__10. Execute the test and confirm it is passing!__
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

__1. Load the order struct into memory(will save gas cost for subsequent reads), [wallet-template/src/contracts/Exchange.sol#L98](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/contracts/Exchange.sol#L98)__
```
Order memory order = orderBook_[_orderId];
```

__2. Confirm enough ether was sent with the transaction to fill the order, [wallet-template/src/contracts/Exchange.sol#L103](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/contracts/Exchange.sol#L103)__
```
require(msg.value == order.askAmount);
```

__3. Execute the trade.__
  - Moving ether to the maker, [wallet-template/src/contracts/Exchange.sol#L108](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/contracts/Exchange.sol#L108)
  ```
  order.maker.transfer(order.askAmount);
  ```
  - AND tokens to the taker, [wallet-template/src/contracts/Exchange.sol#L109](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/contracts/Exchange.sol#L109)
  ```
  require(ERC20(order.bidToken).transferFrom(order.maker, msg.sender, order.bidAmount));
  ```

__4.  Remove the filled order from the order book, [wallet-template/src/contracts/Exchange.sol#L114](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/contracts/Exchange.sol#L114)__
```
delete orderBook_[_orderId];
```

__5. Emit the order executed event, [wallet-template/src/contracts/Exchange.sol#L119](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/contracts/Exchange.sol#L119)__
```
LogOrderExecuted(_orderId, order.maker, msg.sender, order.bidToken, order.bidAmount, order.askToken, order.askAmount);
```
### END Stage 5: Write the executeOrder Method
---
### Stage 6: Test the executeOrder Method
#### [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Exchange/03_video_tutorials/03-stage-6.mp4?raw=true)

__Test Setup__

__1. Get the initial ether balances for both accounts, [wallet-template/src/test/test_submit_executeOrder.js#L67](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/test/test_submit_executeOrder.js#L67)__
```
const makerBalanceBefore = web3.eth.getBalance(maker).toNumber()
const takerBalanceBefore = web3.eth.getBalance(taker).toNumber()
```

__2. Submit the transaction to execute the order, [wallet-template/src/test/test_submit_executeOrder.js#L73](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/test/test_submit_executeOrder.js#L73)__
```
const tx = await exchange.executeOrder(orderId, {
    from: taker,
    gas : 4e6,
    value: 100 // ask amount from previously submitted order
  }
)
```

__Assertions__

__3. Confirm the execute order event emitted, [wallet-template/src/test/test_submit_executeOrder.js#L83](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/test/test_submit_executeOrder.js#L83)__
```
const log = tx.logs[0]
assert.equal(log.event, 'LogOrderExecuted', 'Event not emitted')
```

__4. Confirm the token balances updated correctly, [wallet-template/src/test/test_submit_executeOrder.js#L89](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/test/test_submit_executeOrder.js#L89)__
```
const makerTokenBalance = (await token.balanceOf(maker)).toNumber()
const takerTokenBalance = (await token.balanceOf(taker)).toNumber()
assert.equal(makerTokenBalance, 0, 'Maker token balance incorrect.')
assert.equal(takerTokenBalance, 1, 'Taker token balance incorrect.')
```

__5. Confirm the ether balances updated correctly, [wallet-template/src/test/test_submit_executeOrder.js#L97](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/test/test_submit_executeOrder.js#L97)__
```
const makerBalanceAfter = web3.eth.getBalance(maker).toNumber()
const takerBalanceAfter = web3.eth.getBalance(taker).toNumber()
assert.equal(makerBalanceAfter, makerBalanceBefore + 100, 'Maker eth balance incorrect')
// Note taker also had to pay for the executeOrder tx
assert.isBelow(takerBalanceAfter, takerBalanceBefore - 100, 'Taker eth balance incorrect')
```

__6. Confirm the order was removed from the order book, [wallet-template/src/test/test_submit_executeOrder.js#L106](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/test/test_submit_executeOrder.js#L106)__
```
const order = await exchange.orderBook_(orderId)
assert.equal(order[4], 0)
```

__7. Execute the test and confirm it is passing!__
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

__1. Add # based routing to render the exchange component, [wallet-template/src/App.js#L215](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/App.js#L363)__
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

__2. Confirm the routing is working, open [localhost:3000/#exchange](http://localhost:3000/#exchange)__

### END Stage 7: Add Basic Routing to the DApp
---
### Stage 8: Deploy the Exchange
#### [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Exchange/03_video_tutorials/03-stage-8.mp4?raw=true)

__1. Add the exchange to the deployment script, [wallet-template/master/src/migrations/2_deploy_contracts.js](https://raw.githubusercontent.com/Blockchain-Learning-Group/exchange-eod3/master/src/migrations/2_deploy_contracts.js)__
```
const Token = artifacts.require("./Token.sol");
const Exchange = artifacts.require("./Exchange.sol");
const owner = web3.eth.accounts[0]

module.exports = deployer => {
  deployer.deploy(Token, { from: owner, gas: 4e6 })
  deployer.deploy(Exchange, { from: owner, gas: 4e6 })
}
```

__2. Deploy the exchange and a new token.__
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

__1. Import the exchange build artifacts, [wallet-template/src/App.js#L15](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/App.js#L23)__
```
import exchangeArtiacts from './build/contracts/Exchange.json'
```

__2. Add the exchange to the state, [wallet-template/src/App.js#L32](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/App.js#L42)__
```
exchange: null, // exchange contract
```

__3. Create the reference object to the deployed exchange, [wallet-template/src/App.js#L73](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/App.js#L89)__
```
const exchangeAddress = exchangeArtiacts.networks[netId].address
const exchange = this.web3.eth.contract(exchangeArtiacts.abi).at(exchangeAddress)
this.setState({ exchange })
console.log(exchange)

// Bind to window for testing
window.exchange = exchange
```

__4. View the exchange object in the browser developer console.__

### END Stage 9: Create the Reference Exchange Object
---
### Stage 10: Create the UI Component to Submit an Order
![Completed](https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Exchange/03-stage-10.png)

#### [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Exchange/03_video_tutorials/03-stage-10.mp4?raw=true)

__1. Create the container div, [wallet-template/src/App.js#226](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/App.js#L364)__
```
component = <div>
  </div>
```

__2. Add the components to load the active accounts, [wallet-template/src/App.js#L227](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/App.js#L365)__
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

__3. Add the form to submit an order, [wallet-template/src/App.js#L235](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/App.js#L373)__
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

__4. Add the bid and ask amounts to the state, [wallet-template/src/App.js#L31](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/App.js#L39)__
```
bidAmount: 10,
askAmount: 1,
```

__5. Write the method to submit an order, [wallet-template/src/App.js#L194](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/App.js#L303)__
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

__6. Mint tokens to ensure the account has a sufficient token balance.__

__7. Submit an order and view the transaction hashes(approve and submitOrder) in the browser developer console.__

### END Stage 10: Create the UI Component to Submit an Order
---
### Stage 11: Listen for Submitted Order Events
![Completed](https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Exchange/03-stage-11.png)

#### [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Exchange/03_video_tutorials/03-stage-11.mp4?raw=true)

__1. Create an event listener for the order submitted event, [wallet-template/src/App.js#L170](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/App.js#L230)__
```
this.state.exchange.LogOrderSubmitted({ fromBlock: 'latest', toBlock: 'latest' })
.watch((err, res) => {
  console.log(`Order submitted! TxHash: https://kovan.etherscan.io/tx/${res.transactionHash}`)
  this.loadAccountBalances(this.web3.eth.accounts[this.state.defaultAccount])
})
```

__2. Submit an order and view the caught event.__

__3. Submit a duplicate order and view the error response.__

### END Stage 11: Listen for Submitted Order Events
---
### Stage 12: Create the Order Book Table
![Completed](https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Exchange/03-stage-12.png)

#### [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Exchange/03_video_tutorials/03-stage-12.mp4?raw=true)

__1. Import Material UI table components, [wallet-template/src/App.js#L12](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/App.js#L12)__
```
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
```

__2. Add the order book to the state, [wallet-template/src/App.js#L43](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/27b87d56d8d1ed6822728afe9b6d1eb157639135/src/App.js#L43)__
```
orderBook: [],
```

__3. Add the order book component, [wallet-template/src/App.js#L296](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/5423f063a28d13328297a9eda0b274ff2e506159/src/App.js#L387)__
```
<h3>Order Book</h3>
<p>Select an order to execute!</p>
<RaisedButton label="Execute Order" labelPosition="after" style={{width: 500}} primary={true}
  onClick={() => this.executeOrder(this.selectedOrder)}
/>
<Table style={{ maxHeight: 500, overflow: "auto" }} fixedHeader={true} multiSelectable={false} onRowSelection={r => { if (this.state.orderBook[r[0]]) this.selectedOrder = this.state.orderBook[r[0]].key}}>
  <TableHeader>
    <TableRow>
      <TableHeaderColumn>Maker</TableHeaderColumn>
      <TableHeaderColumn>Bid Token</TableHeaderColumn>
      <TableHeaderColumn>Bid Amount</TableHeaderColumn>
      <TableHeaderColumn>Ask Token</TableHeaderColumn>
      <TableHeaderColumn>Ask Amount</TableHeaderColumn>
    </TableRow>
  </TableHeader>
  <TableBody> { this.state.orderBook } </TableBody>
</Table>
```

__4. View new order book table in the ui.__

### END Stage 12: Create the Order Book Table
---
### Stage 13: Add an Order Element to the Table When Submitted
![Completed](https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Exchange/03-stage-13.png)

#### [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Exchange/03_video_tutorials/03-stage-13.mp4?raw=true)

__1. Create an addOrder method, [wallet-template/src/App.js#L127](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/5423f063a28d13328297a9eda0b274ff2e506159/src/App.js#L138)__
```
/**
 * Add a new order to the oder book
 * @param {Object} order The log object emitted by the exchange.
 */
addOrder(order) {
  // Confirm this order is not already present
  for (let i = 0; i < this.state.orderBook.length; i++) {
    if (this.state.orderBook[i].key === order.id) {
      return
    }
  }
  // NOTE eth only supported as ask token
  // TODO support multiple tokens and pairings
  this.setState({
    orderBook: [
    <TableRow key={order.id}>
        <TableRowColumn>{order.maker}</TableRowColumn>
        <TableRowColumn>{this.state.tokenSymbol}</TableRowColumn>
        <TableRowColumn>{order.bidAmount.toNumber() / 10**this.state.tokenDecimals}</TableRowColumn>
        <TableRowColumn>ETH</TableRowColumn>
        <TableRowColumn>{order.askAmount.toNumber() / 10**18 }</TableRowColumn>
      </TableRow>
    ].concat(this.state.orderBook)
  })
}
```

__2. Add the order to the order book when the order submitted event fired, [wallet-template/src/App.js#208](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/0779b46516bc5c697c5fb986cad1080b8c8121af/src/App.js#L233)__
```
this.addOrder(res.args)
```

__3. Submit an order and view it added to the order book.__

### END Stage 13: Add an Order Element to the Table When Submitted
---
### Stage 14: Select and Execute an Order
![Completed](https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Exchange/03-stage-14.png)

#### [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Exchange/03_video_tutorials/03-stage-14.mp4?raw=true)

__1. Add a selectedOrder to the state, [wallet-template/src/App.js#L44](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/0779b46516bc5c697c5fb986cad1080b8c8121af/src/App.js#L44)__
```
selectedOrder: null
```

__2. Add a method to execute the selected order, [wallet-template/src/App.js#L154](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/0779b46516bc5c697c5fb986cad1080b8c8121af/src/App.js#L164)__
```
/**
 * Execute a selected order.
 * @param {String} orderId The 32 byte hash of the order params representing its unique id.
 */
executeOrder(orderId) {
  // Get the ask amount of the order, ether to send along with the tx
  this.state.exchange.orderBook_(orderId, (err, order) => {
    this.state.exchange.executeOrder(orderId, {
      from: this.web3.eth.accounts[this.state.defaultAccount],
      gas: 4e6,
      value: order[4] // askAmount of maker order
    }, (err, res) => {
      if (err) console.error(err)
      else console.log(res)
    })
  })
}
```

__3. Add an event to listen for executed orders, [wallet-template/src/App.js#L231](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/0779b46516bc5c697c5fb986cad1080b8c8121af/src/App.js#L237)__
```
this.state.exchange.LogOrderExecuted({ fromBlock: 'latest', toBlock: 'latest' })
.watch((err, res) => {
  console.log(`Order Executed! TxHash: https://kovan.etherscan.io/tx/${res.transactionHash}`)
  this.removeOrder(res.args.id)
  this.loadAccountBalances(this.web3.eth.accounts[this.state.defaultAccount])
})
```

__4. Add the method to remove the order from the order book table, [wallet-template/src/App.js#L262](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/0779b46516bc5c697c5fb986cad1080b8c8121af/src/App.js#L288)__
```
/**
 * Remove an order from the orderBook.
 * @param {String} orderId The 32 byte hash of the order params representing its unique id.
 */
removeOrder(orderId) {
  for (let i = 0; i < this.state.orderBook.length; i++) {
    if (this.state.orderBook[i].key === orderId) {
      // Slice this index from the current order book and update
      let updatedOrderBook = this.state.orderBook.slice();
      updatedOrderBook.splice(i, 1);
      this.setState({ orderBook: updatedOrderBook })
      break
    }
  }
}
```

__5. Execute an order and see that it has been removed from the table.__

### END Stage 14: Select and Execute an Order
---
### Stage 15: Load the Order Book
![Completed](https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Exchange/03-stage-15.png)

#### [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Exchange/03_video_tutorials/03-stage-15.mp4?raw=true)

__1. Add a method to load the order book, [wallet-template/src/App.js#L239](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/0779b46516bc5c697c5fb986cad1080b8c8121af/src/App.js#L248)__
```
/**
 * Load all orders into the order book via exchange events
 */
loadOrderBook() {
  this.state.exchange.LogOrderSubmitted({}, {fromBlock: 0, toBlock: 'latest'})
  .get((err, orders) => {
    for (let i = 0; i < orders.length; i++) {
      // confirm the order still exists then append to table
      this.state.exchange.orderBook_(orders[i].args.id, (err, order) => {
        if (order[4].toNumber() !== 0)
          this.addOrder(orders[i].args)
      })
    }
  })
}
```

__2. Load the order book when the page renders, [wallet-template/src/App.js#L119](https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/0779b46516bc5c697c5fb986cad1080b8c8121af/src/App.js#L123)__
```
this.loadOrderBook()
```

__3. View the loaded orders in the order book table.__

__Success your exchange running locally is complete! Try it out!__

### END Stage 15: Load the Order Book
---
### Bonus: Extend Your Exchange
1. Connect to another participant's exchange, updating the address to create the reference object at.
2. Pre-condition checks!  amounts > 0, etc.
3. Integrate error logging pattern in place of requires
4. Add other ERC20 / ETH pairings
5. Enable ERC20 / ERC20 pairings
6. Automated order matching, partial fills, matched by ratio not user selected.
7. Write tests for the exchange
8. Update gas amounts sent with each transaction.  Leverage web3's gas estimation!
9. Slean up the allowance if the order submission transaction fails
10. Sort the orders in the order book table
---
### Clean up

#### [Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Wallet/02_video_tutorials/03-stage-cleanup.mp4?raw=true)

__1. Detach from your tmux session__

*ctrl AND b THEN d*
```
ctrl+b d
```

__2. Detach from the container__
```
ctrl+d
```

__3. Stop the container__
```
docker stop blg-env
```
- *Example output:*
```
adam@adam:~/$ docker stop blg-env
blg-env
adam@adam:~/$
```
