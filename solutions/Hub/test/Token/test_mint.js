const Token = artifacts.require("./Token.sol")
let callResponse
let txResponse
let token

contract('Token.mint()', accounts => {
  const owner = accounts[0]
  const user1 = accounts[1]

  it("should mint new tokens and allocate to user.", async () => {
    token = await Token.new({ from: owner })
    let value = 1

    callResponse = await token.mint.call(user1, value, { from: owner })
    txResponse = await token.mint(user1, value, { from: owner })

    // Assert after tx so we can see the emitted logs in the case of failure.
    assert(callResponse, 'Call response was not true.')

    // Event emission
    const eventLog = txResponse.logs[0]
    assert.equal(eventLog.event, 'LogTokensMinted', 'LogTokensMinted event was not emitted.')
    assert.equal(eventLog.args.to, user1, 'Incorrect to was emitted.')
    assert.equal(eventLog.args.value, value, 'Incorrect value was emitted.')
    assert.equal(eventLog.args.totalSupply, value, 'Incorrect totalSupply was emitted.')

    // Balance
    const balance = await token.balanceOf.call(user1)
    assert.equal(balance.toNumber(), value, 'Incorrect user token balance.')

    // Total Supply
    const supply = await token.totalSupply.call()
    assert.equal(supply.toNumber(), value, 'Incorrect total supply balance.')
  })

  it("should return false and LogErrorString when not from owner.", async () => {
    token = await Token.new({ from: owner })

    let value = 1

    callResponse = await token.mint.call(user1, value, { from: user1 })
    txResponse = await token.mint(user1, value, { from: user1 })

    // Assert after tx so we can see the emitted logs in the case of failure.
    assert(!callResponse, 'Call response was not false.')

    // Event emission
    const eventLog = txResponse.logs[0]
    assert.equal(eventLog.event, 'LogErrorString', 'LogErrorString event was not emitted.')
    const errorString = eventLog.args.errorString;
    assert.notEqual(errorString.indexOf('msg.sender != owner'), -1, "Incorrect error message: " + errorString);

    // Balance
    const balance = await token.balanceOf.call(user1)
    assert.equal(balance.toNumber(), 0, 'Incorrect user token balance.')

    // Total Supply
    const supply = await token.totalSupply.call()
    assert.equal(supply.toNumber(), 0, 'Incorrect total supply balance.')
  })

  /**
   * Add further test cases below
   */
  it("should return false and LogErrorString when minting a value of 0.", async () => {
    token = await Token.new({ from: owner })

    let value = 0

    callResponse = await token.mint.call(user1, value, { from: owner })
    txResponse = await token.mint(user1, value, { from: owner })

    // Assert after tx so we can see the emitted logs in the case of failure.
    assert(!callResponse, 'Call response was not false.')

    // Event emission
    const eventLog = txResponse.logs[0]
    assert.equal(eventLog.event, 'LogErrorString', 'LogErrorString event was not emitted.')
    const errorString = eventLog.args.errorString;
    assert.notEqual(errorString.indexOf('Cannot mint a value of <= 0'), -1, "Incorrect error message: " + errorString);

    // Balance
    const balance = await token.balanceOf.call(user1)
    assert.equal(balance.toNumber(), 0, 'Incorrect user token balance.')

    // Total Supply
    const supply = await token.totalSupply.call()
    assert.equal(supply.toNumber(), 0, 'Incorrect total supply balance.')
  })

  it("should return false and LogErrorString when minting to address of 0.", async () => {
    token = await Token.new(owner, { from: owner })

    let value = 1

    callResponse = await token.mint.call(0, value, { from: owner })
    txResponse = await token.mint(0, value, { from: owner })

    // Assert after tx so we can see the emitted logs in the case of failure.
    assert(!callResponse, 'Call response was not false.')

    // Event emission
    const eventLog = txResponse.logs[0]
    assert.equal(eventLog.event, 'LogErrorString', 'LogErrorString event was not emitted.')
    const errorString = eventLog.args.errorString;
    assert.notEqual(errorString.indexOf('Cannot mint tokens to address(0)'), -1, "Incorrect error message: " + errorString);

    // Balance
    const balance = await token.balanceOf.call(user1)
    assert.equal(balance.toNumber(), 0, 'Incorrect user token balance.')

    // Total Supply
    const supply = await token.totalSupply.call()
    assert.equal(supply.toNumber(), 0, 'Incorrect total supply balance.')
  })
})
