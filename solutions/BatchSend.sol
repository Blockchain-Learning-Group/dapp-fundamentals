pragma solidity ^0.4.24;


contract BatchSend {
    event BatchSent(address[] addresses);

//create a function here with following
//properties: external, payable and which returns a boolean
//params array of addresses called _addresses and array of uint256 called _values

    function batchSend(
        address[] _addresses, 
        uint256[] _values
    )   external
        payable
        returns(bool) 
    {
        // create a requirement that each address is associated to an value
        // HINT: think about the respective lengths
        require(_addresses.length == _values.length, "Sanity check, array lengths do not match");

        // assign a variable remaining value to the value being sent by the msg
        uint256 remainingValue = msg.value;

        // create a loop that will use the .transfer method to send the value
            // require that the remainingValue in contract is greated that value remaining
            //decrement the value in the in the remaining value variable
        for (uint8 i = 0; i < _addresses.length; i++) {
            require(remainingValue >= _values[i], "Insufficient ether sent to fill the batch");
            _addresses[i].transfer(_values[i]);
            remainingValue -= _values[i];  // sufficient underflow check in require above
        }

        // Send back any remaining value to sender, although we should take this...
        if (remainingValue > 0) {
            msg.sender.transfer(remainingValue);
        }   

        //emit an event which sends the addresses that have been paid out
        emit BatchSent(_addresses);
        return true;
    }
}