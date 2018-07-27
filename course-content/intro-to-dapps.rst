=======================
V2 Introduction to DApp Development
=======================

`View Completed Wallet Demo <https://drive.google.com/open?id=1RRzH5HyAZcdq6d4mCXJ6FRmP1mks179l>`_

----

Stage 1: Dev Enviroment Setup and Application Bootstrap
=======================================================

.. note::
  Begin instructions in a fresh terminal instance.  Not within any existing window manager, ie. screen or tmux.

`Video Tutorial <https://drive.google.com/open?id=1IvYodLeMF929k9hJg7M08_864Qxukecd>`_
------------------------

.. important::
  Replace ``<USERNAME>`` in ALL instructions below with your username. This is your machine's active user and can likely be found here:
    - Linux: ``adam@ubuntu-box:~$``, ``<USERNAME>`` == ``adam``
    - Mac: ``mac-box:~ adam1$``, ``<USERNAME>`` == ``adam1``
    - windows: ``c:\users\adam2>``, ``<USERNAME>`` == ``adam2``
    - docker-machine: ``adam3@DESKTOP-109 MINGW64``, ``<USERNAME>`` == ``adam3``

1. Make a blg directory on your desktop

.. Important::
  This can be done by simply right-clicking on your desktop and creating a new folder named ``blg``.

  If you wish to do so from the command line the commands are as follows:

  *Linux, Mac and Docker Machine*

  .. code-block:: bash

    cd ~/Desktop && mkdir blg

  *Windows*

  .. code-block:: bash

    cd c:\Users\<USERNAME>\desktop && MD blg

  - *Example output:*

  .. code-block:: bash

    adam@adam:/$ cd ~/Desktop && mkdir blg
    adam@adam:~/Desktop$

- Now change into this directory from the command line

*Linux, Mac and Docker Machine*

.. code-block:: bash

  cd ~/Desktop/blg

*Windows*

.. code-block:: bash

  cd c:\Users\<USERNAME>\desktop\blg

2. Clone the wallet template

.. important::
  Make **SURE** you are within the ``blg`` directory before cloning the repo!

.. code-block:: bash

  git clone https://github.com/Blockchain-Learning-Group/wallet-template.git
  cd wallet-template
  git checkout tags/2.0

- *Example output:*

.. code-block:: console

  adam@adam:~/Desktop/blg$ git clone https://github.com/Blockchain-Learning-Group/wallet-template.git
  Cloning into 'wallet-template'...
  [..]
  Unpacking objects: 100% (30/30), done.
  Checking connectivity... done.

  adam@adam:~/Desktop/blg$ cd wallet-template

  adam@adam:~/Desktop/blg/wallet-template$ git checkout tags/2.0
  Note: checking out 'tags/2.0'.
  [...]
  HEAD is now at 16aa5a3...
  adam@adam:~/Desktop/blg/wallet-template$

3. Run your docker container

.. important::
  - Make sure that the path immediately following the ``-v`` flag is correct! ie. ``/home/adam/Desktop/blg``
  - This path must exist on your host and the ``blg`` directory must contain the ``wallet-template`` repo.
  - Also, take extra care and ensure that the path is correct for your OS.

.. attention::
  - If you previously ran the container to confirm the prerequisites were completed then first stop and remove this test container.

  .. code-block:: bash

    docker stop blg-env && docker rm blg-env

  - *Example output:*

  .. code-block:: console

    adam@adam:~/Desktop/blg$ docker stop blg-env && docker rm blg-env
    blg-env
    blg-env
    adam@adam:~/Desktop/blg$

*Linux*

.. code-block:: bash

  docker run -dit -p 3000:3000 -p 8545:8545 -v /home/<USERNAME>/Desktop/blg:/blg --name=blg-env blockchainlg/dapp-dev-env

*Mac*

.. code-block:: bash

  docker run -dit -p 3000:3000 -p 8545:8545 -v /Users/<USERNAME>/Desktop/blg:/blg --name=blg-env blockchainlg/dapp-dev-env

*Windows*
- If you have not already, follow the steps `here <https://rominirani.com/docker-on-windows-mounting-host-directories-d96f3f056a2c>`_ to share your C drive with docker.

