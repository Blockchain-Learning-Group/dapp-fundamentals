# A Collection of Solidity Exercises

1. [Voting Exercise](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/exercises/Voting.sol), [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/VotingSolution.sol)

- Define the duration of the vote
```
// Line 14
uint public constant VOTE_DURATION_BLOCKS = 10;
```

- Set the storage variables
```
// When the vote started in order to define end time
uint public startBlock_;

// Only enable users to vote once
mapping(address => bool) public hasVoted_;

// Map the name(uint for simplicity) of the candidate to the total number of votes they have
mapping(uint8 => uint) public candidateTotals_;

// List of candidates
uint8[] public candidates_;

// Winner of the vote once complete
uint8 public winner_;
```

- Set the start block of the vote.
```
// Within the constructor
startBlock_ = block.number;
```
- Confirm the start block is being set correctly. Compile and deploy.

- Complete the add candidate method.
```
/**
 * @dev Add a new candidate.
 * @param _candidate Add the candidate. Note this dynamic array
 * is iterated over to define winner, must be within block gas limit!
 */
function addCandidate(uint8 _candidate) external {
  // NOTE no check if candidate already exists..
  // NOTE no permissioning, DOS vector

  // Vote has concluded
  if (block.number > startBlock_ + VOTE_DURATION_BLOCKS) {
    tallyVote();

  // Add the new candidate
  } else {
    candidates_.push(_candidate);
    LogCandidateAdded(_candidate);
  }
}
```

- Compile and deploy the contract and confirm you may now add a candidate and access it in the candidates array.

- Complete the cast vote method.
```
/**
 * @dev Cast your vote.
 * @param _candidate The candidate you wish to vote for.
 */
function castVote(uint8 _candidate) external {
  // Vote has concluded!
  if (block.number > startBlock_ + VOTE_DURATION_BLOCKS) {
    tallyVote();

  // User may only vote once
  } else if (hasVoted_[msg.sender]) {
    LogUserHasAlreadyVoted(msg.sender);

  // Cast the vote! And set that the user has already voted
  } else {
    hasVoted_[msg.sender] = true;
    candidateTotals_[_candidate] += 1;
    LogVoteCast(msg.sender, _candidate);
  }
}
```

- Compile and deploy and confirm votes may be cast.  Add a candidate and vote for them. Confirm their total is updated and events emitted.

- Create the event for once the vote has completed.
```
event LogVoteComplete(uint8 winner);
```

- Complete the tally vote method.
```
/**
 * @dev Tally the vote and publicize the results.
 */
function tallyVote() public {
  if (block.number > startBlock_ + VOTE_DURATION_BLOCKS) {
    uint8 candidate;
    uint8 winner; // Only want to write to storage once

    // Find the winner, candidate with most votes
    for (uint8 i; i < candidates_.length; i++) {
      candidate = candidates_[i];

      if (candidateTotals_[candidate] > candidateTotals_[winner]) {
        winner = candidate;
      }
    }

    // Final write to storage
    winner_ = winner;

    LogVoteComplete(winner);

  // Vote duration has not elapsed
  } else {
    LogVoteStillActive();
  }
}
```

Usage:
- Try out your vote!
- Confirm user may only vote once.
- Confirm vote may only be tallied after the number of blocks have elapsed.
- Confirm correct winner logged.
