Bonus
=========================

- **Metamask Integration**

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

- **Sync an Ethereum node of your own**

  .. note::
    Look to setup a node locally or via Azure.  Azure is a nice option to begin with as a node locally can be quite heavy and resource intensive.

  - `Getting Started With Azure <https://azure.microsoft.com/en-us/get-started/?v=17.39>`_

  - Sync a Parity node to Kovan

    - Instructions to deploy to Azure `here <https://medium.com/@attores/creating-a-free-kovan-testnet-node-on-azure-step-by-step-guide-8f10127985e4>`_
    - `Parity Homepage <https://www.parity.io/>`_

  - Sync a Geth node to Rinkeby

    - Instructions `here <https://gist.github.com/cryptogoth/10a98e8078cfd69f7ca892ddbdcf26bc>`_
    - `Geth Homepage <https://github.com/ethereum/go-ethereum>`_