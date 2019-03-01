Solutions
=========

Stage 10: Transfer Tokens
------------------------

`Video Tutorial <https://drive.google.com/open?id=1JPno5OLKUPTMdXO2O4YeXch1SZFyG297>`_

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


`Complete Wallet Solution <https://github.com/Blockchain-Learning-Group/wallet-eod2>`_
------------------------------
- ``git clone https://github.com/Blockchain-Learning-Group/wallet-eod2.git``
- ``cd wallet-eod2``
- ``git checkout tags/2.0``

----

Bonus: Extend Your Wallet
=========================

1. Add basic routing to render navigate between a new exchange and the existing wallet component
-----------------------------------------------

  1.1 Add the routing components

  `Video Tutorial <https://drive.google.com/open?id=1hcdKMRLm6w4Pyewqse3uaIFQeg-s4VcU>`_

  - Change into the ```wallet-template` directory

    .. code-block::

      cd ~/Desktop/blg/wallet-template

  - Add the ``react-router-dom`` package to the project

    .. code-block:: console

      yarn add react-router-dom@4.3.1

  - *Example output:*

  .. code-block:: console

    wallet-template$ yarn add react-router-dom@4.3.1
    yarn add v1.2.0
    [1/4] Resolving packages...
    [..]
    Done in 5.34s.
    wallet-template$

  - Import the router components into the app, line 2

  .. code-block:: javascript

    import { BrowserRouter, Route, Link } from 'react-router-dom'

  - Wrap components with the router, ~line 172 & line 179

    .. code-block:: html

      <BrowserRouter>
      </BrowserRouter>

  - Add a button to navigate to the exchange route, ~line 137-139

  .. code-block:: html

    <Link to={'exchange'}>
      <RaisedButton label=">>> Exchange" secondary={true} fullWidth={true}/>
    </Link>

  - Confirm selection of the new button will change the route in the url to ``/exchange``

  1.2. Create the exchange component and the routes

  `Video Tutorial <https://drive.google.com/open?id=1qR09izk5ewS9_yFrnpzZARSXXqhNbZjb>`_

  - Add a template exchange component with a link back to the wallet, line 173-177

    .. code-block:: html

      const exchange = <div>
        <Link to={'/'}>
          <RaisedButton label="Wallet <<<" primary={true} fullWidth={true}/>
        </Link>
      </div>

  - Add a default route, line 186

  .. code-block:: html

      <Route exact={true} path="/" render={() => component}/>

  - And an exchange route, line 187

  .. code-block:: html

      <Route exact={true} path="/exchange" render={() => exchange}></Route>

2. Metamask Integration
-----------------------

- Ensure Metamask is installed, unlocked and connected to the local client(localhost:8545).
  - Metamask may be insalled `here <https://metamask.io/>`_

- Fund your Metamask account!

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

3. Sync an Ethereum node of your own
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

----


