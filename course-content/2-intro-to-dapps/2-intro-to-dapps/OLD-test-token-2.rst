Stage 2: Testing Your Token
===========================

.. important::

  The following videos may make note of the use of something called "Docker" and "containers", but do note that Docker has since been omitted.
  The same commands that are mentioned may be run directly on the machine without entering into the noted container.

`Video Tutorial <https://drive.google.com/open?id=17TlqJ0571ElgB9yimc4WnAWCRNKFq6dz>`_

1. Start up your Ethereum node, ganache

  - Back within your terminal window where the ``npm start`` command was run, create a new terminal window, or tab, to run your blockchain

  .. note::
    While within the terminal window select File -> Open Terminal to create a new window.

    To create a new tab from within a terminal window:

    .. code-block:: bash

      ctrl+shft+t

  - *Example output: Result is a new empty terminal, in the same directory you were in.*

    .. code-block:: console

      adam@adam:~/Desktop/blg/wallet-template$

  - Then run the blockchain emulation with the below command:

    .. code-block:: console

      ganache-cli

  - Example output:

    .. code-block:: console
    
      # ganache-cli
      Ganache CLI v6.0.3 (ganache-core: 2.0.2)
      [...]
      Listening on localhost:8545

2. Open the application's code in the Sublime text editor, time to get to some coding...

  - Open the Sublime text editor by clicking on the Sublime icon in the left dock.

  - From within Sublime open the `wallet-template` folder. Click on ``File`` in the top left corner and select ``Open Folder...`` in the menu.  Select ``Desktop/blg/wallet-template`` to open, and we can get to coding!

3. Create the Test Case

  .. note::
    - contracts/Token.sol has been provided.
    - Also one test file template has been provided in order to test the buy method was implemented correctly.

  - Open the test file within Sublime, ``src/test/test_buy.js``

  **Now you may begin to implement the test case!**

  - Import the token's build artifacts, ``src/test/test_buy.js`` line 2

  .. code-block:: javascript

    const Token = artifacts.require("./Token.sol");

  - Define the owner account, note ``truffle test`` exposes the accounts array for us, line 6

  .. code-block:: javascript

    const owner = accounts[0];

  - Create a new instance of the token contract, line 10

  .. code-block:: javascript

    const token = await Token.new({ from: owner });

  - Specify the wei value of tokens you wish to purchase, line 13

  .. code-block:: javascript

    const value = 100;

  - Send the transaction to the token's buy method, line 16

  .. code-block:: javascript

    const txResponse = await token.buy({ from: owner, value });

  - Pull the rate from the token, line 19

  .. code-block:: javascript

    const rate = await token.rate();

  - Compute the token amount to be minted to the buyer, line 22

  .. code-block:: javascript

    const tokenAmount = value * rate;

  - Access the event object from the transaction receipt, line 25

  .. code-block:: javascript

    const event = txResponse.logs[0];

  - Assert the correct values were emitted, line 28-31

  .. code-block:: javascript

    assert.equal(event.event, 'TokensMinted', 'TokensMinted event was not emitted.');
    assert.equal(event.args.to, owner, 'Incorrect to was emitted.');
    assert.equal(event.args.value, value, 'Incorrect value was emitted.');
    assert.equal(event.args.totalSupply.toNumber(), tokenAmount, 'Incorrect totalSupply was emitted.');

  **Ensure the state of the contract is updated correctly**

  - Assert the buyer's balance is correct, line 34-35

  .. code-block:: javascript

    const balance = await token.balanceOf(owner);
    assert.equal(balance.toNumber(), tokenAmount, 'Incorrect token balance.');

  - Assert the total supply is correct, line 38-39

  .. code-block:: javascript

    const supply = await token.totalSupply();
    assert.equal(supply.toNumber(), tokenAmount, 'Incorrect total supply.');

4. Back within your terminal window where the ``npm start`` command was run, create a new terminal window or tab for our Truffle commands

.. note::
  While within the terminal window select File -> Open Terminal to create a new window.

  To create a new tab from within a terminal window:

  .. code-block:: bash

    ctrl+shft+t

- *Example output: Result is a new empty terminal, in the same directory you were in.*

  .. code-block:: console

    adam@adam:~/Desktop/blg/wallet-template$

5. Execute the Test Case

  - Within your new terminal window
  - Change into the ``src`` directory

  .. code-block:: bash

    cd src

  - Execute the test

  .. code-block:: bash

    truffle test

- *Example output:*

.. code-block:: console

  $ truffle test
  Compiling ./contracts/Migrations.sol...
  Compiling ./contracts/Token.sol...

  [...]

  Using network 'development'.
  Contract: Token.buy()
    ✓ should buy new tokens. (133ms)
  1 passing (148ms)
  #

- |test_buy|

  .. |test_buy| raw:: html

    <a href="https://github.com/Blockchain-Learning-Group/course-resources/blob/master/wallet-template/dev-stages/test_buy.js" target="_blank">Complete test_buy.js solution may be found here</a>