.. code-block:: bash

  docker run -dit -p 3000:3000 -p 8545:8545 -v c:/Users/<USERNAME>/desktop/blg:/blg --name=blg-env blockchainlg/dapp-dev-env

*Docker Machine*

.. code-block:: bash

  docker run -dit -p 3000:3000 -p 8545:8545 -v /c/Users/<USERNAME>/Desktop/blg:/blg --name=blg-env blockchainlg/dapp-dev-env

- *Example output:*

.. code-block:: console

  adam@adam:~$ docker run -dit -p 3000:3000 -p 8545:8545 -v /home/adam/Desktop/blg:/blg --name=blg-env blockchainlg/dapp-dev-env
  1bb232a56e6868e2bc4dbeaf86405ec3ed892090809fcab1823cab38e8337dc1
  adam@adam:~$

.. attention::
  **Common Error:**

  .. code-block:: console

    adam@adam:~/Desktop/blg$ docker run -dit -p 3000:3000 -p 8545:8545 -v /home/adam/Desktop/blg:/blg --name=blg-env blockchainlg/dapp-dev-env
    docker: Error response from daemon: Conflict. The container name "/blg-env" is already in use by container "9c52f3787e28c64b197e22ec509fb2a73cd5066543ec6345956e11b6e69ba41c". You have to remove (or rename) that container to be able to reuse that name.
    See 'docker run --help'.

  **Solution:**

  .. code-block:: bash

    docker stop blg-env && docker rm blg-env

  - *Examle Output*

  .. code-block:: console

    adam@adam:~/Desktop/blg$ docker stop blg-env && docker rm blg-env
    blg-env
    blg-env
    adam@adam:~/Desktop/blg$

4. Attach into the container

*Container will serve as your virtual environment.*

.. code-block:: bash

  docker exec -it blg-env bash

- *Example output:*

.. code-block:: console

  adam@adam:~$ docker exec -it blg-env bash
  root@182d123ec039:/blg/wallet-template#

5. Install dependencies

.. attention::

  *ONLY Docker Machine*

  .. code-block:: bash

    yarn --no-bin-links
    yarn global add react-scripts

*Mac, Linux, Windows NOT Docker Machine*

.. code-block:: bash

  yarn

- *Example output:*

.. code-block:: console

  root@2e9e0eda980d:~/blg/wallet-template# yarn
  yarn install v1.2.0
  [1/4] Resolving packages...
  [....]
  Done in 42.65s.
  root@2e9e0eda980d:~/blg/wallet-template#

6. Start the app

.. note::
  The videos will demonstrate a window manager being used, screen, and if preferred you may do so at this time as well, however the following instructions will assume this is not the case and will simply create multiple tabs within your terminal window.

.. code-block:: bash

  CHOKIDAR_USEPOLLING=true yarn start

- *Example output:*

.. code-block:: console

  # CHOKIDAR_USEPOLLING=true yarn start
  Starting the development server...

  Compiled successfully!

  You can now view my-app in the browser.

    Local:            http://localhost:3000/
    On Your Network:  http://172.17.0.2:3000/

  Note that the development build is not optimized.
  To create a production build, use yarn build.

7. Load the app in chrome, `localhost:3000 <http://localhost:3000/>`_

.. image:: https://drive.google.com/open?id=1JPpBG49IInc-YFGpE6BPH11X1Edj3BXl
   :target: index.html

**END Stage 1: Dev Enviroment Set up and Application Bootstrapped!**

----

Stage 2: Testing Your Token
===========================

`Video Tutorial <https://drive.google.com/open?id=17TlqJ0571ElgB9yimc4WnAWCRNKFq6dz>`_
------------------------

1. Create a new tab in your terminal window or a new terminal window for our Ethereum node

.. note::
  While within the terminal window select File -> Open Terminal to create a new window.

  To create a new tab from within a terminal window:

  .. code-block:: bash

    ctrl+shft+t

- *Example output: Result is a new empty terminal, in the same directory you were when you initially entered your container. This will push you out of the container.*

.. code-block:: console

  adam@adam:~/Desktop/blg$

2. Attach back into the container in the Etheruem node tab

.. code-block:: bash

  docker exec -it blg-env bash

