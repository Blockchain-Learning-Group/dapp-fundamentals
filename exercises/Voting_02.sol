pragma solidity ^0.4.21;

contract Voting {
  /*************************************
   * Specify the duration of your vote *
   ************************************/


  uint256 private startTime_;
  string[] public candidates_;

  /**************************************************
   * Create a storage variable for the final winner *
   *************************************************/


  mapping(uint8 => uint256) public candidateTotals_;
  mapping(uint8 => string) private candidateIds_; // so we can get strings

  event VoteCast(address voter, string votedFor);
  event VoteStillActive(uint256 remainingTime);

  /**************************************************
   * Create an event for when the vote is completed *
   *************************************************/


  constructor() public {
    startTime_ = block.timestamp;

    // Hardcoded candidates
    candidates_.push("Adam");
    candidateIds_[0] = "Adam";

    /************************
     * Add other candidates *
     ***********************/

  }

  // Cast your vote
  function castVote(uint8 _candidate) external {
    if (block.timestamp <= startTime_ + VOTE_DURATION) {
      /**********************************
       * Increment the candidates total *
       *********************************/


      /*********************************************
       * Emit an event that the vote has been cast *
       ********************************************/

    } else {
      emit VoteComplete(winner_);
    }
  }

  // Tally the vote and publicize the results
  function tallyVote() public {
    if (block.timestamp > startTime_ + VOTE_DURATION) {

      uint8 currentWinner;

      /**********************************************
       * Find the winner, candidate with most votes *
       *********************************************/






      /******************
       * Set the winner *
       *****************/


      /**************************************************
       * Emit an event that the vote has been completed *
       *************************************************/


    // Vote duration has not elapsed
    } else {
      emit VoteStillActive((startTime_ + VOTE_DURATION) - block.timestamp);
    }
  }
}
