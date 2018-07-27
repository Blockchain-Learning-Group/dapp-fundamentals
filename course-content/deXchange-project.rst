=============================
DeXchange Development Project
=============================

Stage 1: Restart Your Dev Environment and App
=============================================

.. note::
  Begin instructions in a fresh terminal instance.  Not within any existing window manager, ie. screen or tmux.

`Video Tutorial <https://drive.google.com/open?id=1OAUN_EmUnCAD0ZSjx5Q7_5R-7ZKd4O5n>`_

.. attention::
  Docker Machine ONLY - if Docker shell exited
    - Double-click the `Docker QuickStart` icon on your Desktop to restart docker machine.
    - Execute everything following from within the Docker shell.

1. Start your container back up
-------------------------------

- Confirm container is not already running

.. code-block:: bash

  docker ps

- *Example output: Container IS running*

.. code-block:: bash

  CONTAINER ID        IMAGE                       COMMAND             CREATED             STATUS              PORTS                                            NAMES
  fabb387d8088        blockchainlg/dapp-dev-env   "node"              15 hours ago        Up 15 hours         0.0.0.0:3000->3000/tcp, 0.0.0.0:8545->8545/tcp   blg-env

- *Example output: Container is NOT running*

.. code-block:: bash

  CONTAINER ID        IMAGE                       COMMAND             CREATED             STATUS              PORTS                                            NAMES

**If the conainter is NOT running continue, else move to step 2**

.. code-block:: bash

  docker start blg-env

- *Example output:*

.. code-block:: bash

  adam@adam:~$ docker start blg-env
  blg-env
  adam@adam:~$

2. Attach into your container
-----------------------------------------------

*Container will serve as your virtual environment.*

.. code-block:: bash

  docker exec -it blg-env bash

- *Example output:*

.. code-block:: bash

  adam@adam:~$ docker exec -it blg-env bash
  root@9c52f3787e28:/blg/wallet-template#

3. Start the app
-----------------------------------------------

.. code-block:: bash

  CHOKIDAR_USEPOLLING=true yarn start

- *Example output:*

.. code-block:: console

  # CHOKIDAR_USEPOLLING=true yarn start
  yarn run v1.2.0
  $ react-scripts start
  Starting the development server...

  Compiled successfully!

  You can now view my-app in the browser.

    Local:            http://localhost:3000/
    On Your Network:  http://172.17.0.2:3000/

  Note that the development build is not optimized.
  To create a production build, use yarn build.

4. Create a new tab in your terminal window or a new terminal window for our Ethereum client
--------------------------------------------------------------------------------------------

.. note::
  While within the terminal window select File -> Open Terminal to create a new window.

  To create a new tab from within a terminal window:

  .. code-block:: bash

    ctrl+shft+t

- *Example output: Result is a new empty terminal, in the same directory you were when you initially entered your container. This will push you out of the container.*

.. code-block:: console

  adam@adam:~/Desktop/blg$

5. Attach back into the container and start Etheruem node
---------------------------------------------------------
.. code-block:: bash

  docker exec -it blg-env bash

- *Example output:*

.. code-block:: console

  adam@adam:~/Desktop/blg$ docker exec -it blg-env bash
  root@182d123ec039:/blg/wallet-template#

- start the node(emulator)

.. code-block:: bash

  ganache-cli

- *Example output:*

.. code-block:: console

  root@182d123ec039:/blg/wallet-template# ganache-cli
  Ganache CLI v6.0.3 (ganache-core: 2.0.2)
  [...]
  Listening on localhost:8545

6. Create a new window or tab for our Truffle commands
------------------------------------------------------

.. note::
  While within the terminal window select File -> Open Terminal to create a new window.

  To create a new tab from within a terminal window:

  .. code-block:: bash

    ctrl+shft+t

- *Example output: Result is a new empty terminal, in the same directory you were when you initially entered your container. This will push you out of the container.*

.. code-block:: console

  adam@adam:~/Desktop/blg$

- Attach back into the container

.. code-block:: bash

  docker exec -it blg-env bash

- *Example output:*

