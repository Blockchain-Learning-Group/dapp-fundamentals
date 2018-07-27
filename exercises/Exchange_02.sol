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


    // Confirm order does not already exist


    // Add order to the order book


    // Emit Event

  }

  /// @dev Execute an order that has been matched. NOTE msg.sender is the taker. Only allows complete fills.
  function executeOrder (bytes32 _orderId) external payable {
    // Load the order into mem, save gas on read operations


    // Confirm the taker sent the correct balance


    // Execute the trade


    // Remove the order


    // Emit Event

  }
}
