# Decentralized Application Development Fundamentals
This serves as an outline of useful resources leveraged over the duration of Blockchain Learning Group's DApp Development Fundamentals course.

## Pre-requisites and Installs
0. 20GB Disk Space(Full Node, much less if light client chosen) and 4GB of memory.
1. Python 3+
2. Node and npm
- Node.js >= v6.9.1
- [Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04)
   Ensure build-essential apt package installed as well.
- [MacOS](http://yoember.com/nodejs/the-best-way-to-install-node-js/)
   - macOS ensure you have the XCode command line tools installed.
- Use the official Node.js packages, do not use the package supplied by your distribution.

3. [Metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)
- Create an account on Kovan and share your address via the BLG slack channel.

4. [Truffle](http://truffleframework.com/)

```
npm install -g truffle
```

5. [testrpc](https://github.com/ethereumjs/testrpc)

```
npm install -g ethereumjs-testrpc
```

6. [Partiy](https://parity.io/)

Download from here and sync beforehand if possible.

- Ubuntu / Mac(potentially? Error experienced on OSX 10.11.6):
```
bash <(curl https://get.parity.io -L)
```

- [Mac Homebrew Install](https://github.com/paritytech/homebrew-paritytech/blob/master/README.md)
```
/usr/bin/ruby -e '$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)'
brew tap paritytech/paritytech
brew install parity --stable
```

Sync your node to Kovan.

Light Node recommended, faster sync and less disk usage
```
parity --chain kovan --tracing off --light
```

Full Node
```
parity --chain kovan --tracing off
```

7. [PySha3](https://pypi.python.org/pypi/pysha3)
```
pip3 install pysha3==1.0.2
```

8. [Google Chrome](https://support.google.com/chrome/answer/95346?co=GENIE.Platform%3DDesktop&hl=en-GB)


## Day 1
1. [https://ethstats.net/](https://ethstats.net/)
2. [http://ethgasstation.info/](http://ethgasstation.info/)
3. [https://etherscan.io/](https://etherscan.io/)
    * [Augur](https://etherscan.io/token/REP#readContract)
4. [https://www.ethernodes.org/](https://www.ethernodes.org/network/1)

5. Hash Function

```
$ pip3 install pysha3==1.0.2
$ python3
>>> from sha3 import keccak_256
>>> keccak_256(bytes(1)).hexdigest()
bc36789e7a1e281436464229828f817d6612f7b477d66591ff96a9e064bcc98a

>>> keccak_256(bytes(2)).hexdigest()
54a8c0ab653c15bfb48b47fd011ba2b9617af01cb45cab344acd57c924d56798
```

6. [Mining Script](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/scripts/proof_of_work_mining.py)
```
// Difficulty Increasing
python3 proof_of_work_mining.py 0066d6a68c353ec7c7726ffa7389725b6215e463baf2baf1d4f9d97b514659
python3 proof_of_work_mining.py 0006d6a68c353ec7c7726ffa7389725b6215e463baf2baf1d4f9d97b514659
python3 proof_of_work_mining.py 0000d6a68c353ec7c7726ffa7389725b6215e463baf2baf1d4f9d97b514659
```

7. [Bitcoin 51% Attack Cost](https://gobitcoin.io/tools/cost-51-attack/)

8. [Remix](https://ethereum.github.io/browser-solidity/#version=soljson-v0.4.15+commit.bbb8e64f.js)

9. [DappDeveloper.sol](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/samples/DappDeveloper.sol)

10. Exceed Block Gas Limit

_Add the below to DappDeveloper.sol_
```
uint256 value_;

function reachGasLimit() {
  for (uint256 i = 0; i < 10**18; i++) {
      value_ = i;
      value_ = i + 1;
      value_ = i + 2;
  }
}
```

11. [Voting Exercise](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/exercises/Voting.sol), [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/VotingSolution.sol)
- Define the duration of the vote
```
// Line 14
uint public constant VOTE_DURATION_BLOCKS = 10;
```

- Set the storage variables
```
// When the vote started in order to define end time
uint public startBlock_;

// Only enable users to vote once
mapping(address => bool) public hasVoted_;

// Map the name(uint for simplicity) of the candidate to the total number of votes they have
mapping(uint8 => uint) public candidateTotals_;

// List of candidates
uint8[] public candidates_;

// Winner of the vote once complete
uint8 public winner_;
```

- Set the start block of the vote.
```
// Within the constructor
startBlock_ = block.number;
```
- Confirm the start block is being set correctly. Compile and deploy.

- Complete the add candidate method.
```
/**
 * @dev Add a new candidate.
 * @param _candidate Add the candidate. Note this dynamic array
 * is iterated over to define winner, must be within block gas limit!
 */
function addCandidate(uint8 _candidate) external {
  // NOTE no check if candidate already exists..
  // NOTE no permissioning, DOS vector

  // Vote has concluded
  if (block.number > startBlock_ + VOTE_DURATION_BLOCKS) {
    tallyVote();

  // Add the new candidate
  } else {
    candidates_.push(_candidate);
    LogCandidateAdded(_candidate);
  }
}
```

- Compile and deploy the contract and confirm you may now add a candidate and access it in the candidates array.

- Complete the cast vote method.
```
/**
 * @dev Cast your vote.
 * @param _candidate The candidate you wish to vote for.
 */
function castVote(uint8 _candidate) external {
  // Vote has concluded!
  if (block.number > startBlock_ + VOTE_DURATION_BLOCKS) {
    tallyVote();

  // User may only vote once
  } else if (hasVoted_[msg.sender]) {
    LogUserHasAlreadyVoted(msg.sender);

  // Cast the vote! And set that the user has already voted
  } else {
    hasVoted_[msg.sender] = true;
    candidateTotals_[_candidate] += 1;
    LogVoteCast(msg.sender, _candidate);
  }
}
```

- Compile and deploy and confirm votes may be cast.  Add a candidate and vote for them. Confirm their total is updated and events emitted.

- Create the event for once the vote has completed.
```
event LogVoteComplete(uint8 winner);
```

- Complete the tally vote method.
```
/**
 * @dev Tally the vote and publicize the results.
 */
function tallyVote() public {
  if (block.number > startBlock_ + VOTE_DURATION_BLOCKS) {
    uint8 candidate;
    uint8 winner; // Only want to write to storage once

    // Find the winner, candidate with most votes
    for (uint8 i; i < candidates_.length; i++) {
      candidate = candidates_[i];

      if (candidateTotals_[candidate] > candidateTotals_[winner]) {
        winner = candidate;
      }
    }

    // Final write to storage
    winner_ = winner;

    LogVoteComplete(winner);

  // Vote duration has not elapsed
  } else {
    LogVoteStillActive();
  }
}
```

Usage:
- Try out your vote!
- Confirm user may only vote once.
- Confirm vote may only be tallied after the number of blocks have elapsed.
- Confirm correct winner logged.

12. [Token Exercise](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/exercises/Token.sol), [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/TokenSolution_EOD1.sol)
- Copy the exercise over to remix.
- Note LoggingErrors pattern, libraries, etc.

- Compile and deploy the contract. Confirm variables and methods available.

- Complete the mint method.
```
/**
 * @dev Mint tokens and allocate them to the specified user.
 * @param _to The address of the recipient.
 * @param _value The amount of tokens to be minted and transferred.
 * @return Success of the transaction.
 */
function mint(address _to, uint _value)
  external
  returns(bool)
{
  if (msg.sender != owner_)
    return error('msg.sender != owner, Token.mint()');

  if (_value <= 0)
    return error('Cannot mint a value of <= 0, Token.mint()');

  if (_to == address(0))
    return error('Cannot mint tokens to address(0), Token.mint()');

  totalSupply_ = totalSupply_.add(_value);
  balances_[_to] = balances_[_to].add(_value);

  LogTokensMinted(_to, _to, _value, totalSupply_);
  Transfer(address(0), _to, _value);

  return true;
}
```

- Compile deploy and confirm you can mint to an address. Confirm balance updated in balances_ mapping.

- Complete the transfer from method.
```
/**
 * @param _from The address transferring from.
 * @param _to The address transferring to.
 * @param _amount The amount to transfer.
 * @return The success of this method.
 */
function transferFrom(address _from, address _to, uint256 _amount)
  external
  returns(bool)
{
  if (_amount <= 0)
    return error('Cannot transfer amount <= 0, Token.transferFrom()');

  if (_amount > balances_[_from])
    return error('From account has an insufficient balance, Token.transferFrom()');

  if (_amount > allowed_[_from][msg.sender])
    return error('msg.sender has insufficient allowance, Token.transferFrom()');

  balances_[_from] = balances_[_from].sub(_amount);
  balances_[_to] = balances_[_to].add(_amount);

  allowed_[_from][msg.sender] = allowed_[_from][msg.sender].sub(_amount);

  Transfer(_from, _to, _amount);

  return true;
}
```

- Complete the balanceOf method to return the user's balance.
```
return balances_[_owner];
```

- Compile and deploy and confirm transfer and transferFrom working.  
- Note error logging if insufficient allowance and other errors correct.

Usage:
1. minting
2. Transfers
3. Approvals
4. TransferFrom

*Save this contract to disk. We will be using it tomorrow!*

### Homework
  - Get your parity node synced!


## Day 2
1. TestRpc
```
npm install -g ethereumjs-testrpc
testrpc
```

2. Parity Config

- Check Version and *Notify trainer if version is < 1.7.0*
```
parity -v
```

- Connect to Kovan.
```
parity --chain kovan ui
```

- Start syncing your node to Kovan now / tonight!

_Light node recommended_
```
parity --chain kovan --tracing off --light
```

_Full node_
```
parity --chain kovan --tracing off
```

3. Truffle Usage
```
$ npm install -g truffle
$ truffle version
$ mkdir ether && cd ether && truffle init
ether $ truffle compile
```

- In a separate window start testrpc.
```
$ testrpc
```

- Test and deploy.
```
ether $ truffle test
ether $ truffle migrate
```

4. DApp Development
- We are going to require 3 terminal windows for today's development session.
1. testrpc
2. Hub server
3. Truffle

- Create a folder for the course content.  We will be storing the hub and exchange in this folder
```
Development $ mkdir blg
Development $ cd blg
```

- Clone the repo
```
blg $ git clone https://github.com/Blockchain-Learning-Group/hub-template
blg $ cd hub-template
```

- In another window run your client, testrpc if it isn't already.
```
$ testrpc
```

- Copy over your token contract.
- Utilize the code written during the solidity exercise yesterday or Copy the [TokenSolution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/305c778dee2164259c091c7e037c9bd5f61466e9/solutions/TokenSolution_EOD1.sol#L106)
- And paste it within [hub-template/contracts/token/Token.sol](https://github.com/Blockchain-Learning-Group/hub-template/blob/58d7ab1ab1230fcf72bfa8a3e96acc4ba325a5ef/contracts/token/Token.sol#L14)

- Test the token's mint function
```
hub-template $ truffle test test/Token/test_mint.js
```

- Add another test case, should not be able to mint 0 tokens.
- [hub-template/test/Token/test_mint.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/edb8eef80140e0ca41869a094059b803b4ea8510/solutions/Hub/test/Token/test_mint.js#L65)
```
it('should return false and LogErrorString when minting a value of 0.', async () => {
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
  assert.notEqual(errorString.indexOf('Cannot mint a value of <= 0'), -1, 'Incorrect error message: ' + errorString);

  // Balance
  const balance = await token.balanceOf.call(user1)
  assert.equal(balance.toNumber(), 0, 'Incorrect user token balance.')

  // Total Supply
  const supply = await token.totalSupply.call()
  assert.equal(supply.toNumber(), 0, 'Incorrect total supply balance.')
})
```

- Confirm new test passing.
```
hub-template $ truffle test test/Token/test_mint.js
```

- Run the current test suite and confirm all passing, just the mint test case at this time.
```
hub-template $ truffle test
```

- Run the application server
```
hub-template $ npm install
hub-template $ truffle compile
hub-template $ cd app
app $ node server
```

- Render the app.
[http://localhost:8081](http://localhost:8081)
_Pop open the console and note the error, we must deploy our token contract._

- Deploy your token, in another terminal window. Note this should be your 3rd window. 1. testrpc, 2. App server and now 3. Truffle
```
hub-template $ truffle migrate
```

- Copy the token address from the migration output and update the address in [hub-template/app/client/js/home.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/edb8eef80140e0ca41869a094059b803b4ea8510/solutions/Hub/app/client/js/home.js#L7).

- Also copy in the token artifact json from hub-template/build/contracts/Token.json and paste into [hub-template/app/client/js/home.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/edb8eef80140e0ca41869a094059b803b4ea8510/solutions/Hub/app/client/js/home.js#L9) as tokenJson.
```
// Line 9
const tokenJson = <contents of Token.json>
```

- refresh [http://localhost:8081](http://localhost:8081)

- Interact with the token within the browser console.
```
token.address
token.totalSupply().toNumber()
```

- Run the server with the token address.
```
app $ node server --token 0xbb1ca29e60971dfa434fc1e44912a4b1082e7873
```

- Method to retrieve the total supply server side.  Add the following to [hub-template/app/server/ether.js#43](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/edb8eef80140e0ca41869a094059b803b4ea8510/solutions/Hub/app/server/ether.js#L43).
```
// Get the total supply of the token
totalSupply = (await token.totalSupply()).toNumber()
console.log('Total Supply: ' + totalSupply)
```

- Update to ui with the total supply on load adding the below to [app/client/js/home.js#464](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/edb8eef80140e0ca41869a094059b803b4ea8510/solutions/Hub/app/client/js/home.js#L1095).
```
// Set the total supply and symbol
window.totalSupply = (await token.totalSupply()).toNumber()
window.symbol = (await token.symbol()).valueOf()
$('#totalSupply').text('Total Supply: ' + totalSupply + ' ' + symbol)
```

- Create a listener for when tokens are minted, adding the below to [app/client/js/home.js#474](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/edb8eef80140e0ca41869a094059b803b4ea8510/solutions/Hub/app/client/js/home.js#L1113)
```
// Listen for tokens being minted
// Listen starting from now, 'latest'.
token.LogTokensMinted({ fromBlock: 'latest', toBlock: 'latest'})
.watch((error, result) => {
  if (error) {
    console.error(error)

  } else {
    console.log(result)
    // Update the total supply
    totalSupply += result.args.value.toNumber()
    $('#totalSupply').text('Total Supply: ' + totalSupply + ' ' + symbol)
  }
})
```

- A script exists to do exactly this for us.
- Mint some tokens. In another window, server and testrpc must be running.
```
hub-template $ cd scripts
scripts $ node mint
```

### Hub.sol
- Review the existing [hub-template/contracts/Hub.sol](https://github.com/Blockchain-Learning-Group/hub-template/blob/master/contracts/Hub.sol)

### Hub.addUser()
- Write the addUsers method within the hub. [hub-template/contracts/Hub.addUser()](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/edb8eef80140e0ca41869a094059b803b4ea8510/solutions/Hub/contracts/Hub.sol#L130)

- Also remember to add the correct event!
```
/**
 * Events
 */
// Line 60
event LogUserAdded(address user);

// Line 90
/**
 * @dev Add a new user that may write to the hub.
 * @param _userEOA User owner EOA, used as their id.
 * @param _userName Screen or real name of user.
 * @param _position Professional position.
 * @param _location Geographic location.
 * @return Success of the transaction.
 */
function addUser(
  address _userEOA,
  string _userName,
  string _position,
  string _location
)
  external
  returns (bool)
{
  // Only the owner may add users
  if (msg.sender != owner_)
    return error('msg.sender != owner, Hub.addUser()');

  // User does not exist currently, check the state enum
  if (userData_[_userEOA].state_ != State_.doesNotExist)
    return error('User already exists, Hub.addUser()');

  // Add this user's identifier to the array
  users_.push(_userEOA);

  // Add the user's data which may be retrieved by utilizing their id from
  // within the users array
  userData_[_userEOA] = User_({
    userName_: _userName,
    position_: _position,
    location_: _location,
    state_: State_.active
  });

  LogUserAdded(_userEOA);

  return true;
}
```

- Create a few tests in order to add users, [hub-template/test/Hub/test_addUser.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Hub/test/Hub/test_addUser.js).
- Create a new folder for our hub tests, test/Hub and create a file within it to test our addUser method, test/Hub/test_addUser.js.
```
const Hub = artifacts.require('./Hub.sol')
const Token = artifacts.require('./Token.sol')
let callResponse
let txResponse

contract('Hub.addUser()', accounts => {
 const owner = accounts[0]
 const user1 = accounts[1]
 const name= 'Adam Lemmon'
 const position = 'Engineer'
 const location = 'London, UK'

 it('should add a new user to the hub.', async () => {
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
```
- Run the test file and ensure it is passing.
```
hub-template $ truffle test test/Hub/test_addUser.js
```

### Token.setHub()
- Update the token mint permissioning to allow the hub to mint tokens.
- Add a method and storage var for the token to hold a reference to the hub.
- Add the storage variable, [hub-template/contracts/Token.sol#L41](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/edb8eef80140e0ca41869a094059b803b4ea8510/solutions/Hub/contracts/token/Token.sol#L45)
```
address public hub_; // Hub contract address in order to mint tokens.
```

- Add the method to set this value, [hub-template/contracts/Token.sol#L109](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/edb8eef80140e0ca41869a094059b803b4ea8510/solutions/Hub/contracts/token/Token.sol#L119)
```
/**
 * @dev Set the address of the hub contract.  This will be used to allow the hub
 * to mint tokens.
 * @param _hub The hub contract address.
 * @return Success of the transaction.
 */
function setHub (
  address _hub
) external
  returns (bool)
{
  if (msg.sender != owner_)
    return error('msg.sender != owner, Token.setHub()');

  if (_hub == address(0))
    return error('Invalid hub address, hub == address(0), Token.setHub()');

  hub_ = _hub;

  return true;
}
```

- Create the test file for this method at [hub-template/test/Token/test_setHub.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Hub/test/Token/test_setHub.js).
```
const Hub = artifacts.require('./Hub.sol')
const Token = artifacts.require('./Token.sol')
let callResponse
let txResponse

contract('Hub.setHub()', accounts => {
 const owner = accounts[0]

 it('should set the address of the hub in the token contract.', async () => {
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
```

- Confirm it is passing.
```
hub-template $ truffle test test/Token/test_setHub.js
```

- And run the entire test suite for good measure. 5 passing tests.
```
hub-template $ truffle test
```

### Token.mint()
- Update the token mint method to now allow the hub to also mint. [hub-template/contracts/token/Token.sol#L91](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/edb8eef80140e0ca41869a094059b803b4ea8510/solutions/Hub/contracts/token/Token.sol#L95).
```
// Line 91
if (msg.sender != owner_ && msg.sender != hub_)
  return error('msg.sender != owner, Token.mint()');
```

- Confirm mint still passing.
```
hub-template $ truffle test test/Token/test_mint.js
```

### Hub.addResource()
- Create the addResource test file, [hub-template/test/Hub/test_addResource.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Hub/test/Hub/test_addResource.js).

- Create the new file hub-template/test/Hub/test_addResource.js.
```
const Hub = artifacts.require('./Hub.sol')
const Token = artifacts.require('./Token.sol')
let callResponse
let txResponse

contract('Hub.addResource()', accounts => {
 const owner = accounts[0]
 const user1 = accounts[1]
 const name= 'Adam Lemmon'
 const position = 'Engineer'
 const location = 'London, UK'

 it('should add a new resource and allocte tokens to the sender.', async () => {
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

   const totalSupply = await token.totalSupply.call()
   assert.equal(totalSupply.toNumber(), 1000, 'Total supply of Token tokens is incorrect')
 })
})
```

- Confirm the failure
```
hub-template $ truffle test test/Hub/test_addResource.js
```

- Now write the method! [hub-template/contracts/Hub.sol#L81](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/edb8eef80140e0ca41869a094059b803b4ea8510/solutions/Hub/contracts/Hub.sol#L81) and copied below for reference, but don't copy and paste it!

...

If you get stuck...

...

I mean really stuck...

```
/**
 * @dev Add a new resource to the hub.
 * @param _resourceUrl The url of the resource to be added.
 * @return Success of the transaction.
 */
function addResource(string _resourceUrl)
  external
  returns (bool)
{
  // Confirm the user adding the resource is active and therefore valid
  if (userData_[msg.sender].state_ != State_.active)
    return error('User is not active, Hub.addResource()');

  // Resource cannot be empty!
  if (bytes(_resourceUrl).length == 0)
    return error('Invlaid empty resource, Hub.addResource()');

  // Generate the url id, the hash of it, and check if this id already exists.
  bytes32 id = keccak256(_resourceUrl);
  if (resources_[id].state_ != State_.doesNotExist)
    return error('Resource already exists, Hub.addResource()');

  // Mint tokens to the user, specify the resource reward in number of tokens
  // Hardcoded to 1000, consider dynamic rewards
  bool minted = Token(token_).mint(msg.sender, 1000);

  // Confirm tokens we minted successfully
  if (!minted)
    return error('Unable to mint tokens, Hub.addResource()');

  // Append the resource's id, used for lookup later
  resourceIds_.push(id);

  // Create the resource object in storage, accessible by its id
  resources_[id] = Resource_({
    url_: _resourceUrl,
    user_: msg.sender,
    reputation_: 0,
    addedAt_: block.number,
    state_: State_.active
  });

  LogResourceAdded(msg.sender, _resourceUrl, block.number);

  return true;
}
```

- And don't forget the event! [hub-template/contracts/Hub.sol#60](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/1fe65c165b0c429fe16d043f227d961b42fded3c/solutions/Hub/contracts/Hub.sol#L60)
```
event LogResourceAdded(address user, string resourceUrl, uint blockNumber);
```

- Confirm the test passes once method is complete.
```
hub-template $ truffle test test/Hub/test_addResource.js
```

- Update the migration file to set the hub address upon deployment now. [hub-template/migrations/2_deploy_contracts.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Hub/migrations/2_deploy_contracts.js) resulting in the following:
```
// Complete 2_deploy_contracts.js
const Token = artifacts.require('./Token.sol')
const Hub = artifacts.require('./Hub.sol')
const owner = web3.eth.accounts[0]

// NOTE do not make method async as truffle will not resolve when utilizing .deployed()
module.exports = deployer => {
  // Deploy Token contract
  deployer.deploy(Token, { from: owner, gas: 4e6 })
  .then(() => {
    // Deploy the hub with refernce to the token
    return deployer.deploy(Hub, Token.address, { from: owner, gas: 4e6 })

  }).then(() => {
    // Get reference to the deployed token
    return Token.deployed()

  }).then(token => {
    token.setHub(Hub.address, { from: owner, gas: 4e6 })
  })
}
```

- Confirm migration is successful.
```
hub-template $ truffle migrate --reset
```

- First update the address of the token.
- Copy the output token address of the migration to [hub-template/app/client/js/home.js#L7](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/edb8eef80140e0ca41869a094059b803b4ea8510/solutions/Hub/app/client/js/home.js#L7).

- Create a client side reference of the Hub as well adding the below lines to [hub-template/app/client/js/home.js#L480](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/edb8eef80140e0ca41869a094059b803b4ea8510/solutions/Hub/app/client/js/home.js#L659)
- Copy the hub address from the migration output
- Copy the contents of build/contracts/Hub.json
```
const hubAddress = '0x5d61309756460093947261d105e71c2f4b90220e'
// Copy the contents of ../build/contracts/Hub.json
const hubJson = <contents of Hub.json>
```

- And create a reference to the object in [hub-template/app/client/js/home.js#L804](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/edb8eef80140e0ca41869a094059b803b4ea8510/solutions/Hub/app/client/js/home.js#L1101).
```
// Create a reference to the Hub
window.hub = await web3.eth.contract(hubJson.abi).at(hubAddress)
console.log(hub)
```

- Confirm deployed hub token matches the token address, within browser console.
```
hub.token_() == token.address
```

### UI Add User
- Add a user from the ui.  Wire up the add user form at the bottom of the index.html.
- Create the listener for the button click to add a user.  [hub-template/app/client/js/home.js#792](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/d85c94b7d0088e2a7ccb3bc4b4582e361684453b/solutions/Hub/app/client/js/home.js#L1042).
```
// Line 792
$('#addUser').click(e => {
  e.preventDefault()

  // Grab values from the form
  const address = $('#address').val()
  const name = $('#name').val()
  const position = $('#position').val()
  const location = $('#location').val()

  // Send the transaction
  addUser(address, name, position, location)
})
```

- Write the method to actually add the user by sending a transaction. [hub-template/app/client/js/home.js#L806](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/d85c94b7d0088e2a7ccb3bc4b4582e361684453b/solutions/Hub/app/client/js/home.js#L1059).
```
// Line 806
/**
 * Add a new user to the hub.
 */
async function addUser(address, name, position, location) {
 const tx = await hub.addUser(address, name, position, location,
   {
     from: defaultAccount,
     gas: 4e6
   }
 )
 console.log('Tx Hash: ' + tx)
}
```

- Deploy latest contracts.
```
hub-template $ truffle migrate --reset
```

- Update the token address and json in [hub-template/app/client/js/home.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/d85c94b7d0088e2a7ccb3bc4b4582e361684453b/solutions/Hub/app/client/js/home.js#L7).

- Update the hub address and json in [hub-template/app/client/js/home.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/d85c94b7d0088e2a7ccb3bc4b4582e361684453b/solutions/Hub/app/client/js/home.js#L659)

- Add an event listener for the addUser Event. [hub-template/app/client/js/home.js#L858](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/d85c94b7d0088e2a7ccb3bc4b4582e361684453b/solutions/Hub/app/client/js/home.js#L1128)
```
// ~Line 858 - within initialieApp()
// Listen starting from now, 'latest'.
hub.LogUserAdded({ fromBlock: 'latest', toBlock: 'latest'})
.watch(async (error, result) => {
 if (error) {
   console.error(error)

 } else {
   console.log(result)
   // Get all of the associated data for this user
   const userData = await hub.userData_(result.args.user)
   userData[3] = 0 // Reputation / holdings default to 0 tokens

   // Append to the table
   appendNewUser(userData)
 }
})
```

- And the method to update the ui when a user is added, add an appendUser method to append the user to the table. [hub-template/app/client/js/home.js#L819](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/d85c94b7d0088e2a7ccb3bc4b4582e361684453b/solutions/Hub/app/client/js/home.js#L1073)
```
// ~Line 819
/**
 * Append a new user to the contributors tables.
 * @param  {Array} userData Array of user info
 */
function appendNewUser(userData) {
 $('#participantsTable').append(
   '<tr><td>'
   + userData[0] + '</td><td>' // name
   + userData[1] + '</td><td>' // position
   + userData[2] + '</td><td>' // location
   + userData[3]               // reputation
   + ' ' + symbol
   + '</td><</tr>'
 )
}
```

- Update the newsfeed when any event is caught.
- Create a listener for all token and hub events. [hub-template/app/client/js/home.js#L890](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/d85c94b7d0088e2a7ccb3bc4b4582e361684453b/solutions/Hub/app/client/js/home.js#L1144)
```
// Line 890 - within initializeApp()
// Listen for all Events for both token and hub
token.allEvents({ fromBlock: 'latest', toBlock: 'latest'})
.watch((error, result) => {
  updateNewsFeed(result)
})

hub.allEvents({ fromBlock: 'latest', toBlock: 'latest'})
.watch((error, result) => {
  updateNewsFeed(result)
})
```

- Write a method to update the ui when an event is caught. [hub-template/app/client/js/home.js#L917](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/d85c94b7d0088e2a7ccb3bc4b4582e361684453b/solutions/Hub/app/client/js/home.js#L1215)
```
// Line 917 - separate function
/**
 * Prepend a new item to the newsfeed table.
 * @param  {Object} data The event log object.
 */
async function updateNewsFeed(data) {
 let _event = data['event']

 // Parse out the log prefix
 if (_event.includes('Log'))
   _event = data['event'].replace('Log', '')

 let img
 let args

 let userData

 // Define event specific attributes(img, arguments) and prepend
 if (_event === 'UserAdded') {
   img = '<img class='d-flex mr-3 rounded-circle' src='img/userAdded.png' height='55' width='55'>'
   userData = await hub.userData_(data.args.user)
   args = 'Name: ' + userData[0] + '</br>Position: ' + userData[1] + '</br>Location: ' + userData[2]

 } else if (_event === 'ResourceAdded') {
   img = '<img class='d-flex mr-3 rounded-circle' src='img/resourceAdded.png' height='55' width='55'>'
   userData = await hub.userData_(data.args.user)
   args = data.args.resourceUrl + '</br> Added by: ' + userData[0]

 } else if (_event === 'TokensMinted') {
   img = '<img class='d-flex mr-3 rounded-circle' src='img/tokensMinted.png' height='55' width='55'>'
   userData = await hub.userData_(data.args.to)
   args = '1 BLG token minted!' + '</br> To: ' + userData[0]

 } else if (_event === 'ErrorString') {
   _event = _event.replace('String', '')
   img = '<img class='d-flex mr-3 rounded-circle' src='img/error.png' height='55' width='55'>'
   args = '' + data.args.errorString

 } else {
   _event = _event.replace('String', '')
   img = ''
   args = '' + JSON.stringify(data.args)
 }

 // Finally prepend the div to the table
 $('#newsFeed').prepend(
   '<a href='#' class='list-group-item list-group-item-action'>'
     +'<div class='media'>'
       + img
       +'<div class='media-body'>'
         +'<strong>'+ data['event'].replace('Log', '') +'</strong></br>'
         + args
         +'<div class='text-muted smaller'>Transaction: '+ data['transactionHash'].slice(0, 20) +'...</div>'
         +'<div class='text-muted smaller'>Mined at block: '+ data['blockNumber'] +'</div>'
       +'</div>'
     +'</div>'
   +'</a>'
 )
}
```

### Hub.getAllUsers()
- Finally a getAllUsers method exists in [hub-template/contracts/Hub.sol#L169](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/d85c94b7d0088e2a7ccb3bc4b4582e361684453b/solutions/Hub/contracts/Hub.sol#L169).

- Write a method to load these users. [hub-template/app/client/js/home.js#L976](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/d85c94b7d0088e2a7ccb3bc4b4582e361684453b/solutions/Hub/app/client/js/home.js#L1196)
```
// Line 976 - separate function
/**
 * Load all users within the hub.
 */
async function loadUsers() {
  // retrieve all user addresses, utilized as ids
  const users = await hub.getAllUsers()
  let userData
  let balance

  for (let i = 0; i < users.length; i++) {
    // Get each user's data and append
    userData = await hub.userData_(users[i])
    // Retrieve the user's balance from the token
    userData[3] = (await token.balanceOf(users[i])).toNumber()
    appendNewUser(userData)
  }
}
```

- Invoking this method when the page renders. [hub-template/app/client/js/home.js#L849](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/d85c94b7d0088e2a7ccb3bc4b4582e361684453b/solutions/Hub/app/client/js/home.js#L1104)
```
// ~Line 849 - within initializeApp()
loadUsers()
```

### TODO
- Load all events into news feed
- Load resources into resource table and watch for hub resource added events.

### Homework
- Get your parity node synced!
