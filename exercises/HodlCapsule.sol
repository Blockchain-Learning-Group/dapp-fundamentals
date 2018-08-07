pragma solidity 0.4.24;


contract Capsule {

    //declare the following variables: owner_, amount_ and unlocktime_
    address public owner_;
    uint256 public amount_;
    uint public unlockTime_;

    // TODO: create a constructor function that makes this contract payable
        // it should assign the variables you just declared

    // TODO:create a send function that will send the ether back to the owner once the unlocktime has been reached
        // use the selfdestruct function to revert the contract

}