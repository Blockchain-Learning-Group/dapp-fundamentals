pragma solidity ^0.4.15;

/*
Note libraries and dependencies split into separate files and imported here
for clarity and separation.  Recommended to follow this pattern.
 */
import './ERC20.sol';
import '../utils/SafeMath.sol';
import '../utils/LoggingErrors.sol';

/*
 NOTE Replace from here down!
*/

/**
 * @title Token Sample
 * @author Adam Lemmon <adam@blockchainlearninggroup.com>
 * @dev A reward token for participants in the BLG community.
 */
contract Token is ERC20, LoggingErrors {

  using SafeMath for uint256;

  /**
   * Storage
   *
   */
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
  address public hub_; // Hub contract address in order to mint tokens.

  /**
   * Events
   */
  event LogTokensMinted(address indexed _to, address to, uint256 value, uint256 totalSupply);

  /**
   * @dev CONSTRUCTOR - set blg owner account
   */
  function Token() {
    owner_ = msg.sender;
  }

  /**
   * External
   */

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
  function mint(address _to, uint _value)
    external
    returns (bool)
  {
    if (msg.sender != owner_ && msg.sender != hub_)
      return error('msg.sender != owner, Token.mint()');

    if (_value <= 0)
      return error('Cannot mint a value of <= 0, Token.mint()');

    if (_to == address(0))
      return error('Cannot mint tokens to address(0), Token.mint()');

    totalSupply_ = totalSupply_.add(_value);
    balances_[_to] = balances_[_to].add(_value);

    LogTokensMinted(_to, _to, _value, totalSupply_);
    Transfer(address(0), _to, _value);

    return true;
  }

  /**
   * @dev Set the address of the hub contract.  This will be used to allow the hub
   * to mint tokens.
   * @param _hub The hub contract address.
   * @return Success of the transaction.
   */
  function setHub (
    address _hub
  ) external
    returns (bool)
  {
    if (msg.sender != owner_)
      return error('msg.sender != owner, Token.setHub()');

    if (_hub == address(0))
      return error('Invalid hub address, hub == address(0), Token.setHub()');

    hub_ = _hub;

    return true;
  }

  /**
   * @dev send `_value` token to `_to` from `msg.sender`
   * @param _to The address of the recipient, sent from msg.sender.
   * @param _value The amount of token to be transferred
   * @return Whether the transfer was successful or not
   */
  function transfer(
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
    if (_amount <= 0)
      return error('Cannot transfer amount <= 0, Token.transferFrom()');

    if (_amount > balances_[_from])
      return error('From account has an insufficient balance, Token.transferFrom()');

    if (_amount > allowed_[_from][msg.sender])
      return error('msg.sender has insufficient allowance, Token.transferFrom()');

    balances_[_from] = balances_[_from].sub(_amount);
    balances_[_to] = balances_[_to].add(_amount);

    allowed_[_from][msg.sender] = allowed_[_from][msg.sender].sub(_amount);

    Transfer(_from, _to, _amount);

    return true;
  }

  // Constants

  /**
   * @return total amount of tokens.
   */
  function totalSupply()
    external
    constant
    returns (uint256)
  {
    return totalSupply_;
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
}
