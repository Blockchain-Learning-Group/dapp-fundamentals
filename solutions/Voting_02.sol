pragma solidity ^0.4.21;

contract Voting {
  uint256 private constant VOTE_DURATION = 2 minutes;
  uint256 private startTime_;
  string[] public candidates_;
  string public winner_;

  mapping(uint8 => uint256) public candidateTotals_;
  mapping(uint8 => string) private candidateIds_; // so we can get strings

  event VoteCast(address voter, string votedFor);
  event VoteStillActive(uint256 remainingTime);
  event VoteComplete(string winner);

  constructor() public {
    startTime_ = block.timestamp;

    // Hardcoded candidates
    candidates_.push("Adam");
    candidateIds_[0] = "Adam";

    candidates_.push("Chami");
    candidateIds_[1] = "Chami";
  }

  // Cast your vote
  function castVote(uint8 _candidate) external {
    if (block.timestamp <= startTime_ + VOTE_DURATION) {
      candidateTotals_[_candidate] += 1;
      emit VoteCast(msg.sender, candidateIds_[_candidate]);
    } else {
      emit VoteComplete(winner_);
    }
  }

  // Tally the vote and publicize the results
  function tallyVote() public {
    if (block.timestamp > startTime_ + VOTE_DURATION) {

      uint8 currentWinner;

      // Find the winner, candidate with most votes
      for (uint8 i; i < candidates_.length; i++) {
        if (candidateTotals_[i] > candidateTotals_[currentWinner]) {
          currentWinner = i;
        }
      }

      winner_ = candidateIds_[currentWinner];
      emit VoteComplete(winner_);

    // Vote duration has not elapsed
    } else {
      emit VoteStillActive((startTime_ + VOTE_DURATION) - block.timestamp);
    }
  }
}
