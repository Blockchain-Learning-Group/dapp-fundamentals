pragma solidity ^0.4.15;

/// @title ERC20 Standard Interface
contract ERC20 {
  event Transfer(address indexed _from, address indexed _to, uint _value);
  event Approval(address indexed _owner, address indexed _spender, uint _value);
  function totalSupply() external constant returns (uint256 supply) {}
  function balanceOf(address _owner) external constant returns (uint256 balance) {}
  function transfer(address _to, uint256 _value) external returns (bool success) {}
  function transferFrom(address _from, address _to, uint256 _value) external returns (bool success) {}
  function approve(address _spender, uint256 _value) external returns (bool success) {}
  function allowance(address _owner, address _spender) external constant returns (uint256 remaining) {}
}

/// @title Log Various Error Types
contract LoggingErrors {
  event LogErrorString(string errorString);

  /// @dev Default error to simply log the error message and return
  function error(string _errorMessage) internal returns(bool) {
    LogErrorString(_errorMessage);
    return false;
  }
}

/// @dev Math operations with safety checks that throw on error
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

/// @title Basic ERC20 Token Implementation
contract Token is ERC20, LoggingErrors {
  using SafeMath for uint256;

  string public constant symbol = 'BLG';
  string public constant name = 'Blockchain Learning Group Community Token';
  uint public constant decimals = 18;
  uint256 public totalSupply_;
  mapping (address => uint256) public balances_;
  mapping(address => mapping (address => uint256)) public allowed_;
  address public owner_;

  event LogTokensMinted(address indexed _to, address to, uint256 value, uint256 totalSupply);

  function approve(address _spender, uint256 _amount)
  function mint(address _to, uint _value)
    external
    returns (bool)
  function transfer (address _to, uint256 _value)
  function transferFrom(address _from, address _to, uint256 _amount)
  function allowance(address _owner, address _spender)
  function balanceOf(address _owner)
  function totalSupply()
}
