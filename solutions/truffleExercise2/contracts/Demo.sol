pragma solidity ^0.4.11;

contract Demo{
    // adding a single variable in the contract
    string public name = "shahrukh khan";

    function changeName(string newName)public {
        name = newName;
    }
}