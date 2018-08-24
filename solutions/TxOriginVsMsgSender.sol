pragma solidity 0.4.24;


contract SimpleStorage {
    function checkMsg() {
        require(tx.origin==msg.sender, "SimpleStorage: msg.sender!=tx.origin");
    }
}

contract ContractFactory {
    SimpleStorage simpleStorage = new SimpleStorage();
 
    function checkMsg() {
        require(tx.origin==msg.sender, "ContractFactory: msg.sender!=tx.origin");
        simpleStorage.checkMsg();
    }
}