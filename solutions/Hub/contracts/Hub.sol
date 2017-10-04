pragma solidity ^0.4.11;

import './utils/LoggingErrors.sol';
import './token/Token.sol';
import './utils/SafeMath.sol';

/**
 * @title Template Hub
 * @dev Hub that enables users to share resources and are rewarded for contribution
 * with a given token.
 */
contract Hub is LoggingErrors {
  // Specify the reward for conttibution to the hub
  // uint public constant RESOURCE_REWARD = 1000;

  using SafeMath for uint;

  /**
   * Data Structures
   */
  // Define a user object, struct, for the attributes you wish users to have
  struct User_ {
    string userName_;
    string position_;
    string location_;
    State_ state_;
  }

  // Define a resource object, struct, for the attributes you wish resources to hold
  struct Resource_ {
    string url_;
    address user_; // user that created this resource
    uint reputation_; // # of likes, shares, etc.
    uint addedAt_; // Block number when this resource was added
    State_ state_;
  }

  // A State enum to define the current state of an object
  enum State_ { doesNotExist, active, inactive, terminated }

  /**
   * Storage
   */
  address public owner_; // owner EOA
  address public token_; // token contract

  // Array of resources ids, hash of the url
  bytes32[] public resourceIds_;
  // Map the resource ids to its associated data
  mapping(bytes32 => Resource_) public resources_;

  // Array of user ids
  address[] public users_;
  // Lookup user info based on id
  mapping(address => User_) public userData_;

  /**
   * Events
   */
   event LogResourceAdded(address user, string resourceUrl, uint blockNumber);
   event LogUserAdded(address user);

  /**
   * @dev CONSTRUCTOR - Set the address of the _blgToken
   * @param _token The blg token contract.
   */
  function Hub(address _token) {
    token_ = _token;
    owner_ = msg.sender;
  }

  /**
   * External
   */

  /**
   * @dev Add a new resource to the hub.
   * @param _resourceUrl The url of the resource to be added.
   * @return Success of the transaction.
   */
  function addResource(string _resourceUrl)
    external
    returns (bool)
  {
    // Confirm the user adding the resource is active and therefore valid
    if (userData_[msg.sender].state_ != State_.active)
      return error('User is not active, Hub.addResource()');

    // Resource cannot be empty!
    if (bytes(_resourceUrl).length == 0)
      return error('Invlaid empty resource, Hub.addResource()');

    // Generate the url id, the hash of it, and check if this id already exists.
    bytes32 id = keccak256(_resourceUrl);
    if (resources_[id].state_ != State_.doesNotExist)
      return error('Resource already exists, Hub.addResource()');

    // Mint tokens to the user, specify the resource reward in number of tokens
    bool minted = Token(token_).mint(msg.sender, 1000);

    // Confirm tokens we minted successfully
    if (!minted)
      return error('Unable to mint tokens, Hub.addResource()');

    // Append the resource's id, used for lookup later
    resourceIds_.push(id);

    // Create the resource object in storage, accessible by its id
    resources_[id] = Resource_({
      url_: _resourceUrl,
      user_: msg.sender,
      reputation_: 0,
      addedAt_: block.number,
      state_: State_.active
    });

    LogResourceAdded(msg.sender, _resourceUrl, block.number);

    return true;
  }

  /**
   * @dev Add a new user that may write to the hub.
   * @param _userEOA User owner EOD, used as their id.
   * @param _userName Screen or real name of user.
   * @param _position Professional position.
   * @param _location Geographic location.
   * @return Success of the transaction.
   */
  function addUser(
    address _userEOA,
    string _userName,
    string _position,
    string _location
  )
    external
    returns (bool)
  {
    // Only the owner may add users
    if (msg.sender != owner_)
      return error('msg.sender != owner, Hub.addUser()');

    // User does not exist currently, check the state enum
    if (userData_[_userEOA].state_ != State_.doesNotExist)
      return error('User already exists, Hub.addUser()');

    // Add this user's identifier to the array
    users_.push(_userEOA);

    // Add the user's data which may be retrieved by utilizing their id from
    // within the users array
    userData_[_userEOA] = User_({
      userName_: _userName,
      position_: _position,
      location_: _location,
      state_: State_.active
    });

    LogUserAdded(_userEOA);

    return true;
  }

  // CONSTANTS

  /**
   * @return The array of users.
   */
  function getAllUsers()
    external
    constant
    returns(address[])
  {
    return users_;
  }

  /**
   * @param _id The id of the resource to retrieve.
   * @return The resource object data.
   */
  /*function getResourceById(bytes32 _id)
    external
    constant
    returns(string, address, uint, uint)
  {
    Resource_ memory resource = resources_[_id];

    return (
      resource.url_,
      resource.user_,
      resource.reputation_,
      resource.addedAt_
    );
  }*/

  /**
   * @return The resource ids.
   */
  /*function getResourceIds()
    external
    constant
    returns(bytes32[])
  {
    return resourceIds_;
  }*/

  /**
   * @dev Get the user general data.
   * @param _user The user EOA used as identifier.
   * @return The struct of user data.
   */
  /*function getUserData(address _user)
    external
    constant
    returns(string, string, string)
  {
    User_ memory user = userData_[_user];

    return (user.userName_, user.position_, user.location_);
  }*/
}