- *Example output:*

.. code-block:: console

  adam@adam:~/Desktop/blg$ docker exec -it blg-env bash
  root@182d123ec039:/blg/wallet-template#

3. Start up your Ethereum node, ganache-cli

.. code-block:: bash

  ganache-cli

- *Example output:*
.. code-block:: console

  # ganache-cli
  Ganache CLI v6.0.3 (ganache-core: 2.0.2)
  [...]
  Listening on localhost:8545

4. Create a new window or tab for our Truffle commands

.. note::
  While within the terminal window select File -> Open Terminal to create a new window.

  To create a new tab from within a terminal window:

  .. code-block:: bash

    ctrl+shft+t

- *Example output: Result is a new empty terminal, in the same directory you were when you initially entered your container. This will push you out of the container.*

.. code-block:: console

  adam@adam:~/Desktop/blg$

5. Attach back into the container in the Truffle tab

.. code-block:: bash

  docker exec -it blg-env bash

- *Example output:*

.. code-block:: console

  adam@adam:~/Desktop/blg$ docker exec -it blg-env bash
  root@182d123ec039:/blg/wallet-template#

6. Create the Test Case

.. note::
  - contracts/Token.sol has been provided or do update it with the Token that was completed previously.
  - Also one test file template has been provided in order to test the buy method was implemented correctly.

- Open the repo, ``~/Desktop/blg/wallet-template``, in your text editor, atom, sublime or the like and we can get to coding!

- Import the token's build artifacts, line 2

.. code-block:: javascript

  const Token = artifacts.require("./Token.sol")

  - Define the owner account, note ``truffle test`` exposes the accounts array for us, line 6

.. code-block:: javascript

  const owner = accounts[0]

- Create a new instance of the token contract, line 10

.. code-block:: javascript

  const token = await Token.new({ from: owner })

- Specify the wei value of tokens you wish to purchase, line 13

.. code-block:: javascript

  const value = 100

- Send the transaction to the token's buy method, line 16

.. code-block:: javascript

  const txResponse = await token.buy({ from: owner, value })

- Pull the rate from the token, line 19

.. code-block:: javascript

  const rate = await token.rate()

- Compute the token amount to be minted to the buyer, line 22

.. code-block:: javascript

  const tokenAmount = value * rate

- Access the event object from the transaction receipt, line 25

.. code-block:: javascript

  const event = txResponse.logs[0]

- Assert the correct values were emitted, line 28-31

.. code-block:: javascript

  assert.equal(event.event, 'TokensMinted', 'TokensMinted event was not emitted.')
  assert.equal(event.args.to, owner, 'Incorrect to was emitted.')
  assert.equal(event.args.value, value, 'Incorrect value was emitted.')
  assert.equal(event.args.totalSupply.toNumber(), tokenAmount, 'Incorrect totalSupply was emitted.')

**Ensure the state of the contract is updated correctly**

- Assert the buyer's balance is correct, line 34-35

.. code-block:: javascript

  const balance = await token.balanceOf(owner)
  assert.equal(balance.toNumber(), tokenAmount, 'Incorrect token balance.')

- Assert the total supply is correct, line 38-39

.. code-block:: javascript

  const supply = await token.totalSupply()
  assert.equal(supply.toNumber(), tokenAmount, 'Incorrect total supply balance.')

7. Execute the Test Case

.. code-block:: bash

  cr src && truffle test

- *Example output:*

.. code-block:: console

  # cr src && truffle test
  Using network 'development'.
  Contract: Token.buy()
    ✓ should buy new tokens. (133ms)
  1 passing (148ms)
  #

**END Stage 2: Testing Your Token**

----

Stage 3: Token Deployment
=========================

`Video Tutorial <https://drive.google.com/open?id=1sdLtnunj3crUAMX6Q_qqYOITJ0Z94Ee0>`_
-----------------------------------------------------------------

.. note::
  - A default, and required, initial migration script(src/migrations/1_initial_migration.js), has been included. Do *not* remove this script.

1. Write the Deployment Script

- Create a new file in order to deploy the token, src/migrations/2_deploy_contracts.js

  - Simply right-click on the migrations directory and create the new file.

- Import the token's artifacts, line 1

