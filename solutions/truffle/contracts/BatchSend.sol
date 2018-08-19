pragma solidity ^0.4.24;


contract BatchSend {
    event BatchSent(address[] addresses);

    function batchSend(
        address[] _addresses, 
        uint256[] _values
    )   external
        payable
        returns(bool) 
    {
        // ensures that each address has an associated value to be sent
        require(_addresses.length == _values.length, "Sanity check, array lengths do not match");

        // counter to ensure no value from contract being used, only the ether sent to the contract is available
        uint256 remainingValue = msg.value;

        // create a loop to iterate through each address and ether to send all transactions.
        for (uint8 i = 0; i < _addresses.length; i++) {
            // require that the user has sent enough ether to send to the appropriate users
            require(remainingValue >= _values[i], "Insufficient ether sent to fill the batch");
            // user the .transfer(<value>) method to send ether to the specified addresses
            _addresses[i].transfer(_values[i]);
            // decrease the remainingValue based on the amount sent to the address in this iteration
            remainingValue -= _values[i]; 
        }

        // send back any remaining value to sender using an if statement checking the remainingValue
        if (remainingValue > 0) {
            // send back remaining ether to the user
            msg.sender.transfer(remainingValue);
        }   

        // emit the event declared with the appropriate argument
        emit BatchSent(_addresses);

        return true;
    }
}