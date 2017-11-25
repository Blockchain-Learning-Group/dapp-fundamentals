pragma solidity ^0.4.15;

/**
 * Inherited Contracts
 * Split out into separate files in practise.
 * Included here for ease of testing within remix.
 */

/**
 * @title ERC20 Standard Interface
 */
contract ERC20 {
  event Transfer(address indexed _from, address indexed _to, uint _value);
  event Approval(address indexed _owner, address indexed _spender, uint _value);

  /// @return total amount of tokens
  function totalSupply() external constant returns (uint256 supply) {}

  /// @param _owner The address from which the balance will be retrieved
  /// @return The balance
  function balanceOf(address _owner) external constant returns (uint256 balance) {}

  /// @notice send `_value` token to `_to` from `msg.sender`
  /// @param _to The address of the recipient
  /// @param _value The amount of token to be transferred
  /// @return Whether the transfer was successful or not
  function transfer(address _to, uint256 _value) external returns (bool success) {}

  /// @notice send `_value` token to `_to` from `_from` on the condition it is approved by `_from`
  /// @param _from The address of the sender
  /// @param _to The address of the recipient
  /// @param _value The amount of token to be transferred
  /// @return Whether the transfer was successful or not
  function transferFrom(address _from, address _to, uint256 _value) external returns (bool success) {}

  /// @notice `msg.sender` approves `_addr` to spend `_value` tokens
  /// @param _spender The address of the account able to transfer the tokens
  /// @param _value The amount of wei to be approved for transfer
  /// @return Whether the approval was successful or not
  function approve(address _spender, uint256 _value) external returns (bool success) {}

  /// @param _owner The address of the account owning tokens
  /// @param _spender The address of the account able to transfer the tokens
  /// @return Amount of remaining tokens allowed to spent
  function allowance(address _owner, address _spender) constant returns (uint256 remaining) {}
}

/**
 * @title Log Various Error Types
 */
contract LoggingErrors {
  event LogErrorString(string errorString);

  /**
   * @dev Default error to simply log the error message and return
   * @param _errorMessage The error message to log
   * @return ALWAYS false
   */
  function error(string _errorMessage) internal returns(bool) {
    LogErrorString(_errorMessage);
    return false;
  }
}

/**
 * @title SafeMath
 * @dev Math operations with safety checks that throw on error
 */
library SafeMath {
  function mul(uint256 a, uint256 b) internal constant returns (uint256) {
    uint256 c = a * b;
    assert(a == 0 || c / a == b);
    return c;
  }

  function div(uint256 a, uint256 b) internal constant returns (uint256) {
    uint256 c = a / b;
    return c;
  }

  function sub(uint256 a, uint256 b) internal constant returns (uint256) {
    assert(b <= a);
    return a - b;
  }

  function add(uint256 a, uint256 b) internal constant returns (uint256) {
    uint256 c = a + b;
    assert(c >= a);
    return c;
  }
}

/**
 * @title Basic ERC20 Token Implementation
 * @author <name>
 */
contract Token is ERC20, LoggingErrors {
  using SafeMath for uint256;
  // Token metadata
  string public constant symbol = 'BLG';
  string public constant name = 'Blockchain Learning Group Community Token';
  uint public constant decimals = 18;

  // Amount of tokens currentl in circulation
  uint256 public totalSupply_;

   // User balances of tokens
   mapping (address => uint256) public balances_;

   // Allowances that a user has given to another user in order to allow then to spend
   // tokens on their behalf
   // owner => approved spender => amount
   // ie. bob => alice => 100 means that bob has approved alice to spend 100 of his tokens.
   mapping(address => mapping (address => uint256)) public allowed_;

   address public owner_; // EOA

  event LogTokensMinted(address indexed _to, address to, uint256 value, uint256 totalSupply);

  /**
   * @dev CONSTRUCTOR - set owner account
   */
  function Token() {
    owner_ = msg.sender;
  }

  /**
   * @dev Approve a user to spend your tokens.
   * @param _spender The user to spend your tokens.
   * @param _amount The amount to increase the spender's allowance by. Totaling
   * the amount of tokens they may spend on the senders behalf.
   * @return The success of this method.
   */
  function approve(address _spender, uint256 _amount)
    external
    returns (bool)
  {
    if (_amount <= 0)
      return error('Can not approve an amount <= 0, Token.approve()');

    if (_amount > balances_[msg.sender])
      return error('Amount is greater than senders balance, Token.approve()');

    allowed_[msg.sender][_spender] = allowed_[msg.sender][_spender].add(_amount);

    return true;
  }


  /**
   * @dev Mint tokens and allocate them to the specified user.
   * @param _to The address of the recipient.
   * @param _value The amount of tokens to be minted and transferred.
   * @return Success of the transaction.
   */
  function mint (address _to, uint _value)
    external
    returns (bool)
  {
    // Only the owner may mint


    // Can't mint a value of 0!


    // Can't mint to address(0)


    // Update the total supply and balance of the _to user
    // Increase total supply my value
    // Increase _to in the balance mapping by the value


    // Logs


    return true;
  }

  /**
   * @dev send `_value` token to `_to` from `msg.sender`
   * @param _to The address of the recipient, sent from msg.sender.
   * @param _value The amount of token to be transferred
   * @return Whether the transfer was successful or not
   */
  function transfer (
    address _to,
    uint256 _value
  ) external
    returns (bool)
  {
    if (balances_[msg.sender] < _value)
      return error('Sender balance is insufficient, Token.transfer()');

    balances_[msg.sender] = balances_[msg.sender].sub(_value);
    balances_[_to] = balances_[_to].add(_value);

    Transfer(msg.sender, _to, _value);

    return true;
  }

  /**
   * @param _from The address transferring from.
   * @param _to The address transferring to.
   * @param _amount The amount to transfer.
   * @return The success of this method.
   */
  function transferFrom(address _from, address _to, uint256 _amount)
    external
    returns (bool)
  {
    // Can't transfer amount of 0!


    // Confirm from has a sufficient balance


    // Confirm sender has a sufficient allowance


    // Move the funds from the _from balance to the _to balance
    // Decrease from's balance by value
    // Incease _to's balance by value


    // Subtract the funds from the sender's allowance


    // Log


    return true;
  }

  // Constants

  /**
   * @return the allowance the owner gave the spender
   */
  function allowance(address _owner, address _spender)
    external
    constant
    returns(uint256)
  {
    return allowed_[_owner][_spender];
  }

  /**
   * @param _owner The address from which the balance will be retrieved.
   * @return The balance
   */
  function balanceOf(
    address _owner
  ) external
    constant
    returns (uint256)
  {
    return balances_[_owner];
  }

  /**
   * @return total amount of tokens.
   */
  function totalSupply ()
    external
    constant
    returns (uint256)
  {
    return totalSupply_;
  }
}
