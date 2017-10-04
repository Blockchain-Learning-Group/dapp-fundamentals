const Hub = artifacts.require("./Hub.sol")
const Token = artifacts.require("./Token.sol")
let callResponse
let txResponse

contract('Hub.addResource()', accounts => {
  const owner = accounts[0]
  const user1 = accounts[1]
  const name= 'Adam Lemmon'
  const position = 'Engineer'
  const location = 'London, UK'

  it("should add a new resource and allocte tokens to the sender.", async () => {
    const token = await Token.new()
    const hub = await Hub.new(token.address)
    let resource = 'https://github.com'

    // Set the hub address in order to mint tokens
    await token.setHub(hub.address, { from: owner })
    // Add the user that will be adding the resource
    await hub.addUser(user1, name, position, location, { from: owner })

    callResponse = await hub.addResource.call(resource, { from: user1 })
    txResponse = await hub.addResource(resource, { from: user1 })

    // Assert after tx so we can see the emitted logs in the case of failure.
    assert(callResponse, 'Call response was not true.')

    // Correct event
    const eventLog = txResponse.logs[0]  // Note 0 is the user being added
    assert.equal(eventLog.event, 'LogResourceAdded', 'LogResourceAdded event was not emitted.')
    assert.equal(eventLog.args.resourceUrl, resource, 'Incorrect url was emitted.')
    assert.equal(eventLog.args.user, user1, 'Incorrect user was emitted.')

    // Check user's token balance increased as well as the total supply
    const balance = await token.balanceOf.call(user1)
    assert.equal(balance.toNumber(), 1000, 'User did not receive correct amount of Token tokens')

    const totalSupply = await token.totalSupply.call(user1)
    assert.equal(totalSupply.toNumber(), 1000, 'Total supply of Token tokens is incorrect')
  })
})
