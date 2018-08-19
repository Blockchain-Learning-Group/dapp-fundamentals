pragma solidity 0.4.24;

contract HodlCapsule {
    address public owner_;
    uint256 public amount_;
    uint public unlockTime_;

    constructor(uint256 _unlockTime) public payable {
        owner_ = msg.sender;
        amount_ = msg.value;
        unlockTime_ = now + _unlockTime;
    }

    function withdraw() external {
        require(msg.sender == owner_, "msg.sender != owner");
        require(now >= unlockTime_, "Capsule not unlocked yet.");
        selfdestruct(owner_);
    }
}