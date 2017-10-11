pragma solidity ^0.4.15;

/**
 * @title Basic Voting Contract
 * Election over a set period of time.
 */
contract Voting {
  /**
   * Constants
   */
  uint public constant VOTE_DURATION_BLOCKS = 10;

  /**
   * Storage variables
   */
  // When the vote started in order to define end time
  uint public startBlock_;

  // Only enable users to vote once
  mapping(address => bool) public hasVoted_;

  // Map the name of the candidate to the total number of votes they have
  mapping(uint8 => uint) public candidateTotals_;

  // List of candidates
  uint8[] public candidates_;

  // Winner of the vote once complete
  uint8 public winner_;

  /**
   * Events
   */
  event LogCandidateAdded(uint8 candidate);
  event LogUserHasAlreadyVoted(address user);
  event LogVoteCast(address voter, uint8 votedFor);
  event LogVoteComplete(uint8 winner);
  event LogVoteStillActive();

  /**
   * @dev Contract constructor
   * Set the start time of the vote.
   */
  function Voting() public {
    // Block that this contract was deployed in
    startBlock_ = block.number;
  }

  /**
   * @dev Add a new candidate.
   * @param _candidate Add the candidate. Note this dynamic array
   * is iterated over to define winner, must be within block gas limit!
   */
  function addCandidate(uint8 _candidate) external {
    // NOTE no check if candidate already exists..
    // Vote has concluded
    if (block.number > startBlock_ + VOTE_DURATION_BLOCKS) {
      tallyVote();

    // Add the new candidate
    } else {
      candidates_.push(_candidate);
      LogCandidateAdded(_candidate);
    }
  }

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
}
