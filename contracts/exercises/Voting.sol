pragma solidity ^0.4.15;

/**
 * @title Basic Voting Contract
 * Election over a set period of time.
 */
contract Voting {
  /**
   * Constants
   */
  // Duration of the vote

  /**
   * Storage variables
   */
  // Start block, when the vote started in order to define the end time

  // Mapping to define if a user has already voted

  // Map the name of the candidate to the total number of votes they have

  // List of candidates

  // Winner of the vote once complete

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
    // Set the start block! Block that this contract was deployed in
  }

  /**
   * @dev Add a new candidate.
   * @param _candidate Add the candidate. Note this dynamic array
   * is iterated over to define winner, must be within block gas limit!
   */
  function addCandidate(uint8 _candidate) external {
    // If current block number is greater than the duration of the vote then tally the vote

    // Otherwise Add the new candidate
  }

  /**
   * @dev Cast your vote.
   * @param _candidate The candidate you with to vote for.
   */
  function castVote(uint8 _candidate) external {
    // Vote has concluded!
    // If current block number is greater than the duration of the vote then tally the vote

    // Else check that the user has not voted already

    // finally cast the vote!
    // Set that the voter has voted and incr the candidate total
  }

  /**
   * @dev Tally the vote and publicize the results.
   */
  function tallyVote() public {
    // Confirm current block number is greater than the duration of the vote

    // Find the winner, candidate with most votes

    // Final write to storage, do not want to update storage more than once
  }
}
