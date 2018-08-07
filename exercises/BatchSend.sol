pragma solidity ^0.4.24;


contract BatchSend {
    event BatchSent(address[] addresses);

//create a constructor function here with following
//properties: external, payable and which returns a boolean
//params array of addresses called _addresses and array of uint256 called _values

    function batchSend(
        address[] _addresses, 
        uint256[] _values
    )   external
        payable
        returns(bool) 
    {
        // TODO: create a requirement that each address is associated to an value
        // HINT: think about the respective lengths

        //TODO: assign a variable remaining value to the value being sent by the msg

        //TODO: create a loop that will use the .transfer method to send the value
            //require that the remainingValue in contract is greated that value remaining
            //decrement the value in the in the remaining value variable


        // TODO: Send back any remaining value to sender, although we should take this...


        // TODO: emit an event which sends the addresses that have been paid out

    }
}