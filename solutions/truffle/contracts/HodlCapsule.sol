pragma solidity 0.4.24;

contract HodlCapsule {
    // declare all the required variables with their visibility
    address public owner_;
    uint256 public amount_;
    uint public unlockTime_;

    // create a constructor function that will take the _unlockTime as an argument, make it both public and payable
    constructor(uint256 _unlockTime) public payable {
        // specify the owner_
        owner_ = msg.sender;
        // specify the amount_
        amount_ = msg.value;
        // specify the unlockTime_
        unlockTime_ = now + _unlockTime;
    }
    
    // Withdraw the capsule amount, destroying this capsule
    function withdraw() external {
        // require that the user trying to access the value is the owner
        require(msg.sender == owner_, "msg.sender != owner");
        // require that enough time has passed before allowing the user to unlock the value
        require(now >= unlockTime_, "Capsule not unlocked yet.");
        // use the selfdestruct method to return the value of the contract to the user
        selfdestruct(owner_);
    }
}