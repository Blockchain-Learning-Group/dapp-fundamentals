pragma solidity 0.4.24;

contract SimpleStorage {
    uint256 storedData;
    
    function acceptEther() public payable {
        storedData = this.balance;
    }
    
    function set(uint256 x) {
        storedData = x;
    }
    
    function get() view returns (uint256) {
        return storedData;
    }
    
    function withdraw() {
        msg.sender.transfer(this.balance);
    }
    
    function getMyBalance() view returns(uint256) {
        return this.balance;
    }
}