.. code-block:: console

  adam@adam:~/Desktop/blg$ docker exec -it blg-env bash
  root@182d123ec039:/blg/wallet-template#

7. Deploy your Token
-----------------------------------------------

.. code-block:: bash

  cd src && truffle migrate

- *Example output:*

.. code-block:: console

  root@182d123ec039:/blg/wallet-template# cd src && truffle migrate
  Using network 'development'.

  Running migration: 1_initial_migration.js
    Deploying Migrations...
    [..]
    Deploying Token...
    Token: 0xd58c6b5e848d70fd94693a370045968c0bc762a7
    [..]
  Saving artifacts...
  #

10. Load the app in chrome, `localhost:3000 <http://localhost:3000/>`_
-----------------------------------------------

**END Stage 1: Restart Your Dev Environment and App**

----

Stage 2: Create the Exchange Contract
=====================================

`Video Tutorial <https://drive.google.com/open?id=1AF3ivpmyaWRlVbcFTrkyeF4EdoyTMqzt>`_

1. Create a new file `line
---------------------------------------------------------------
::

  Exchange.sol

2. Copy `Exchange Template <https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/exercises/Exchange.sol>`_ into the new file, wallet-template/src/contracts/Exchange.sol
-----------------------------------------------

3. Review the contents of the provided template.
-----------------------------------------------

**END Stage 2: Create the Exchange Contract**

----

Stage 3: Write the submitOrder Method
=====================================

`Video Tutorial <https://drive.google.com/open?id=17tk8rhkojU7mgxl2xbvIZLBf0ZvgJ5Ca>`_

1. Ensure the exchange has been given a sufficient token allowance, line 31
-----------------------------------------------

::

  require(Token(_bidToken).allowance(msg.sender, this) >= _bidAmount, "Insufficient allowance given.");

2. Compute a ``unique`` id for the order, line 34
-----------------------------------------------

::

  bytes32 orderId = keccak256(msg.sender, _bidToken, _bidAmount, _askToken, _askAmount);

3. Confirm this order does not already exist, line 35
-----------------------------------------------

::

  require(orderBook_[orderId].askAmount == 0, "Order already exists."); // check for existence, default to 0, assume no one is giving tokens away for free

4. Add the order to the order book, line 38-44
-----------------------------------------------

::

  orderBook_[orderId] = Order({
    maker: msg.sender,
    bidToken: _bidToken,
    bidAmount: _bidAmount,
    askToken: _askToken,
    askAmount: _askAmount
  });


5. Emit the order submitted event, line 47
-----------------------------------------------

::

  emit OrderSubmitted(orderId, msg.sender, _bidToken,_bidAmount, _askToken, _askAmount);

**END Stage 3: Write the submitOrder Method**

----

Stage 4: Test the submitOrder Method
=========================================

`Video Tutorial <https://drive.google.com/open?id=1q8o3AwNVX7KFkx2ge5hF9rqHAmFGxnaN>`_

1. Create a new file wallet-template/src/test/test_submit_executeOrder.js
-----------------------------------------------

.. code-block:: javascript

  test_submit_executeOrder.js

2. Copy the `test template <https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/exercises/test_submit_executeOrder-template.js>`_ into wallet-template/src/test/test_submit_executeOrder.js
-----------------------------------------------

**Test Setup**

3. Define the accounts to be used, maker and taker, line 12-13
-----------------------------------------------

.. code-block:: javascript

  const maker = accounts[0]
  const taker = accounts[1]

4. Deploy a new exchange and token in the test case, line 19-20
-----------------------------------------------

.. code-block:: javascript

  exchange = await Exchange.new()
  token = await Token.new()

5. Define the order parameters, line 25-29
-----------------------------------------------

.. code-block:: javascript

  const rate = await token.rate()
  const bidToken = token.address
  const bidAmount = 100
  const askToken = 0
  const askAmount = 100

6. Setup the transaction by minting tokens to the maker and giving allowance to the exchange, line 34-35
-----------------------------------------------

.. code-block:: javascript

  await token.buy({ from: maker, value: bidAmount / rate });
  await token.approve(exchange.address, bidAmount, { from: maker })

