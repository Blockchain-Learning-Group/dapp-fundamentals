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
  // positive integer that is public and constant representing the number of blocks
  // the vote will be active for

  /**
   * Storage variables
   */
  // Start block, when the vote started in order to define the end time
  // positive integer, block number the vote was deployed at.
  // To be set in the constructor

  // Mapping to define if a user has already voted
  // map a user addres to a bool specifying if they have voted

  // Map the id of the candidate to the total number of votes they have
  // May simplify and assume an id is a positive integer

  // List of candidate ids
  // May simplify and assume an id is a positive integer

  // Winner of the vote once complete
  // May simplify and assume an id is a positive integer

  /**
   * Events
   */
  // Logs left as guidance to set storage vars
  event LogCandidateAdded(uint8 candidate);
  event LogUserHasAlreadyVoted(address user);
  event LogVoteCast(address voter, uint8 votedFor);
  event LogVoteStillActive();

  // Remaining log
  // Log that the vote has been completed, specifying the winner

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
