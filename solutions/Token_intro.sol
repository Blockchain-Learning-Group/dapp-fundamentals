pragma solidity 0.4.24;

contract mytoken {
  string public symbol = 'blg';
  string public name = 'blockchain learning group community token';
  
  uint256 public totalsupply_;
  mapping (address => uint256) public balances_;
  
  // rate of tokens to issue per unit of wei, 1 wei = 2 tokens
  uint256 public rate = 2; 
  
  address public owner_;
  
  event transfer(address from, address to, uint value);
  event tokensminted(address to, uint256 value, uint256 totalsupply);
  
  constructor() public {
    owner_ = msg.sender;
  }
  
  function buy() external payable {
    uint256 tokenamount = msg.value * rate;

    totalsupply_ += tokenamount;
    balances_[msg.sender] += tokenamount;

    emit tokensminted(msg.sender, msg.value, totalsupply_);
    emit transfer(address(0), msg.sender, msg.value);
  }

  function balance() external view returns(uint256) {
      return address(this).balance;
  }
  
  function transfer (address _to, uint256 _value) external {
    require(balances_[msg.sender] >= _value, 'sender balance is insufficient');

    balances_[msg.sender] -= _value;
    balances_[_to] += _value;

    emit transfer(msg.sender, _to, _value);
  }
  
  function withdraw(address _wallet) external {
    require(msg.sender == owner_, "only the owner may withdraw");
    _wallet.transfer(address(this).balance);
  }
}