7. Send the transaction submitting the order, line 40-44
-----------------------------------------------

.. code-block:: javascript

  const tx = await exchange.submitOrder(bidToken, bidAmount, askToken, askAmount, {
      from: maker,
      gas : 4e6
    }
  )

**Assertions**

8. Confirm the correct event emitted, line 49-50
-----------------------------------------------

.. code-block:: javascript

  const log = tx.logs[0]
  assert.equal(log.event, 'OrderSubmitted', 'Event not emitted')

9. Confirm the order stored on-chain is correct, line 55-61
-----------------------------------------------

.. code-block:: javascript

  orderId = tx.logs[0].args.id
  const order = await exchange.orderBook_(orderId)
  assert.equal(order[0], maker, 'maker incorrect')
  assert.equal(order[1], bidToken, 'bid token incorrect')
  assert.equal(order[2], bidAmount, 'bid amount incorrect')
  assert.equal(order[3], askToken, 'ask token incorrect')
  assert.equal(order[4], askAmount, 'ask amount incorrect')

10. Execute the test and confirm it is passing!
-----------------------------------------------

.. code-block:: javascript

  truffle test test/test_submit_executeOrder.js

- *Example output:*

.. code-block:: console

  # truffle test test/test_submit_executeOrder.js
  Contract: Token.buy()
  ✓ should buy new tokens. (131ms)

  Contract: Exchange.submitOrder() && executeOrder()
  ✓ submitOrder(), should succeed by adding a new order to the orderBook on-chain. (183ms)
  ✓ executeOrder(), should succeed by trading the tokens. Maker bids ether.


  3 passing (365ms)

    #

**END Stage 4: Test the submitOrder method**

----

Stage 5: Write the executeOrder Method
=========================================

`Video Tutorial <https://drive.google.com/open?id=18WgT4mDWW5EcMUM_BbPACRhZ1gwQYgh9>`_

1. Load the order struct into memory(will save gas cost for subsequent reads), line 53
-----------------------------------------------

::

  Order memory order = orderBook_[_orderId];


2. Confirm enough ether was sent with the transaction to fill the order, line 56
-----------------------------------------------

::

  require(msg.value == order.askAmount);


3. Execute the trade.
-----------------------------------------------
  - Moving ether to the maker, line 59

::

  order.maker.transfer(order.askAmount);  // safe and will throw on failure

- AND tokens to the taker, line 60

::

  require(Token(order.bidToken).transferFrom(order.maker, msg.sender, order.bidAmount), "transferFrom failed.");

4.  Remove the filled order from the order book, line 63
-----------------------------------------------

::

  delete orderBook_[_orderId];

5. Emit the order executed event, line 66
-----------------------------------------------

::

  emit OrderExecuted(_orderId, order.maker, msg.sender, order.bidToken, order.bidAmount, order.askToken, order.askAmount);

**END Stage 5: Write the executeOrder Method**

----

Stage 6: Test the executeOrder Method
=========================================
`Video Tutorial <https://drive.google.com/open?id=10tTq0j0antqHE-N9YjS9RYpM3oK34HrW>`_

**Test Setup**

1. Get the initial ether balances for both accounts, line 68-69
-----------------------------------------------

.. code-block:: javascript

  const makerBalanceBefore = web3.eth.getBalance(maker).toNumber()
  const takerBalanceBefore = web3.eth.getBalance(taker).toNumber()

2. Submit the transaction to execute the order, line 74-79
-----------------------------------------------

.. code-block:: javascript

  const tx = await exchange.executeOrder(orderId, {
      from: taker,
      gas : 4e6,
      value: 100 // ask amount from previously submitted order
    }
  )

**Assertions**

3. Confirm the execute order event emitted, line 84-85
-----------------------------------------------

.. code-block:: javascript

  const log = tx.logs[0]
  assert.equal(log.event, 'OrderExecuted', 'Event not emitted')

4. Confirm the token balances updated correctly, line 90-93
-----------------------------------------------

