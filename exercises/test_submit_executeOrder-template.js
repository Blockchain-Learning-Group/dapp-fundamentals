const Exchange = artifacts.require("./Exchange.sol")
const Token = artifacts.require("./Token.sol")

contract('Exchange.submitOrder() && executeOrder()', accounts => {
  let orderId
  let exchange
  let token

  /**********************************
  * Define maker and taker accounts *
  **********************************/


  it("submitOrder(), should succeed by adding a new order to the orderBook on-chain.", async () => {
    /**********************************
    * Deploy a new token and exchange *
    **********************************/


    /**********************
    * Define order params *
    **********************/


    /**************************************************
    * Setup the tx, mint tokens and provide allowance *
    **************************************************/


    /*******************
    * Submit the order *
    *******************/


    /************************************
    * Confirm the correct event emitted *
    ************************************/


    /********************************
    * Confirm on chain order stored *
    ********************************/

  })

  it("executeOrder(), should succeed by trading the tokens. Maker bids ether.", async () => {
    /********************************
    * Get ETH balances before trade *
    ********************************/


    /********************
    * Execute the order *
    ********************/


    /*******************************
    * Confirm correct event logged *
    *******************************/


    /*********************************
    * Confirm token balances correct *
    *********************************/


    /*******************************
    * Confirm ETH balances correct *
    *******************************/


    /**************************
    * Confirm does not exist! *
    **************************/
    
  })
})
