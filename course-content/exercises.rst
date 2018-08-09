==================
Solidity Exercises
==================

1. `Voting Exercise <https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/exercises/Voting_02.sol>`_
=====================================================================================================================
- `View Final Solution Demo <https://drive.google.com/open?id=1HUlqRB62Y57RXIbGmp4ckmHuc2cpHqkb>`_

`Video Tutorial[1.1 - 1.3] <https://drive.google.com/open?id=13DBLIclqpJ9iNtRWzSvJ8NGzBM-LTbdD>`_

1.1 Copy the exercise over to `remix <https://remix.ethereum.org/#optimize=false&version=soljson-v0.4.24+commit.e67f0147.js>`_.
------------------------------------

1.2 Define the duration of the vote, Line 7
--------------------------------------------
::

  uint256 public constant VOTE_DURATION = 2 minutes;

1.3 Complete the castVote method, beginning on Line 36
-----------------------------------------------------

  - 1.3a When a vote has been cast increment that candidates total, Line 41
  ::

    candidateTotals_[_candidate] += 1;

  - 1.3b Create an event for when a vote is cast, Line 18
  -----------------------------
  ::

    event VoteCast(address voter, string votedFor);

  - 1.3c Emit an event that a new vote has been cast, Line 46
  ::

    emit VoteCast(msg.sender, candidateIds_[_candidate]);

  - 1.3d ``Run`` the contract, deploying within remix and test the castVote method.

`Video Tutorial[1.4 - 1.6] <https://drive.google.com/open?id=1WIsYlRKbakgdCNZ6BmQjNORnT7GFycd1>`_

1.4 Complete the tallyVote method, starting at Line 59
-----------------------------

  - 1.4a Add a for loop to find the winner of the vote, Lines 61 - 65
  ::

    for (uint8 i; i < candidates_.length; i++) {
      if (candidateTotals_[i] > candidateTotals_[currentWinner]) {
        currentWinner = i;
      }
    }

  - 1.4b Set the winner, Line 70
  ::

    winner_ = candidateIds_[currentWinner];

  - 1.4c Emit an event that the vote has completed, Line 75
  ::

    emit VoteComplete(winner_);

1.5 Add other candidates to the vote, Line 32
--------------------------------------------
::

  candidates_.push("YOUR NAME");
  candidateIds_[1] = "YOUR NAME";

1.6 ``Run`` the contract, deploying within remix and test the castVote method and tallyVote methods

  - Confirm candidates
  - Cast several votes and after each confirm the total for the candidate has increased
  - Tally the vote before the duration has elapsed
  - Tally the vote after the duration has and view the winner
  - Attempt to cast votes after the duration has elapsed

====

2. `Token Exercise <https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/exercises/Token_02.sol>`_
=====================================================================================================================
- `View Final Solution Demo <https://drive.google.com/open?id=1cjCdlIaPVxwzxKry6tpSOm9Cz-qDepZO>`_

`Video Tutorial [2.1-2.6] <https://drive.google.com/open?id=1yUxNOfeLR3Ifg7Eo23Vh0SkgYRfAKeG2>`_

2.1 Copy the exercise over to `remix <https://remix.ethereum.org/#optimize=false&version=soljson-v0.4.24+commit.e67f0147.js>`_.
---------------------------------------------------------------------------------
2.2 Compile and deploy the contract. Confirm variables and methods are available.
----------------------------------------------------------------------------------
2.3 Update the contract metadata to be your own! Line 8 & 9.
---------------------------------------------------------------
::

  string public constant symbol = 'YOUR NAME';
  string public constant name = 'YOUR NAME Token';

2.4 Specify the rate for the purchase of your token, line 14
---------------------------------------------------
::

  uint public constant rate_ = 2;  // rate of token / wei for purchase

2.5 Complete the buy method.
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

2.6 Compile, deploy and confirm you can purchase your token. Confirm balance updated in ``balances`` mapping.
----------------------------------------------------------------------------------------------------------

`Video Tutorial [2.7-2.10] <https://drive.google.com/open?id=1kAPTCbLndTMaOslYo0lx4bN3eE7-zQQs>`_

2.7 Complete the transfer method.
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

**How can you get the ETH earned out?**

2.8 Look to implement the withdraw method!

- `Solution <https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/0ef2524b0fdb9fbd56d166a43afe71bce6ae1a3a/solutions/Token_02.sol#L91>`_

2.9 Compile and deploy and confirm buy and transfer working.
----------------------------------------------------------------------
2.10 Note error output if insufficient balance and other errors correct.
---------------------------------------------------------------------------
2.11 Usage
-----
1. Purchase of tokens
2. Transfers
*3. Withdraw*

.. important::

  But how can you get your hard earned ETH out of the contract that has been accumulating as tokens have been sold?!

2.11 Add a withdraw method, and claim the ETH sent to the contract! Line 102
-----------------------------------------------------
- Solution below...


.. Important::
    Save this contract to disk if you wish to use it again! However a completed token will be made available should you wish.

SOLUTIONS
=========
1. `Voting Exercise Solution <https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Voting_02.sol>`_

2. `Token Exercise Solution <https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Token_02.sol>`_

2.11 Token Withdraw method

- Confirm only the owner may withdraw, line 104

::

  require(msg.sender == owner_, "only the owner may withdraw");

- Transfer the balance of the contract(this) to the wallet, line 107

::

  _wallet.transfer(address(this).balance);