.. code-block:: javascript

  const makerTokenBalance = (await token.balanceOf(maker)).toNumber()
  const takerTokenBalance = (await token.balanceOf(taker)).toNumber()
  assert.equal(makerTokenBalance, 0, 'Maker token balance incorrect.')
  assert.equal(takerTokenBalance, 100, 'Taker token balance incorrect.')

5. Confirm the ether balances updated correctly, line 98-102
-----------------------------------------------

.. code-block:: javascript

  const makerBalanceAfter = web3.eth.getBalance(maker).toNumber()
  const takerBalanceAfter = web3.eth.getBalance(taker).toNumber()
  assert.equal(makerBalanceAfter, makerBalanceBefore + 100, 'Maker eth balance incorrect')
  // Note taker also had to pay for the executeOrder tx
  assert.isBelow(takerBalanceAfter, takerBalanceBefore - 100, 'Taker eth balance incorrect')

6. Confirm the order was removed from the order book, line 107-108
-----------------------------------------------

.. code-block:: javascript

  const order = await exchange.orderBook_(orderId)
  assert.equal(order[4], 0)

7. Execute the test and confirm it is passing!
-----------------------------------------------

.. code-block:: bash

  truffle test test/test_submit_executeOrder.js

- *Example output:*

.. code-block:: console

  # truffle test test/test_submit_executeOrder.js
  Contract: Token.buy()
  ✓ should buy new tokens. (116ms)

  Contract: Exchange.submitOrder() && executeOrder()
    ✓ submitOrder(), should succeed by adding a new order to the orderBook on-chain. (298ms)
    ✓ executeOrder(), should succeed by trading the tokens. Maker bids ether. (493ms)


  3 passing (951ms)

  #

  .. success::
    Success, The exchange contract is complete!

**END Stage 6: Test the executeOrder Method**

----

Stage 7: Add Basic Routing to the DApp
=========================================

`Video Tutorial <>`_

1. Add basic routing to render navigate  between the exchange and wallet components
-----------------------------------------------

- Add the ``react-router-dom`` package to the project

.. code-block:: console

  yarn add react-router-dom

- *Example output:*

.. code-block:: console

  root@0121f7449409:/blg# yarn add react-router-dom
  yarn add v1.2.0
  [1/4] Resolving packages...
  [..]
  Done in 5.34s.
  root@0121f7449409:/blg#

- Import the router components into the app, line 2

.. code-block:: javascript

  import { BrowserRouter, Route, Link } from 'react-router-dom'

- Wrap components with the router, line 173 & line 180

  .. code-block:: javascript

    <BrowserRouter>  line 173
    <BrowserRouter/> line 180

- Add a button to navigate to the exchange route, line 137-139

.. code-block:: javascript

  <Link to={'exchange'}>
    <RaisedButton label=">>> Exchange" secondary={true} fullWidth={true}/>
  </Link>

- Confirm selection of the new button will change the route in the url to ``/exchange``

2. Create the exchange component and the routes
-----------------------------------------------

- Add a template exchange component with a link back to the wallet, line 174-178

  .. code-block:: javascript

    const exchange = <div>
      <Link to={'/'}>
        <RaisedButton label="Wallet <<<" primary={true} fullWidth={true}/>
      </Link>
    </div>

- Add a default route, line 187

.. code-block:: javascript

    <Route exact={true} path="/" render={() => component}/>

- And an exchange route, line 188

.. code-block:: javascript

    <Route exact={true} path="/exchange" render={() => exchange}></Route>

**END Stage 7: Add Basic Routing to the DApp**

----

Stage 8: Deploy the Exchange
=========================================

`Video Tutorial <>`_

1. Add the exchange to the deployment script, line
-----------------------------------------------

.. code-block:: javascript

  const Token = artifacts.require("./Token.sol");
  const Exchange = artifacts.require("./Exchange.sol");
  const owner = web3.eth.accounts[0]

  module.exports = deployer => {
    deployer.deploy(Token, { from: owner, gas: 4e6 })
    deployer.deploy(Exchange, { from: owner, gas: 4e6 })
  }

2. Deploy the exchange and a new token.
-----------------------------------------------

.. code-block:: bash

  truffle migrate --reset

- *Example output:*

