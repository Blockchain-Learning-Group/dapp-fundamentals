pragma solidity 0.4.24;

// importing the batch send functionalities from the contract
// all of its functions are now available to use
import "./BatchSend.sol";


contract HodlBatchCapsule {
    // declare all the variables required for the capsule
    address public owner_;
    uint256 public amount_;
    uint256 public unlockTime_;

    // Batch structure define independent capsule
    struct Batch {
        address[] addresses;
        uint256[] values;
        uint256 unlockTime;
        uint256 totalValue;
    }
    
    // Enable only single batch to be held per capsule
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
        require(batch_.addresses.length == 0, "batch already exists, try again later...");
        batch_ = Batch(_addresses, _values, now + _unlockTime, msg.value);
    }

    // Withdraw the current batch, executing the tranfers
    function withdrawBatch() external {
        require(msg.sender == owner_, "msg.sender != owner");
        require(batch_.addresses.length > 0, "batch does not exist");
        require(now >= batch_.unlockTime, "Capsule not unlocked yet.");

        // Execute the batch, sending the eth from this contract
        batchSend_.batchSend.value(batch_.totalValue)(batch_.addresses, batch_.values);
    }   

    // Structs are private so creating a getter to read batch unlockTime
    function batchUnlockTime() external view returns(uint256) {
        return batch_.unlockTime;
    }
}