==================
Voting Exercise
==================

`Voting Exercise <https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/exercises/Voting_02.sol>`_
=====================================================================================================================
- `View Final Solution Demo <https://drive.google.com/open?id=1HUlqRB62Y57RXIbGmp4ckmHuc2cpHqkb>`_

`Video Tutorial[1 - 3][no audio] <https://drive.google.com/open?id=13DBLIclqpJ9iNtRWzSvJ8NGzBM-LTbdD>`_

1 Copy the exercise over to `remix <https://remix.ethereum.org/#optimize=false&version=soljson-v0.4.24+commit.e67f0147.js>`_.
------------------------------------

2 Define the duration of the vote, Line 7
--------------------------------------------
::

  uint256 public constant VOTE_DURATION = 2 minutes;

3 Complete the castVote method, beginning on Line 36
-----------------------------------------------------

  - 3a When a vote has been cast increment that candidates total, Line 41
  ::

    candidateTotals_[_candidate] += 1;

  - 3b Create an event for when a vote is cast, Line 18
  -----------------------------
  ::

    event VoteCast(address voter, string votedFor);

  - 3c Emit an event that a new vote has been cast, Line 46
  ::

    emit VoteCast(msg.sender, candidateIds_[_candidate]);

  - 3d ``Run`` the contract, deploying within remix and test the castVote method.

`Video Tutorial[4 - 6][no audio] <https://drive.google.com/open?id=1WIsYlRKbakgdCNZ6BmQjNORnT7GFycd1>`_

4 Complete the tallyVote method, starting at Line 59
-----------------------------

  - 4a Add a for loop to find the winner of the vote, Lines 61 - 65
  ::

    for (uint8 i; i < candidates_.length; i++) {
      if (candidateTotals_[i] > candidateTotals_[currentWinner]) {
        currentWinner = i;
      }
    }

  - 4b Set the winner, Line 70
  ::

    winner_ = candidateIds_[currentWinner];

  - 4c Emit an event that the vote has completed, Line 75
  ::

    emit VoteComplete(winner_);

5 Add other candidates to the vote, Line 32
--------------------------------------------
::

  candidates_.push("YOUR NAME");
  candidateIds_[1] = "YOUR NAME";

6 ``Run`` the contract, deploying within remix and test the castVote method and tallyVote methods

  - Confirm candidates
  - Cast several votes and after each confirm the total for the candidate has increased
  - Tally the vote before the duration has elapsed
  - Tally the vote after the duration has and view the winner
  - Attempt to cast votes after the duration has elapsed

====

Solution
=========
`Voting Exercise Solution <https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/solutions/Voting_02.sol>`_