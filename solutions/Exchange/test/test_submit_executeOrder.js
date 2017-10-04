const Exchange = artifacts.require("./Exchange.sol")
const TestToken = artifacts.require("./TestToken.sol")

contract('Exchange.submitOrder() && executeOrder()', accounts => {
  const maker = accounts[0]
  const taker = accounts[1]

  it("submitOrder(), should succeed by adding a new order to the orderBook on-chain.", async () => {
    const exchange = await Exchange.new()
    // Create token and allocate all tokens to the taker
    const tokenContract = await TestToken.new(100000, 18, "test", "test", { from: taker });

    // Order params
    const offerToken = 0
    const offerAmount = 1
    const wantToken = tokenContract.address
    const wantAmount = 100

    const call = await exchange.submitOrder.call(
      offerToken,
      offerAmount,
      wantToken,
      wantAmount,
      {
        from: maker,
        gas : 4e6,
        value: offerAmount
      }
    )

    const tx = await exchange.submitOrder(
      offerToken,
      offerAmount,
      wantToken,
      wantAmount,
      {
        from: maker,
        gas : 4e6,
        value: offerAmount
      }
    )

    assert(call, 'Call response was not true.')

    const log = tx.logs[0]
    assert.equal(log.event, 'logOrderSubmitted', 'Event not emitted')

    const orderId = await exchange.orderIds_.call(0)
    const order = await exchange.orderBook_.call(orderId)
    assert.equal(order[0], maker, 'maker incorrect')
    assert.equal(order[1], offerToken, 'offer token incorrect')
    assert.equal(order[2], offerAmount, 'offer amount incorrect')
    assert.equal(order[3], wantToken, 'want token incorrect')
    assert.equal(order[4], wantAmount, 'want amount incorrect')
    assert.equal(order[5], false, 'filled incorrect') // filled
  })

  it("executeOrder(), should succeed by trading the tokens. Maker offers ether.", async () => {
    const exchange = await Exchange.new()
    // Create token and allocate all tokens to the taker
    const tokenContract = await TestToken.new(1, 18, "test", "test", { from: taker });

    // Order params
    const offerToken = 0
    const offerAmount = 1*10e18 // 1 ether
    const wantToken = tokenContract.address
    const wantAmount = 1

    const makerBalanceBefore = web3.eth.getBalance(maker).toNumber()
    const takerBalanceBefore = web3.eth.getBalance(taker).toNumber()

    // Submit the maker's order
    await exchange.submitOrder(
      offerToken,
      offerAmount,
      wantToken,
      wantAmount,
      {
        from: maker,
        gas : 4e6,
        value: offerAmount
      }
    )

    // Approve the exchange to transfer on behalf of the taker
    await tokenContract.approve(exchange.address, wantAmount, { from: taker })

    // Taker order
    // NOTE tokens are flipped!
    const call = await exchange.submitOrder.call(
      wantToken,
      wantAmount,
      offerToken,
      offerAmount,
      {
        from: taker,
        gas : 4e6
      }
    )

    const tx = await exchange.submitOrder(
      wantToken,
      wantAmount,
      offerToken,
      offerAmount,
      {
        from: taker,
        gas : 4e6
      }
    )

    assert(call, 'Call response was not true.')

    const log = tx.logs[0]
    assert.equal(log.event, 'logOrderExecuted', 'Event not emitted')

    // Ether balances
    const makerBalanceAfter = web3.eth.getBalance(maker).toNumber()
    const takerBalanceAfter = web3.eth.getBalance(taker).toNumber()
    assert.isBelow(makerBalanceAfter, makerBalanceBefore - offerAmount, 'Maker eth balance incorrect')
    assert.isAbove(takerBalanceAfter, takerBalanceBefore, 'Taker eth balance incorrect')

    // Token balances
    const makerBalance = await tokenContract.balanceOf.call(maker)
    const takerBalance = await tokenContract.balanceOf.call(taker)
    assert.equal(makerBalance.toNumber(), wantAmount, 'Maker token balance incorrect')
    assert.equal(takerBalance.toNumber(), 0, 'Taker token balance incorrect')

    // Order updated on chain
    const orderId = await exchange.orderIds_.call(0)
    const order = await exchange.orderBook_.call(orderId)
    assert.equal(order[5], true) // filled
  })

  it("executeOrder(), should succeed by trading the tokens. Maker offers token.", async () => {
    const exchange = await Exchange.new()
    // Create token and allocate all tokens to the taker
    const tokenContract = await TestToken.new(1, 18, "test", "test", { from: maker });

    // Order params
    const offerToken = tokenContract.address
    const offerAmount = 1
    const wantToken = 0
    const wantAmount = 1*10e18 // 1 ether

    const makerBalanceBefore = web3.eth.getBalance(maker).toNumber()
    const takerBalanceBefore = web3.eth.getBalance(taker).toNumber()

    // Approve the exchange to transfer on behalf of the taker
    await tokenContract.approve(exchange.address, offerAmount, { from: maker })

    // Submit the maker's order
    await exchange.submitOrder(
      offerToken,
      offerAmount,
      wantToken,
      wantAmount,
      {
        from: maker,
        gas : 4e6
      }
    )

    // Taker order
    // NOTE tokens are flipped!
    const call = await exchange.submitOrder.call(
      wantToken,
      wantAmount,
      offerToken,
      offerAmount,
      {
        from: taker,
        gas : 4e6,
        value: wantAmount
      }
    )

    const tx = await exchange.submitOrder(
      wantToken,
      wantAmount,
      offerToken,
      offerAmount,
      {
        from: taker,
        gas : 4e6,
        value: wantAmount
      }
    )

    assert(call, 'Call response was not true.')

    const log = tx.logs[0]
    assert.equal(log.event, 'logOrderExecuted', 'Event not emitted')

    // Ether balances
    const makerBalanceAfter = web3.eth.getBalance(maker).toNumber()
    const takerBalanceAfter = web3.eth.getBalance(taker).toNumber()
    assert.isBelow(takerBalanceAfter, takerBalanceBefore - offerAmount, 'Taker eth balance incorrect')
    assert.isAbove(makerBalanceAfter, makerBalanceBefore, 'Maker eth balance incorrect')

    // Token balances
    const makerBalance = await tokenContract.balanceOf.call(maker)
    const takerBalance = await tokenContract.balanceOf.call(taker)
    assert.equal(takerBalance.toNumber(), offerAmount, 'Taker token balance incorrect')
    assert.equal(makerBalance.toNumber(), 0, 'Maker token balance incorrect')

    // Order updated on chain
    const orderId = await exchange.orderIds_.call(0)
    const order = await exchange.orderBook_.call(orderId)
    assert.equal(order[5], true) // filled
  })

  it("submitOrder(), should return false and LogErrorString when order exists.", async () => {
    const exchange = await Exchange.new()
    // Create token and allocate all tokens to the taker
    const tokenContract = await TestToken.new(100, 18, "test", "test", { from: taker });

    // Order params
    const offerToken = 0
    const offerAmount = 1*10e18 // 1 ether
    const wantToken = tokenContract.address
    const wantAmount = 100

    // Submit the same order twice
    await exchange.submitOrder(
      offerToken,
      offerAmount,
      wantToken,
      wantAmount,
      {
        from: maker,
        gas : 4e6,
        value: offerAmount
      }
    )

    const call = await exchange.submitOrder.call(
      offerToken,
      offerAmount,
      wantToken,
      wantAmount,
      {
        from: maker,
        gas : 4e6,
        value: offerAmount
      }
    )

    const tx = await exchange.submitOrder(
      offerToken,
      offerAmount,
      wantToken,
      wantAmount,
      {
        from: maker,
        gas : 4e6,
        value: offerAmount
      }
    )

    assert(!call, 'Call was not false')

    const log = tx.logs[0]
    assert.equal(log.event, 'LogErrorString', 'LogErrorString not emitted')
    const errorString = log.args.errorString;
    assert.notEqual(errorString.indexOf('Identical order is already active'), -1, "Incorrect error message: " + errorString)
  })

  it("executeOrder(), should succeed when submitted same maker and taker multiple times.", async () => {
    const exchange = await Exchange.new()
    // Create token and allocate all tokens to the taker
    const tokenContract = await TestToken.new(200, 18, "test", "test", { from: taker });

    // Order params
    const offerToken = 0
    const offerAmount = 1*10e18 // 1 ether
    const wantToken = tokenContract.address
    const wantAmount = 100

    // Submit the maker's order
    await exchange.submitOrder(
      offerToken,
      offerAmount,
      wantToken,
      wantAmount,
      {
        from: maker,
        gas : 4e6,
        value: offerAmount
      }
    )

    // Approve the exchange to transfer on behalf of the taker
    await tokenContract.approve(exchange.address, wantAmount, { from: taker })

    // Taker order
    await exchange.submitOrder(
      wantToken,
      wantAmount,
      offerToken,
      offerAmount,
      {
        from: taker,
        gas : 4e6
      }
    )

    // REPEAT

    // Submit the maker's order
    await exchange.submitOrder(
      offerToken,
      offerAmount,
      wantToken,
      wantAmount,
      {
        from: maker,
        gas : 4e6,
        value: offerAmount
      }
    )

    // Approve the exchange to transfer on behalf of the taker
    await tokenContract.approve(exchange.address, wantAmount, { from: taker })

    // Taker order
    await exchange.submitOrder(
      wantToken,
      wantAmount,
      offerToken,
      offerAmount,
      {
        from: taker,
        gas : 4e6
      }
    )
  })
})
