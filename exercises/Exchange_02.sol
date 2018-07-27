pragma solidity ^0.4.24;

import "./Token.sol";

/// @title Minimalistic Decentralized Exchange, Atomic Swaps
contract Exchange {
  struct Order {
    address maker;
    address bidToken;
    uint256 bidAmount;
    address askToken;
    uint256 askAmount;
  }

  mapping(bytes32 => Order) public orderBook_;

  // Events
  event OrderSubmitted (bytes32 id, address maker, address bidToken, uint256 bidAmount, address askToken,uint256 askAmount);
  event OrderExecuted (bytes32 id, address maker, address taker, address bidToken, uint256 bidAmount, address askToken, uint256 askAmount);

  /// @dev Submit a new order to the exchange.
  /// The exchange only supports the sale of tokens for ether! The only pairing supported is TOK / ETH.
  function submitOrder (
    address _bidToken,
    uint256 _bidAmount,
    address _askToken,
    uint256 _askAmount
  ) external
  {
    // Sufficent token balance, allowance, given to the exchange
    require(Token(_bidToken).allowance(msg.sender, this) >= _bidAmount, "Insufficient allowance given.");

    // Confirm order does not already exist
    bytes32 orderId = keccak256(msg.sender, _bidToken, _bidAmount, _askToken, _askAmount);
    require(orderBook_[orderId].askAmount == 0, "Order already exists."); // check for existence, default to 0, assume no one is giving tokens away for free

    // Add order to the order book
      orderBook_[orderId] = Order({
        maker: msg.sender,
        bidToken: _bidToken,
        bidAmount: _bidAmount,
        askToken: _askToken,
        askAmount: _askAmount
      });

    // Emit Event
    emit OrderSubmitted(orderId, msg.sender, _bidToken,_bidAmount, _askToken, _askAmount);
  }

  /// @dev Execute an order that has been matched. NOTE msg.sender is the taker. Only allows complete fills.
  function executeOrder (bytes32 _orderId) external payable {
    // Load the order into mem, save gas on read operations
    Order memory order = orderBook_[_orderId];

    // Confirm the taker sent the correct balance
    require(msg.value == order.askAmount);

    // Execute the trade
    order.maker.transfer(order.askAmount);
    require(Token(order.bidToken).transferFrom(order.maker, msg.sender, order.bidAmount), "transferFrom failed.");

    // Remove the order


    // Emit Event

  }
}