.. code-block:: javascript

  const Token = artifacts.require("./Token.sol");

- Define the owner account, note ``truffle migrate`` exposes the web3 object, line 2

.. code-block:: javascript

  const owner = web3.eth.accounts[0]

- Utilize truffle's deployer object in order to deploy an instance of the token, line 4-6

.. code-block:: javascript

  module.exports = deployer => {
    deployer.deploy(Token, { from: owner })
  }

2. Deploy your Token

.. code-block:: bash

  truffle migrate

- *Example output:*

.. code-block:: console

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

**END Stage 3: Token Deployment**

----

Stage 4: Token Interface
========================

`Video Tutorial <https://drive.google.com/open?id=18bU8mbWN1p6GrPnTLck7k14ByhngvBMg>`_
------------------------------------------------

1. Import the web3 library, app.js#line 5

.. code-block:: javascript

  import Web3 from 'web3'

2. Import the token build artifacts into the application, app.js#line 14

.. code-block:: javascript

  import tokenArtifacts from './build/contracts/Token.json'

3. Create a web3 connection to the local Ethereum node(ganache-cli), app.js#line 26

.. code-block:: javascript

  this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

4. Check if the connection was successful, app.js#line 28-30

.. code-block:: javascript

  if (this.web3.isConnected()) {

  }

5. Detect the current network id that is connected, app.js#line 29-31

.. code-block:: javascript

  this.web3.version.getNetwork(async (err, netId) => {

  })

6. Extract the recently deploy token address from the build artifacts, app.js#line 30-33

.. code-block:: javascript

  // Create a reference object to the deployed token contract
  if (netId in tokenArtifacts.networks) {
    const tokenAddress = tokenArtifacts.networks[netId].address
  }

7. Create a client side reference to the contract and save it in state, app.js#line 33-35

.. code-block:: javascript

  const token = this.web3.eth.contract(tokenArtifacts.abi).at(tokenAddress)
  this.setState({ token })
  console.log(token)

8. Refresh your chrome browser and open up the developer console

This can be accomplished by right-clicking anywhere in the chrome browser and in the dropdown selecting ``inspect`` or ``inspect element`` or by utilizing the shortcut: ``ctrl+shift_i``.

*View in the developer console the token instance is now present*

- *Example output:*

.. code-block:: bash

  Contract {_eth: Eth, transactionHash: null, address: "0xd58c6b5e848d70fd94693a370045968c0bc762a7", abi: Array[20]}

.. image:: https://drive.google.com/open?id=1maV5rw_yYYYyHxGOBpGiRXPbFyoDsJXe
  :target: index.html

**END Stage 4: Token Interface**

----

Stage 5: Load Available On-chain Accounts
=========================================

`Video Tutorial <https://drive.google.com/open?id=1hqqMw2Fv7wtqgRKl6TLoAb5go3BOqBkR>`_
------------------------------------------------

1. Get the available accounts from the web3 connection, this is to wrap the existing token interface code, line 29 & 39

.. code-block:: javascript

  this.web3.eth.getAccounts((err, accounts) => {  // Line 29

  })                                              // Line 39

2. Set the default account to use, line 30

.. code-block:: javascript

  const defaultAccount = this.web3.eth.accounts[0]

3. Load the available accounts into the user interface

- Import the Material UI MenuItem, line 8

.. code-block:: javascript

  import MenuItem from 'material-ui/MenuItem';

- Add an availableAccounts arrary into the app's state, line 21

.. code-block:: javascript

  availableAccounts: [],

- Append all accounts into the UI dropdown menu, line 34-41

.. code-block:: javascript

  // Append all available accounts
  for (let i = 0; i < accounts.length; i++) {
    this.setState({
      availableAccounts: this.state.availableAccounts.concat(
        <MenuItem value={i} key={accounts[i]} primaryText={accounts[i]} />
      )
    })
  }

4. Set the default account

- Add a defaultAccount variable to the state, line 22

.. code-block:: javascript

  defaultAccount: 0,

- Set the defaultAccount in the state when the drowdown value changes, line 86

.. code-block:: javascript

  this.setState({ defaultAccount })

**END Stage 5: Load Available Accounts**

----

Stage 6: Token Interaction - GET
================================

