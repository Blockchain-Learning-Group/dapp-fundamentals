pragma solidity 0.4.24;


contract Capsule {
    address public owner_;
    uint256 public amount_;
    uint public unlockTime_;

    constructor() public payable {
        owner_ = msg.sender;
        amount_ = msg.value;
        unlockTime_ = now + 3 minutes;
    }

    function send() external {
        require(msg.sender == owner_, "msg.sender != owner");
        require(now >= unlockTime_, "Capsule not unlocked yet.");
        selfdestruct(owner_);
    }
}