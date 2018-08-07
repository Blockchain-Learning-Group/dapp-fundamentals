pragma solidity 0.4.24;


contract Capsule {

    //declare the following variables: owner_, amount_ and unlocktime_
    address public owner_;
    uint256 public amount_;
    uint public unlockTime_;

    // create a constructor function that makes this contract payable
        // it should assign the variables you just declared
    constructor() public payable {
        owner_ = msg.sender;
        amount_ = msg.value;
        unlockTime_ = now + 3 minutes;
    }

    // create a send function that will send the ether back to the owner once the unlocktime has been reached
        // use the selfdestruct function to revert the contract
    function send() external {
        require(msg.sender == owner_, "msg.sender != owner");
        require(now >= unlockTime_, "Capsule not unlocked yet.");
        selfdestruct(owner_);
    }
}