.. code-block:: console

  # truffle migrate --reset
  Using network 'development'.

  Running migration: 1_initial_migration.js
    Replacing Migrations...
    ... 0xaf3df4616497a63d75879d900ee9bd580881e3d88b359942aa89beb12ff05416
    -----------------------------------------------
    Migrations: 0x4d52502c81f1b7119a59d7a69ca8b061d557e071
  Saving successful migration to network...
    ... 0xa57ed9864bf4a34835ad0f074083030011e9f36aae813b58182f7d8cde8d4571
    -----------------------------------------------
  Saving artifacts...
  Running migration: 2_deploy_contracts.js
    Replacing Token...
    ... 0xfb84339717eebb27f7593d5419633086c6961a46736d9f730185f9584bbca671
    -----------------------------------------------
    Token: 0x1f8fbc989937346cbc923da292b1b6f9f958eafe
    Deploying Exchange...
    ... 0xd4566da630267b7f41a554b3773ea4c2880d98828275632e4c9e6fd7f8d26b03
    -----------------------------------------------
    Exchange: 0xb9d7ffb8c064384f167199025ef2ad0a130c49c6
  Saving successful migration to network...
    ... 0x97f51a0d5d97de1bf4d3f5028783349616fa25e0ddbadadecafe76fb1895189d
    -----------------------------------------------
  Saving artifacts...
  #

**END Stage 8: Deploy the Exchange**

----

Stage 9: Create the Reference Exchange Object
=========================================

`Video Tutorial <>`_

1. Import the exchange build artifacts, line
-----------------------------------------------

.. code-block:: javascript

  import exchangeArtiacts from './build/contracts/Exchange.json'

2. Add the exchange to the state, line
-----------------------------------------------

.. code-block:: javascript

  exchange: null, // exchange contract

3. Create the reference object to the deployed exchange, line
-----------------------------------------------

.. code-block:: javascript

  const exchangeAddress = exchangeArtiacts.networks[netId].address
  const exchange = this.web3.eth.contract(exchangeArtiacts.abi).at(exchangeAddress)
  this.setState({ exchange })
  console.log(exchange)

  // Bind to window for testing
  window.exchange = exchange

4. View the exchange object in the browser developer console.
-----------------------------------------------

**END Stage 9: Create the Reference Exchange Object**

----

Stage 10: Create the UI Component to Submit an Order
=========================================

`Video Tutorial <>`_

1. Create the container div, line
-----------------------------------------------

.. code-block:: html

  component = <div>
    </div>

2. Add the components to load the active accounts, line
-----------------------------------------------

.. code-block:: html

  <h3>Active Account</h3>
  <DropDownMenu maxHeight={300} width={500} value={this.state.defaultAccount} onChange={this.handleDropDownChange} >
    {this.state.availableAccounts}
  </DropDownMenu>
  <h3>Account Balances</h3>
  <p className="App-intro">{this.state.ethBalance / 1e18} ETH</p>
  <p className="App-intro"> {this.state.tokenBalance / 10**this.state.tokenDecimals} {this.state.tokenSymbol}</p>
  <br />


3. Add the form to submit an order, line
-----------------------------------------------

.. code-block:: html

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

4. Add the bid and ask amounts to the state, line
-----------------------------------------------

.. code-block:: javascript

  bidAmount: 10,
  askAmount: 1,

5. Write the method to submit an order, line
-----------------------------------------------

.. code-block:: javascript

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

6. Mint tokens to ensure the account has a sufficient token balance.
-----------------------------------------------

7. Submit an order and view the transaction hashes(approve and submitOrder) in the browser developer console.
-----------------------------------------------

**END Stage 10: Create the UI Component to Submit an Order**

----

Stage 11: Listen for Submitted Order Events
=========================================

`Video Tutorial <>`_

1. Create an event listener for the order submitted event, line
-----------------------------------------------

.. code-block:: javascript

  this.state.exchange.LogOrderSubmitted({ fromBlock: 'latest', toBlock: 'latest' })
  .watch((err, res) => {
    console.log(`Order submitted! TxHash: https://kovan.etherscan.io/tx/${res.transactionHash}`)
    this.loadAccountBalances(this.web3.eth.accounts[this.state.defaultAccount])
  })