`Video Tutorial <https://drive.google.com/open?id=11WaCAk_sc2S4W-az-zV-TD6Le3tGqx5q>`_
------------------------------------------------

1. Load the token metadata from the contract

- Add the token's symbol to the state, line 23

.. code-block:: javascript

  tokenSymbol: 0,

- Load the token's symbol, line 52-55

.. code-block:: javascript

  // Set token symbol below
  token.symbol((err, tokenSymbol) => {
    this.setState({ tokenSymbol })
  })

- Add the token's rate to the state, line 23

.. code-block:: javascript

  rate: 1,

- Load the token's rate, line 58-61

.. code-block:: javascript

  // Set wei / token rate below
  token.rate((err, rate) => {
    this.setState({ rate: rate.toNumber() })
  })

**END Stage 6: Token Interaction - GET**

----

Stage 7: Load Account Balances
==============================

`Video Tutorial <https://drive.google.com/open?id=1FH7__0b1pwuLT32Ay9efkKV81KPmHEeu>`_
------------------------------------------------

1. Load the default account's ETH and Token balances, completing the ``loadAccountBalances`` method

- Confirm the token has been loaded, line 73-75

.. code-block:: javascript

  if (this.state.token) {

  }

- Add tokenBalance to the state, line 24

.. code-block:: javascript

  tokenBalance: 0,

- Set the token balance, line 75-78

.. code-block:: javascript

  // Set token balance below
  this.state.token.balanceOf(account, (err, balance) => {
    this.setState({ tokenBalance: balance.toNumber() })
  })

- Add ethBalance to the state, line 23

.. code-block:: javascript

  ethBalance: 0,

- Set the eth balance, line 81-84

.. code-block:: javascript

  // Set ETH balance below
  this.web3.eth.getBalance(account, (err, ethBalance) => {
    this.setState({ ethBalance })
  })

- Call the ``loadAccountBalances`` method on load, line 67

.. code-block:: javascript

  this.loadAccountBalances(defaultAccount)

- Also load the balances whenever a new account is selected in the dropdown, line 111

.. code-block:: javascript

  this.loadAccountBalances(this.state.availableAccounts[index].key)

2. View the default account balances and token information in your browser!

**END Stage 7: Load Available Account Balances**

----

Stage 8: Purchasing Tokens
========================================

`Video Tutorial <>`_
------------------------------------------------

1. Add token amount to the state, line 21.

.. code-block:: javascript

  amount: 0,

2. Complete the method to buy tokens, sending a transaction to the token contract, line 99-104.

.. code-block:: javascript

  this.state.token.buy({
    from: this.web3.eth.accounts[this.state.defaultAccount],
    value: amount
  }, (err, res) => {
    err ? console.error(err) : console.log(res)
  })

3. In the GUI buy tokens with several available accounts.

.. note::
  Note transaction hash in the developer console

  *Example transaction hash:* ``0x4b396191e87c31a02e80160cb6a2661da6086c073f6e91e9bd1f796e29b0c983``

4. Refresh the browser or select a different account and come back, and view the account's balance of shiny new tokens!

**END Stage 8: Purchasing Tokens**

----

Stage 9: Events
===============

`Video Tutorial <https://drive.google.com/open?id=1gSHTciut91F17sU_E7DYhpZJE4LoH-Lu>`_
------------------------------------------------

1. Add an event to listen for when tokens are transferred and reload the account's balances, line 94-99

.. code-block:: javascript

  // Watch tokens transfer event below
  this.state.token.Transfer({ fromBlock: 'latest', toBlock: 'latest' })
  .watch((err, res) => {
    console.log(`Tokens Transferred! TxHash: https://kovan.etherscan.io/tx/${res.transactionHash}`)
    this.loadAccountBalances(this.web3.eth.accounts[this.state.defaultAccount])
  })

2. Load the contract events, line 66

.. code-block:: javascript

  this.loadEventListeners()

3. Buy tokens and view the log confirmation in the developer console and token and ETH balance updated dynamically!

**END Stage 9: Events**

----

Stage 10: Transfer Tokens
========================

**Try this portion on your own! [Solution noted at the bottom]**

The required components included:

