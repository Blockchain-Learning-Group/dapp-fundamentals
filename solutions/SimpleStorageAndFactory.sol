pragma solidity 0.4.24;


contract SimpleStorage {
    uint256 private storedData;
    
    function () payable {}
    
    function acceptEther() payable {
        storedData = this.balance;
    }
    
    function set(uint256 x) {
        storedData = x;
    }
    
    function get() view returns(uint256) {
        return storedData;
    }
} 


contract Factory {
    SimpleStorage simpleStorage = new SimpleStorage();
    
    function () payable {}
    
    function withdraw() {
        simpleStorage.transfer(this.balance);
    }
    
    function getSimpleStorageBalance() view returns(uint256) {
        return simpleStorage.balance;
    }
    
    function getMyBalance() view returns(uint256) {
        return this.balance;
    }
}