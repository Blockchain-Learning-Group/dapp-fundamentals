pragma solidity ^0.4.24;

contract DappDeveloper {
  // Storage variables
  string public name_;
  string public currentLocation_;

  // Set your name, @param _name Your name.
  constructor(string _name) public {
    name_ = _name;
  }

  // Set your current location, @param _location Current location.
  function setLocation(string _location) external {
    currentLocation_ = _location;
  }
}
