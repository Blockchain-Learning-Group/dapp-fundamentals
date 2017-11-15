const Hub = artifacts.require("./Hub.sol")
const Token = artifacts.require("./Token.sol")
let callResponse
let txResponse

contract('Hub.addUser()', accounts => {
  const owner = accounts[0]
  const user1 = accounts[1]
  const name= 'Adam Lemmon'
  const position = 'Engineer'
  const location = 'London, UK'

  it("should add a new user to the hub.", async () => {
    const blgToken = await Token.new()
    const hub = await Hub.new(blgToken.address)

    callResponse = await hub.addUser.call(user1, name, position, location, { from: owner })
    txResponse = await hub.addUser(user1, name, position, location, { from: owner })

    // Assert after tx so we can see the emitted logs in the case of failure.
    assert(callResponse, 'Call response was not true.')

    // Confirm correct event logged
    const eventLog = txResponse.logs[0]
    assert.equal(eventLog.event, 'LogUserAdded', 'LogUserAdded event was not emitted.')
    assert.equal(eventLog.args.user, user1, 'Incorrect user was emitted.')

    // Confirm storage updated correctly
    const user = await hub.users_(0)
    const userData = await hub.userData_(user)

    assert.equal(user, user1, 'User address not stored in contract')
    assert.equal(userData[0], name, 'Name not stored in contract')
    assert.equal(userData[1], position, 'Position not stored in contract')
    assert.equal(userData[2], location, 'Location not stored in contract')
    assert.equal(userData[3].valueOf(), 1, 'State of user is not active in contract')
  })
})
