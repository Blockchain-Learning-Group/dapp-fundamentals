=======================
Blockchain Fundamentals
=======================

1. `ethstats.net <https://ethstats.net/>`_
==================================================

2. `etherscan.io <https://etherscan.io/>`_
==================================================
    * `Augur <https://etherscan.io/token/REP#readContract>`_

3. `ethernodes.org <https://www.ethernodes.org/network/1>`_
=======================================================================

4. Hash Function
================
- Run and attach into the container

.. code-block:: console

  $ docker run -dit --name=blg-env blockchainlg/dapp-dev-env
  $ docker exec -it blg-env bash
  # python3
  >>> from sha3 import keccak_256
  >>> keccak_256(bytes(1)).hexdigest()
  bc36789e7a1e281436464229828f817d6612f7b477d66591ff96a9e064bcc98a

  >>> keccak_256(bytes(2)).hexdigest()
  54a8c0ab653c15bfb48b47fd011ba2b9617af01cb45cab344acd57c924d56798

5. `Mining Script <(https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/exercises/proof_of_work_mining.py>`_
===================================================================================================================================
- From within the docker container

.. code-block:: console

  # cd /blg
  blg# python3 proof_of_work_mining.py 1
  blg# python3 proof_of_work_mining.py 10
  blg# python3 proof_of_work_mining.py 1000
  blg# python3 proof_of_work_mining.py 100000

6. `Bitcoin 51% Attack Cost <https://gobitcoin.io/tools/cost-51-attack/)>`_
===========================================================================
7. `Remix <https://ethereum.github.io/browser-solidity/#version=soljson-v0.4.15+commit.bbb8e64f.js)>`_
======================================================================================================
8. `DappDeveloper.sol <https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/exercises/DappDeveloper.sol)>`_
=================================================================================================================================
9. Exceed Block Gas Limit
=========================

**Add the below to DappDeveloper.sol**

::

  uint256 value_;

  function reachGasLimit() {
    for (uint256 i = 0; i < 10**18; i++) {
        value_ = i;
        value_ = i + 1;
        value_ = i + 2;
    }
  }

10. `Token Exercise <https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/exercises/Token.sol>`_
=====================================================================================================================
- `Solution <https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Token.sol>`_

`Download Video Tutorial <https://github.com/Blockchain-Learning-Group/dapp-fundamentals/raw/master/course-content/video-tutorials/token-development.mp4>`_

10.1 Copy the exercise over to remix.
-------------------------------------
10.2 Note LoggingErrors pattern contract inherited and SafeMath library utilized.
---------------------------------------------------------------------------------
10.3 Compile and deploy the contract. Confirm variables and methods are available.
----------------------------------------------------------------------------------
10.4 Update the contract metadata to be your own! Line 55 - 56.
---------------------------------------------------------------
::

  string public constant symbol = 'BLG';
  string public constant name = 'Blockchain Learning Group Community Token';

10.5 Complete the mint method.
------------------------------
  - Only allow the owner to mint tokens, line 94
  ::

    if (msg.sender != owner_)
      return error('msg.sender != owner, Token.mint()');

  - Confirm the value to be mint is greater than zero, line 98
  ::

    if (_value <= 0)
      return error('Cannot mint a value of <= 0, Token.mint()');

  - Confirm you are not trying to mint to address 0, line 102
  ::

    if (_to == address(0))
      return error('Cannot mint tokens to address(0), Token.mint()');

  - Update the total supply and the user's balance, line 108
  ::

    totalSupply_ = totalSupply_.add(_value);
    balances_[_to] = balances_[_to].add(_value);

  - Finally emit events to notify the outside world, 112
  ::

    LogTokensMinted(_to, _value, totalSupply_);
    Transfer(address(0), _to, _value);

10.6 Compile, deploy and confirm you can mint to an address. Confirm balance updated in ``balances`` mapping.
----------------------------------------------------------------------------------------------------------

10.7 Complete the transferFrom method.
-------------------------------------
  - Confirm not transferring an amount of 0, line 142
  ::

    if (_amount <= 0)
      return error('Cannot transfer amount <= 0, Token.transferFrom()');

  - Confirm the owner has a sufficient balance to transfer from, line 146
  ::

    if (_amount > balances_[_from])
      return error('From account has an insufficient balance, Token.transferFrom()');

  - Confirm the spender has a sufficient allowance to transfer, line 150
  ::

    if (_amount > allowed_[_from][msg.sender])
      return error('msg.sender has insufficient allowance, Token.transferFrom()');

  - Update the balances, subtracting from the from addressing and adding to the to, line 156
  ::

    balances_[_from] = balances_[_from].sub(_amount);
    balances_[_to] = balances_[_to].add(_amount);

  - Reduce the spender's allowance,  160
  ::

    allowed_[_from][msg.sender] = allowed_[_from][msg.sender].sub(_amount);

  - Finally emit an event of the transfer, 163
  ::

    Transfer(_from, _to, _amount);

10.8 Compile and deploy and confirm transfer and transferFrom working.
----------------------------------------------------------------------
10.9 Note error logging if insufficient allowance and other errors correct.
---------------------------------------------------------------------------
10.10 Usage
-----
1. minting
2. Transfers
3. Approvals
4. TransferFrom

*Save this contract to disk. We will be using it again!*

Bonus
=====
1. Deploy your token to the Kovan Test Net!
-------------------------------------
- Ensure Metamask is installed, enabled and unlocked
- Ensure Metamask is connected to Kovan via the drop down in the top left corner
- Within remix under the ``run`` tab switch from ``Javascript VM`` to ``injected web3``
- Refresh the browser
- Now re-deploy and the contract will be sent from your Metamask account.
  - *NOTE a Metamask window will pop-up for you to confirm the transaction*
  - Also **SAVE** the address the token was deployed at! You may need it later :)
