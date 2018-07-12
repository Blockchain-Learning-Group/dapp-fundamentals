==================
Solidity Exercises
==================

1. `Voting Exercise <https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/exercises/Voting_02.sol>`_
=====================================================================================================================
- `Solution <https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Voting_02.sol>`_

`Download Video Tutorial[1.1 - 1.3] <https://github.com/Blockchain-Learning-Group/dapp-fundamentals/raw/master/course-content/video-tutorials/voting-development.mp4>`_

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

`Download Video Tutorial[1.4 - 1.6] <https://github.com/Blockchain-Learning-Group/dapp-fundamentals/raw/master/course-content/video-tutorials/voting-development.mp4>`_

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

  - 1.4c Emit an evnet that the vote has completed, Line 75
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

2. `Token Exercise <https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/exercises/Token.sol>`_
=====================================================================================================================
- `Solution <https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Token.sol>`_

`Download Video Tutorial <https://github.com/Blockchain-Learning-Group/dapp-fundamentals/raw/master/course-content/video-tutorials/token-development.mp4>`_

2.1 Copy the exercise over to remix.
-------------------------------------
2.2 Note LoggingErrors pattern contract inherited and SafeMath library utilized.
---------------------------------------------------------------------------------
2.3 Compile and deploy the contract. Confirm variables and methods are available.
----------------------------------------------------------------------------------
2.4 Update the contract metadata to be your own! Line 55 - 56.
---------------------------------------------------------------
::

  string public constant symbol = 'BLG';
  string public constant name = 'Blockchain Learning Group Community Token';

2.5 Complete the mint method.
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

2.6 Compile, deploy and confirm you can mint to an address. Confirm balance updated in ``balances`` mapping.
----------------------------------------------------------------------------------------------------------

2.7 Complete the transferFrom method.
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

2.8 Compile and deploy and confirm transfer and transferFrom working.
----------------------------------------------------------------------
2.9 Note error logging if insufficient allowance and other errors correct.
---------------------------------------------------------------------------
2.10 Usage
-----
1. minting
2. Transfers
3. Approvals
4. TransferFrom

.. Important::
    Save this contract to disk if you wish to use it again! However a completed token will be provided for you as well.
