pragma solidity ^0.4.15;

/**
 * @title Dapp Developer First Contract
 * Create and deploy a first smart contract.
 */
contract DappDeveloper {
  /**
   * Storage variables
   */
  string public name_;
  string public currentLocation_;

  /**
   * @dev Contract constructor
   * @param _name Your name.
   */
  function DappDeveloper(string _name) public {
    name_ = _name;
  }

  /**
   * @dev Set your current location.
   * @param _location Current location.
   */
  function setLocation(string _location) external {
    currentLocation_ = _location;
  }
}
