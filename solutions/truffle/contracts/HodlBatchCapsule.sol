pragma solidity 0.4.24;

// import the batch send functionalities from the contract to make all of its functions available to use
import "./BatchSend.sol";


contract HodlBatchCapsule {
    // declare all the variables required for the capsule
    address public owner_;
    uint256 public amount_;
    uint256 public unlockTime_;

    // Batch structure to define independent capsule
    struct Batch {
        address[] addresses;
        uint256[] values;
        uint256 unlockTime;
        uint256 totalValue;
    }
    
    // Enable only single batch to be held per capsule by creating a private instance of the Batch struct
    // Structs may only be accessed internally and may not be defined as public
    Batch private batch_;

    // Contract instance to send batch through
    BatchSend public batchSend_;

    /*
     * @param _unlockTime how long before the capsule may be unlocked
     */
    constructor(uint256 _unlockTime) public payable {
        owner_ = msg.sender;
        amount_ = msg.value;
        unlockTime_ = now + _unlockTime;

        // New batch send contract to leverage
        batchSend_ = new BatchSend();
    }

    // Withdraw the capsule amount, destroying this capsule
    function withdraw() external {
        require(msg.sender == owner_, "msg.sender != owner");
        require(now >= unlockTime_, "Capsule not unlocked yet.");
        selfdestruct(owner_);
    }

    /*
     * Create a new capsule batch
     * @param _addresses  Who to send the batch to 
     * @param _values     How much to send to each address
     * @param _unlockTime How long to keep value locked
     */
    function createBatch(
        address[] _addresses, 
        uint256[] _values,
        uint256 _unlockTime
    )   external 
        payable
    {
        require(msg.sender == owner_, "msg.sender != owner");
        // ensure that no batch already exists
        require(batch_.addresses.length == 0, "batch already exists, try again later...");
        // create a Batch struct with filling all the variables 
        batch_ = Batch(_addresses, _values, now + _unlockTime, msg.value);
    }

    // Withdraw the current batch, executing the tranfers
    function withdrawBatch() external {
        require(msg.sender == owner_, "msg.sender != owner");
        require(batch_.addresses.length > 0, "batch does not exist");
        require(now >= batch_.unlockTime, "Capsule not unlocked yet.");

        // Execute the batch, sending the eth from this contract
        // 1. call the .batchSend method of the batchSend_ contract instance
        // 2. the .value() of the call should be the .totalValue stored in the batch_ struct
        //    - this will send ether from this contract to the batchSend contract
        // 3. include the .addresses and .values from the batch_ struct
        batchSend_.batchSend.value(batch_.totalValue)(batch_.addresses, batch_.values);
    }   

    // Structs are private so creating a getter to read batch unlockTime
    function batchUnlockTime() external view returns(uint256) {
        // return the unlockTime from the batch_ struct
        return batch_.unlockTime;
    }
}