=======================
Blockchain Fundamentals
=======================

1. `ethstats.net <https://ethstats.net/>`_
==================================================

2. `etherscan.io <https://etherscan.io/>`_
==================================================

3. `ethernodes.org <https://www.ethernodes.org/network/1>`_
=======================================================================

4. Hash Function
================
- Run and attach into the container

.. code-block:: console

  # python3
  >>> from sha3 import keccak_256
  >>> keccak_256(bytes(1)).hexdigest()
  bc36789e7a1e281436464229828f817d6612f7b477d66591ff96a9e064bcc98a

  >>> keccak_256(bytes(2)).hexdigest()
  54a8c0ab653c15bfb48b47fd011ba2b9617af01cb45cab344acd57c924d56798

5. `Mining Script <https://github.com/Blockchain-Learning-Group/docker/blob/master/dapp-dev-env/proof_of_work_mining.py>`_
===================================================================================================================================
- From within the docker container

.. code-block:: console

  # cd /blg
  blg# python3 proof_of_work_mining.py 1
  blg# python3 proof_of_work_mining.py 10
  blg# python3 proof_of_work_mining.py 1000
  blg# python3 proof_of_work_mining.py 100000

.. note::
  Mainnet difficulty as of block ``6035113`` was ``3,550,379,886,051,685`` seen `here <https://etherscan.io/block/6035113>`_

6. `Bitcoin 51% Attack Cost <https://gobitcoin.io/tools/cost-51-attack/>`_
===========================================================================

7. `Remix <https://remix.ethereum.org/#optimize=false&version=soljson-v0.4.24+commit.e67f0147.js>`_
======================================================================================================

8. Solidity Exercises
=====================
  - `SimpleStorage Exercise <https://blg-dapp-fundamentals.readthedocs.io/en/blg-school-hack-4-change/course-content/simpleStorageExercise.html>`_
  - `Voting Exercise <https://blg-dapp-fundamentals.readthedocs.io/en/blg-school-hack-4-change/course-content/votingExercise.html>`_
  - `Token Exercise <https://blg-dapp-fundamentals.readthedocs.io/en/blg-school-hack-4-change/course-content/tokenExercise.html>`_

Bonus
=====
1. Deploy your token to a public Test Net(Kovan, Rinkeby, Ropsten)!
-------------------------------------
- Ensure Metamask is installed, enabled and unlocked
- Ensure Metamask is connected to Kovan via the drop down in the top left corner
- Within remix under the ``run`` tab switch from ``Javascript VM`` to ``injected web3``
- Refresh the browser
- Now re-deploy and the contract will be sent from your Metamask account.

  .. note::
    - A Metamask window will pop-up for you to confirm the transaction
    - Also **SAVE** the address the token was deployed at! You may need it later :)

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
