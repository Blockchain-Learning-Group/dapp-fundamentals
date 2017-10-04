const Hub = artifacts.require("./Hub.sol")
const Token = artifacts.require("./Token.sol")
let callResponse
let txResponse

contract('Hub.setHub()', accounts => {
  const owner = accounts[0]

  it("should set the address of the hub in the token contract.", async () => {
    const token = await Token.new()
    const hub = await Hub.new(token.address)

    callResponse = await token.setHub.call(hub.address, { from: owner })
    txResponse = await token.setHub(hub.address, { from: owner })

    // Assert after tx so we can see the emitted logs in the case of failure.
    assert(callResponse, 'Call response was not true.')

    // Check the hub address is correct
    const tokenHub = await token.hub_()
    assert.equal(tokenHub, hub.address, 'Hub not set correctly in token contract.')
  })
})