1. Add the transferAmount and transferUser to the app's state.
2. Add the React transfer tokens form component.
3. Complete the transfer method to send the transfer transaction.

**Finally transfer tokens between accounts and review balances.**

**END Stage 10: Transfer Tokens**

----

Bonus: Extend Your Wallet
=========================

1. Metamask Integration
-----------------------

- `Download Video Tutorial <https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Wallet/02_video_tutorials/02-bonus-metamask-integration.mp4?raw=true>`_
- Ensure Metamask is installed, unlocked and connected to the local client(localhost:8545).
- Fund your metamask account!

.. code-block:: console

  $ truffle console
  truffle(development> web3.eth.sendTransaction({ from: web3.eth.accounts[0], to: 'METAMASK_ADDRESS', value: 1e18 })

- Transfer tokens to your metamask account(from within the application).
- Add a conditional to use the Metamask web3 provider if present, `wallet-template/src/App.js#L35 <https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/0779b46516bc5c697c5fb986cad1080b8c8121af/src/App.js#L49>`_

.. code-block:: javascript

  if (window.web3)
      this.web3 = new Web3(window.web3.currentProvider)
  else

- Refresh the browser and connect to your Metamask account. View your Metamask account now available within the application.

2. Sync an Ethereum node of your own
------------------------------------

.. note::
  Look to setup a node locally or via Azure.  Azure is a nice option to begin with as a node locally can be quite heavy and resource intensive.

- `Getting Started With Azure <https://azure.microsoft.com/en-us/get-started/?v=17.39>`_

- Sync a Parity node to Kovan

  - Instructions to deploy to Azure `here <https://medium.com/@attores/creating-a-free-kovan-testnet-node-on-azure-step-by-step-guide-8f10127985e4>`_
  - `Parity Homepage <https://www.parity.io/>`_

- Sync a Geth node to Rinkeby

  - Instructions `here <https://gist.github.com/cryptogoth/10a98e8078cfd69f7ca892ddbdcf26bc>`_
  - `Geth Homepage <https://github.com/ethereum/go-ethereum>`_

3. Interact with your token that was deployed to Kovan
------------------------------------------------------

4. Interact with another participant's token on Kovan
-----------------------------------------------------

5. Enable the wallet to support multiple ERC20 tokens
-----------------------------------------------------

----

Clean up
========

`Download Video Tutorial <https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Wallet/02_video_tutorials/02-stage-cleanup-01.mp4?raw=true>`_
------------------------

1. Detach from the container
----------------------------

.. code-block:: bash

  ctrl+d

2. Stop the container
---------------------

.. code-block:: bash

  docker stop blg-env

- *Example output:*

.. code-block:: console

  adam@adam:~/$ docker stop blg-env
  blg-env
  adam@adam:~/$

----

SOLUTIONS
=========

Stage 10: Transfer Tokens
------------------------

`Video Tutorial <https://drive.google.com/open?id=1JPno5OLKUPTMdXO2O4YeXch1SZFyG297>`_
------------------------------------------------

1. Add the transferAmount and transferUser to the app's state, line 28 & 29.

.. code-block:: javascript

  transferAmount: '',
  transferUser: '',

2. Add the React transfer tokens form component, line 150-161.

.. code-block:: javascript

  <div>
    <h3>Transfer Tokens</h3>
    <TextField floatingLabelText="User to transfer tokens to." style={{width: 400}} value={this.state.transferUser}
      onChange={(e, transferUser) => { this.setState({ transferUser }) }}
    />
    <TextField floatingLabelText="Amount." style={{width: 100}} value={this.state.transferAmount}
      onChange={(e, transferAmount) => { this.setState({ transferAmount })}}
    />
    <RaisedButton label="Transfer" labelPosition="before" primary={true}
      onClick={() => this.transfer(this.state.transferUser, this.state.transferAmount)}
    />
  </div>


3. Complete the transfer method to send the transfer transaction, line 117-124.

.. code-block:: javascript

  if (amount > 0) {
    // Execute token transfer below
    this.state.token.transfer(user, amount, {
      from: this.web3.eth.accounts[this.state.defaultAccount]
    }, (err, res) => {
      err ? console.error(err) : console.log(res)
    })
  }
