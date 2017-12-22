====================
DeXchange Deployment
====================

Stage 1: Restart Your Dev Environment and App
=============================================
.. image:: https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Exchange/03-stage-1.png
  :target: index.html

.. note::
  If your container is still running you may jump to step 2 otherwise begin instructions in a fresh terminal instance.  Not within any existing window manager, ie. screen or tmux.

`Download Video Tutorial <https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Exchange/03_video_tutorials/03-stage-1.mp4?raw=true>`_

**Docker Machine ONLY - if Docker shell exited**

- Double-click the `Docker QuickStart` icon on your Desktop to restart docker machine.

- Execute everything following from within the Docker shell.

1. Start your container back up
-------------------------------

.. code-block:: bash

  docker start blg-env

- *Example output:*

.. code-block:: bash

  adam@adam:~$ docker start blg-env
  blg-env
  adam@adam:~$

2. Attach into your container
-----------------------------

*Container will serve as your virtual environment.*

.. code-block:: bash

  docker exec -it blg-env bash

- *Example output:*

.. code-block:: bash

  adam@adam:~$ docker exec -it blg-env bash
  root@9c52f3787e28:/blg/wallet-template#

3. Start up your window manager, tmux
-------------------------------------

.. code-block:: bash

  tmux

- *Example output:*

.. code-block:: bash

  root@a75baed9ceba:/blg/wallet-template#

4. Start the app
----------------

.. code-block:: bash

  yarn start

- *Example output:*

.. code-block:: console

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

5. Create a new window, Ethereum client
---------------------------------------

*ctrl AND b THEN c*

.. code-block:: bash

  ctrl+b c

- *Example output: Result in new empty window, in same directory.*

.. code-block:: bash

  #

6. Create a new window, Truffle
-------------------------------

*ctrl AND b THEN c*

.. code-block:: bash

  ctrl+b c

- *Example output: Result in new empty window, in same directory.*

.. code-block:: bash

  #

9. Load the app in chrome, `localhost:3000 <http://localhost:3000/>`_
------------------------------------------------------------------------------------------------

.. note::
  Note there is no Ethereum client running yet!

**END Stage 1: Restart Your Dev Environment and App**

----

Stage 2: Connect to a "Real" Ethereum Client
============================================

`Download Video Tutorial <https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Exchange/03_video_tutorials/03-stage-16.mp4?raw=true>`_

*If testrpc is still active in your container otherwise proceed to #3*

1. Switch to your ethereum client window, ``ctrl AND b THEN 1``
-----------------------------------------------------------
.. code-block:: bash

  ctrl+b 1

- *Example output:*


.. code-block:: console

  [...]
  eth_getFilterChanges
  eth_getFilterChanges

2. Stop the client, ``ctrl AND c``
------------------------------

.. code-block:: bash

  ctrl+c

.. note::
  If the process does not terminate: (in a separate window)

  - Switch back to the truffle window

  ``ctrl+b 2``

  - Find the process id of testrpc

  ``ps aux | grep testrpc``

  - *Example output:*

  .. code-block:: console

    # ps aux | grep testrpc
    root       847  2.1  0.5 948376 59096 pts/3    Sl+  20:13   0:02 node /usr/local/bin/testrpc

  - Kill the process

  ``kill 847``

  - *Example output:*

  .. code-block:: console

    # kill 847
    #

  *Result in the testrpc window:*
  .. code-block:: console
    ctrl+b 1
    [...]
    Terminated
    #

3. Connect to your ``real`` Ethereum client, parity
---------------------------------------------------
- Switch into your client window, 1.

.. code-block:: bash
  ctrl+b 1

- Forward the container's ports to the remote server. Password to be provided via a secure channel.

.. code-block:: bash

  ssh -g -4 -NL 8545:127.0.0.1:8545 user@52.235.46.203

*A secondary node exists as well: user@52.242.24.198*

- *Example output:*

