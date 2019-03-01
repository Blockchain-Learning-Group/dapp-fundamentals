==================
Token
==================

`Token Exercise <https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/exercises/Token_02.sol>`_
=====================================================================================================================
- `View Final Solution Demo <https://drive.google.com/open?id=1cjCdlIaPVxwzxKry6tpSOm9Cz-qDepZO>`_

`Video Tutorial [1-6][no audio] <https://drive.google.com/open?id=1yUxNOfeLR3Ifg7Eo23Vh0SkgYRfAKeG2>`_

1 Copy the exercise over to `remix <https://remix.ethereum.org/#optimize=false&version=soljson-v0.4.24+commit.e67f0147.js>`_.
---------------------------------------------------------------------------------
2 Compile and deploy the contract. Confirm variables and methods are available.
----------------------------------------------------------------------------------
3 Update the contract metadata to be your own! Line 8 & 9.
---------------------------------------------------------------
::

  string public constant symbol = 'YOUR NAME';
  string public constant name = 'YOUR NAME Token';

4 Specify the rate for the purchase of your token, line 14
---------------------------------------------------
::

  uint public constant rate_ = 2;  // rate of token / wei for purchase

5 Complete the buy method.
------------------------------
  - May purchase only with > 0 ETH, line 46
  ::

    require(msg.value > 0, 'Cannot buy with a value of <= 0, Token.buy()');

  - Compute the amount of tokens to mint, line 49
  ::

    uint256 tokenAmount = msg.value * rate_;

  - Update the total supply and the user's balance, line 52 & 53
  ::

    totalSupply_ += tokenAmount;   // NOTE overflow
    balances_[msg.sender] += tokenAmount; // NOTE overflow

  - Finally emit events to notify the outside world, line 56 & 57
  ::

    emit TokensMinted(msg.sender, msg.value, totalSupply_);
    emit Transfer(address(0), msg.sender, msg.value);

6 Compile, deploy and confirm you can purchase your token. Confirm balance updated in ``balances`` mapping.
----------------------------------------------------------------------------------------------------------

`Video Tutorial [7-10][no audio] <https://drive.google.com/open?id=1kAPTCbLndTMaOslYo0lx4bN3eE7-zQQs>`_

7 Complete the transfer method.
-------------------------------------
  - Ensure from address has a sufficient balance, line 70
  ::

    require(balances_[msg.sender] >= _value, 'Sender balance is insufficient, Token.transfer()');

  - Update the from and to balances, line 73 & 74
  ::

    balances_[msg.sender] -= _value;  // NOTE underflow
    balances_[_to] += _value;  // NOTE overflow

  - Finally emit an event of the transfer, line 77
  ::

    emit Transfer(msg.sender, _to, _value);

8 Compile and deploy and confirm buy and transfer working.
----------------------------------------------------------------------
9 Note error output if insufficient balance and other errors correct.
---------------------------------------------------------------------------
10 Usage
-----
1. Purchase of tokens
2. Transfers

.. important::

  But how can you get your hard earned ETH out of the contract that has been accumulating as tokens have been sold?!

11 Add a withdraw method, and claim the ETH sent to the contract! Line 102
-----------------------------------------------------
- Solution below...


.. Important::
    Save this contract to disk if you wish to use it again! However a completed token will be made available should you wish.

Solutions
=========
`Token Exercise Solution <https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Token_02.sol>`_

11 Token Withdraw method

- Confirm only the owner may withdraw, line 104

::

  require(msg.sender == owner_, "only the owner may withdraw");

- Transfer the balance of the contract(this) to the wallet, line 107

::

  _wallet.transfer(address(this).balance);
