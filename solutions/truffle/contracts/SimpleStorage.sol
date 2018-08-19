pragma solidity 0.4.24;

contract SimpleStorage {
    // define a uint256 variable called storedData
    uint256 storedData;

    // create a function to set() the value of storedData - change its visibility to public
    function set(uint256 x) public {
        storedData = x;
    }

    // create a function to get() the value of storedData - change its visibility to public view 
    function get() public view returns (uint256) {
        return storedData;
    }
}