.. code-block:: console

  root@7e7d419200b4:/blg/wallet-template# ssh -g -4 -NL 8545:127.0.0.1:8545 user@52.235.46.203
  The authenticity of host '52.242.37.231 (52.242.37.231)' can't be established.
  ECDSA key fingerprint is c4:71:78:43:d8:78:f7:4b:24:36:ac:eb:09:a6:e7:f9.
  Are you sure you want to continue connecting (yes/no)? yes
  Warning: Permanently added '52.242.37.231' (ECDSA) to the list of known hosts.
  user@52.235.46.203's password:

4. View accounts from the node now available in the ui.
-------------------------------------------------------

.. image:: https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Exchange/03-stage-16.png
  :target: index.html

**END Stage 2: Connect to a "Real" Ethereum Client**

----

Stage 3: Deploy to the Kovan Public Testnet
==========================================

`Download Video Tutorial <https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Exchange/03_video_tutorials/03-stage-17.mp4?raw=true>`_

1. Transition back to the truffle window.
-----------------------------------------
.. code-block:: bash

  ctrl+b 2

2. Deploy the contracts.
------------------------

.. note::
  Note 3 unlocked accounts have been provided on the remote BLG node. But the ether will go fast so mind your deployments and transactions!

.. code-block:: bash

  cd src
  truffle migrate

- *Example output:*

.. code-block:: bash

  root@37709e3ee3e7:/blg/wallet-template/src# truffle migrate
  Using network 'development'.

  Running migration: 1_initial_migration.js
  [...]
    Token: 0xf37825e75d9e597bfc55aa4e048a6ec6c0c6b5be
  [...]
    Exchange: 0xadeadaf68eff9d6a633c30cddd6989b6e931f4ca
  [...]
  Saving artifacts...
  root@37709e3ee3e7:/blg/wallet-template/src#

.. warning::
  Common Error - Simply run the migration again


  .. code-block:: console
    root@37709e3ee3e7:/blg/wallet-template/src# truffle migrate
    Using network 'development'.

    Running migration: 1_initial_migration.js
      Deploying Migrations...
      ... 0xfe605be6a2cfd5d2f22cdf7cdd548e8d7dd85e243bca9e7bbaeccb0ef1101144
    Error encountered, bailing. Network state unknown. Review successful transactions manually.
    Error: The contract code couldn't be stored, please check your gas amount.
        at Object.callback (/usr/local/lib/node_modules/truffle/build/cli.bundled.js:218485:46)
        at /usr/local/lib/node_modules/truffle/build/cli.bundled.js:34886:25
        at /usr/local/lib/node_modules/truffle/build/cli.bundled.js:220423:9
        at /usr/local/lib/node_modules/truffle/build/cli.bundled.js:72910:11
        at /usr/local/lib/node_modules/truffle/build/cli.bundled.js:204149:9
        at XMLHttpRequest.request.onreadystatechange (/usr/local/lib/node_modules/truffle/build/cli.bundled.js:205574:13)
        at XMLHttpRequestEventTarget.dispatchEvent (/usr/local/lib/node_modules/truffle/build/cli.bundled.js:73069:18)
        at XMLHttpRequest._setReadyState (/usr/local/lib/node_modules/truffle/build/cli.bundled.js:73359:12)
        at XMLHttpRequest._onHttpResponseEnd (/usr/local/lib/node_modules/truffle/build/cli.bundled.js:73514:12)
        at IncomingMessage.<anonymous> (/usr/local/lib/node_modules/truffle/build/cli.bundled.js:73474:24)

3. View the contracts deployed to kovan @ https://kovan.etherscan.io/address/ ``TOKEN OR EXCHANGE ADDRESS``
---------------------------------------------------------------------------------------------------------
- Token Example: `https://kovan.etherscan.io/address/0xf37825e75d9e597bfc55aa4e048a6ec6c0c6b5be <https://kovan.etherscan.io/address/0xf37825e75d9e597bfc55aa4e048a6ec6c0c6b5be>`_
- Exchange Example: `https://kovan.etherscan.io/address/0xadeadaf68eff9d6a633c30cddd6989b6e931f4ca <https://kovan.etherscan.io/address/0xadeadaf68eff9d6a633c30cddd6989b6e931f4ca>`_