2. Submit an order and view the caught event.
-----------------------------------------------

3. Submit a duplicate order and view the error response.
-----------------------------------------------

**END Stage 11: Listen for Submitted Order Events**

----

Stage 12: Create the Order Book Table
=========================================

`Video Tutorial <>`_

1. Import Material UI table components, line
-----------------------------------------------

.. code-block:: javascript

  import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

2. Add the order book to the state, line
-----------------------------------------------

.. code-block:: javascript

  orderBook: [],

3. Add the order book component, line
-----------------------------------------------

.. code-block:: html

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

4. View new order book table in the ui.
-----------------------------------------------

**END Stage 12: Create the Order Book Table**

----

Stage 13: Add an Order Element to the Table When Submitted
=========================================

`Video Tutorial <>`_

1. Create an addOrder method, line
-----------------------------------------------

.. code-block:: javascript

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

2. Add the order to the order book when the order submitted event fired, line
-----------------------------------------------

.. code-block:: javascript

  this.addOrder(res.args)

3. Submit an order and view it added to the order book.
-----------------------------------------------

**END Stage 13: Add an Order Element to the Table When Submitted**

----

Stage 14: Select and Execute an Order
=========================================

`Video Tutorial <>`_

1. Add a selectedOrder to the state, line
-----------------------------------------------

.. code-block:: javascript

  selectedOrder: null

2. Add a method to execute the selected order, line
-----------------------------------------------

.. code-block:: javascript

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

3. Add an event to listen for executed orders, line
-----------------------------------------------

.. code-block:: javascript

  this.state.exchange.LogOrderExecuted({ fromBlock: 'latest', toBlock: 'latest' })
  .watch((err, res) => {
    console.log(`Order Executed! TxHash: https://kovan.etherscan.io/tx/${res.transactionHash}`)
    this.removeOrder(res.args.id)
    this.loadAccountBalances(this.web3.eth.accounts[this.state.defaultAccount])
  })


4. Add the method to remove the order from the order book table, line
-----------------------------------------------

.. code-block:: javascript

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

5. Execute an order and see that it has been removed from the table.
-----------------------------------------------

**END Stage 14: Select and Execute an Order**

----

Stage 15: Load the Order Book
=========================================

`Video Tutorial <>`_

1. Add a method to load the order book, line
-----------------------------------------------

.. code-block:: javascript

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

2. Load the order book when the page renders, line
-----------------------------------------------

.. code-block:: javascript

  this.loadOrderBook()

3. View the loaded orders in the order book table.
-----------------------------------------------

Success your exchange running locally is complete! Try it out!

**END Stage 15: Load the Order Book**

----

Bonus: Extend Your Exchange
===========================
1. Pre-condition checks!  amounts > 0, etc.
-----------------------------------------------
2. Sync a node of your own! Instructions can be found `here <http://blg-dapp-fundamentals.readthedocs.io/en/latest/course-content/blockchain-fundamentals.html#sync-an-ethereum-node-of-your-own>`_
------------------------------------------------------------
3. Integrate error logging pattern in place of requires
-----------------------------------------------
4. Add other ERC20 / ETH pairings
-----------------------------------------------
5. Enable ERC20 / ERC20 pairings
-----------------------------------------------
6. Automated order matching, partial fills, matched by ratio not user selected.
-----------------------------------------------
7. Write tests for the exchange
-----------------------------------------------
8. Update gas amounts sent with each transaction.  Leverage web3's gas estimation!
-----------------------------------------------
9. Slean up the allowance if the order submission transaction fails
-----------------------------------------------
10. Sort the orders in the order book table
-----------------------------------------------

----

Clean up
========

`Video Tutorial <>`_

1. Detach from the container
-----------------------------------------------

.. code-block:: bash

  ctrl+d

2. Stop the container
-----------------------------------------------

.. code-block:: bash

  docker stop blg-env

- *Example output:*

.. code-block:: console

  adam@adam:~/$ docker stop blg-env
  blg-env
  adam@adam:~/$
