pragma solidity 0.4.24;


contract BatchSend {
    event BatchSent(address[] addresses);

    function batchSend(
        address[] _addresses, 
        uint256[] _values
    )   external 
        payable
        returns(bool) 
    {

        require(_addresses.length == _values.length, "Sanity check, array lengths do not match");

        // Counter to ensure no value from contract being used
        uint256 remainingValue = msg.value;

        for (uint8 i = 0; i < _addresses.length; i++) {
            require(remainingValue >= _values[i], "Insufficient ether sent to fill the batch");
            _addresses[i].transfer(_values[i]);
            remainingValue -= _values[i];  // sufficient underflow check in require above
        }

        // Send back any remaining value to sender, although we should take this...
        if (remainingValue > 0) {
            msg.sender.transfer(remainingValue);
        }   

        emit BatchSent(_addresses);
        return true;
    }
}