4. View the contract reference objects in the browser.
------------------------------------------------------

.. image:: https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Exchange/03-stage-17.png
  :target: index.html
.. image:: https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Exchange/03-stage-17-02.png
  :target: index.html

**END Stage 3: Deploy to the Kovan Public Testnet**

----

Stage 4: Convert to Metamask Web3 Provider
==========================================

`Download Video Tutorial <https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Exchange/03_video_tutorials/03-stage-18.mp4?raw=true>`_

1. Ensure Metamask is installed, unlocked and connected to the kovan testnet.
-----------------------------------------------------------------------------

2. Add a conditional to use the Metamask web3 provider if present, `wallet-template/src/App.js#L49 <https://github.com/Blockchain-Learning-Group/exchange-eod3/blob/0779b46516bc5c697c5fb986cad1080b8c8121af/src/App.js#L49>`_
---------------------------------------------------------------------------------------------------

.. code-block:: javascript
  if (window.web3)
      this.web3 = new Web3(window.web3.currentProvider)
  else

3. Refresh the browser and connect to your Metamask account. View your Metamask account now available within the application.
-----------------------------------------------------------------------------------------------------------------------------

.. image:: https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Exchange/03-stage-18.png
  :target: index.html

**END Stage 4: Convert to Metamask Web3 Provider**

----

Stage 5: Use the Exchange!
==========================================
`Download Video Tutorial <https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Exchange/03_video_tutorials/03-stage-19.mp4?raw=true>`_

1. Mint tokens to your Metamask account.  Will need to be done from the parity account that deployed the contract as it is the owner.
-----------------------------------------------------------------------------------------------------------------------------

2. Submit an order!  Note the Metamask dialog now appears to allow you, the user, to approve the transaction and therefore also pay for its execution.
-----------------------------------------------------------------------------------------------------------------------------

3. Create a new Metamask account.
-----------------------------------------------------------------------------------------------------------------------------

4. Send ether to it from your initial Metamask account.
-----------------------------------------------------------------------------------------------------------------------------

5. Execute the order from your new account and view the updated token balances.
-----------------------------------------------------------------------------------------------------------------------------

Success, your exchange is complete!

**END Stage 5: Use the Exchange!**

----

Bonus: Extend Your Exchange
===========================

1. Connect to another participant's exchange, updating the address to create the reference object at.
----------------------------------------------------------------------------------------------------
2. Pre-condition checks!  amounts > 0, etc.
----------------------------------------------------------------------------------------------------
3. Integrate error logging pattern in place of requires
----------------------------------------------------------------------------------------------------
4. Add other ERC20 / ETH pairings
----------------------------------------------------------------------------------------------------
5. Enable ERC20 / ERC20 pairings
----------------------------------------------------------------------------------------------------
6. Automated order matching, partial fills, matched by ratio not user selected.
----------------------------------------------------------------------------------------------------
7. Write tests for the exchange
----------------------------------------------------------------------------------------------------
8. Update gas amounts sent with each transaction.  Leverage web3's gas estimation!
----------------------------------------------------------------------------------------------------
9. Clean up the allowance if the order submission transaction fails
----------------------------------------------------------------------------------------------------
10. Sort the orders in the order book table
----------------------------------------------------------------------------------------------------
---

Clean up
========

`Download Video Tutorial <https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Wallet/02_video_tutorials/03-stage-cleanup.mp4?raw=true>`_

1. Detach from your tmux session
---------------------------------
*ctrl AND b THEN d*

.. code-block:: bash

  ctrl+b d

2. Detach from the container
----------------------------

.. code-block:: bash

  ctrl+d

3. Stop the container
--------------------

.. code-block:: bash

  docker stop blg-env

- *Example output:*

.. code-block:: bash

  adam@adam:~/$ docker stop blg-env
  blg-env
  adam@adam:~/$
