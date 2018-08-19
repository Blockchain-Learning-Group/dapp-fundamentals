pragma solidity 0.4.24;

contract SimpleStorage {
    uint256 storedData;

    function set(uint256 x) {
        storedData = x;
    }

    function get() returns (uint256) {
        return storedData;
    }
}