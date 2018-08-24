pragma solidity 0.4.24;


contract SimpleStorage {
    uint256 private storedData;
    
    uint256 delay = 5 seconds;
    uint256 public wasSetLast;

    function () payable {}
    
    function acceptEther() payable {
        storedData = this.balance;
    }
    
    function set(uint256 x) {
        require(block.timestamp > wasSetLast + delay, "Delay has not passed.");
        storedData = x;
        wasSetLast = block.timestamp;
    }
    
    function get() view returns(uint256) {
        return storedData;
    }
} 