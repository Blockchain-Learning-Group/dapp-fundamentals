# Decentralized Application Development Fundamentals
This serves as an outline of useful resources leveraged over the duration of Blockchain Learning Group's DApp Development Fundamentals course.

## Pre-requisites and Installs
1. Python 3+
2. Node and npm
- Node.js >= v6.9.1
- [Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04)
   Ensure build-essential apt package installed as well.
- [MacOS](http://yoember.com/nodejs/the-best-way-to-install-node-js/)
   - macOS ensure you have the XCode command line tools installed. 
- Use the official Node.js packages, do not use the package supplied by your distribution.

4. [Metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)

5. [Truffle](http://truffleframework.com/)

```npm install -g truffle```

Having problems? Be sure to check out the [FAQ](https://github.com/ethereumjs/testrpc/wiki/FAQ) and if you're still having issues and you're sure its a problem with testrpc

6. [testrpc](https://github.com/ethereumjs/testrpc)

```npm install -g ethereumjs-testrpc```

7. [Partiy](https://parity.io/)

Download from here and sync beforehand if possible.

- Ubuntu / Mac(potentially? Error experienced on OSX 10.11.6): 

```bash <(curl https://get.parity.io -L)```

- [Mac Homebrew Install](https://github.com/paritytech/homebrew-paritytech/blob/master/README.md)
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew tap paritytech/paritytech
brew install parity --stable
```

Sync the node to Kovan

```parity --chain kovan --warp --mode active --tracing off --cache-size 1024```

8. [Web3](https://github.com/ethereum/wiki/wiki/JavaScript-API)

```npm install -g web3``` 

9. [PySha3](https://pypi.python.org/pypi/pysha3)

```pip3 install sha3```

10. [Google Chrome](https://support.google.com/chrome/answer/95346?co=GENIE.Platform%3DDesktop&hl=en-GB)

## Useful Resources
### Day 1
1. [https://ethstats.net/](https://ethstats.net/)
2. [http://ethgasstation.info/](http://ethgasstation.info/)
3. [https://etherscan.io/](https://etherscan.io/)
    * [Augur](https://etherscan.io/token/REP#readContract)
    * [Golem Multi-sig Wallet](https://etherscan.io/address/0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9#code)
4. [https://www.ethernodes.org/](https://www.ethernodes.org/network/1)
5. [Metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)
6. [PySha3](https://pypi.python.org/pypi/pysha3)
```
$ pip3 install pysha3==1.0.2
$ python3
>>> from sha3 import keccak_256
>>> keccak_256(bytes(1)).hexdigest()
bc36789e7a1e281436464229828f817d6612f7b477d66591ff96a9e064bcc98a

>>> keccak_256(bytes(2)).hexdigest()
54a8c0ab653c15bfb48b47fd011ba2b9617af01cb45cab344acd57c924d56798
```
7. [Bitcoin 51% Attack Cost](https://gobitcoin.io/tools/cost-51-attack/)
8. [Remix](https://ethereum.github.io/browser-solidity/)

9. [DappDeveloper.sol](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/samples/DappDeveloper.sol)

10. Exceed Block Gas Limit

_Add the below to DappDeveloper.sol_

```
uint256 value;

function reachGasLimit() {
  for (uint256 i = 0; i < 10**18; i++) {
      value_ = i;
      value_ = i + 1;
      value_ = i + 2;
  }
}
```
11. [Voting Exercise](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/exercises/Voting.sol)

12. [Token Exercise](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/exercises/Token.sol)

### Day 2
1. TestRpc
```
npm install -g ethereumjs-testrpc
testrpc
```

2. Parity Config
```
parity ui --chain kovan
```
- Start syncing your node
```
parity ui --chain kovan --rpccorsdomain "*" --no-warp --mode active --tracing off --cache-size 1024 
```

3.Truffle Usage
```
npm install -g truffle
mkdir ether && cd ether && truffle init
truffle version
truffle compile
testrpc
truffle test
truffle migrate
```

4. DApp Development

   - Clone the repo
   ```
   git clone https://github.com/Blockchain-Learning-Group/hub-template
   cd hub-template
   ```
   
   - In another window run your client, testrpc
   ```
   testrpc
   ```
   
   - Copy over your token
   - Utilize code written during the solidity exercises or Copy the [TokenSolution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/305c778dee2164259c091c7e037c9bd5f61466e9/solutions/TokenSolution_EOD1.sol#L106)
   - And paste it within [hub-template/contracts/token/Token.sol](https://github.com/Blockchain-Learning-Group/hub-template/blob/58d7ab1ab1230fcf72bfa8a3e96acc4ba325a5ef/contracts/token/Token.sol#L14)
   - Test the token's mint function
   ```
   hub-template $ truffle test test/Token/test_mint.js
   ```
   
   - Add another test case, should not be able to mint 0 tokens
   - [hub-template/test/Token/test_mint.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/edb8eef80140e0ca41869a094059b803b4ea8510/solutions/Hub/test/Token/test_mint.js#L65)
   ```
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
   ```
  
   - Confirm new test passing
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
   
   - Load the app
   [http://localhost:8081](http://localhost:8081)
   _Pop open the console and note the error, we must deploy our token contract._

   - Deploy your token, in another terminal window. Note this should be your 3rd window. 1. testrpc, 2. App server and now 3. Truffle
   ```
   hub-template $ truffle migrate
   ```
   
   - Copy the token address from the migration output and update the address in [hub-template/app/client/js/home.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/edb8eef80140e0ca41869a094059b803b4ea8510/solutions/Hub/app/client/js/home.js#L7)
   
   - Also copy in the token artifact json from hub-template/build/contracts/Token.json and paste into [hub-template/app/client/js/home.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/edb8eef80140e0ca41869a094059b803b4ea8510/solutions/Hub/app/client/js/home.js#L9) as tokenJson
   - Restart the server
   ```
   app $ node server
   ```
   - refresh [http://localhost:8081](https://localhost:8081)
   
   - Interact with the token
   - Within the browser console
   ```
   token.address
   token.totalSupply().toNumber()
   ```
   
   - Run the server with the token address
   ```
   app $ node server --token 0xbb1ca29e60971dfa434fc1e44912a4b1082e7873
   ```
   
   - Method to retrieve the total supply server side.  Add the following to [hub-template/app/server/ether.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/edb8eef80140e0ca41869a094059b803b4ea8510/solutions/Hub/app/server/ether.js#L43).
   ```
    // Get the total supply of the token
    totalSupply = (await token.totalSupply()).toNumber()
    console.log('Total Supply: ' + totalSupply)
   ```
   
   - Update to ui with the total supply on load adding the below to [app/client/js/home.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/edb8eef80140e0ca41869a094059b803b4ea8510/solutions/Hub/app/client/js/home.js#L1095)
   ```
    // Set the total supply and symbol
    window.totalSupply = (await token.totalSupply()).toNumber()
    window.symbol = (await token.symbol()).valueOf()
    $('#totalSupply').text('Total Supply: ' + totalSupply + ' ' + symbol)
   ```
   
   - Create a listener for when tokens are minted, adding the below to [app/client/js/home.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/edb8eef80140e0ca41869a094059b803b4ea8510/solutions/Hub/app/client/js/home.js#L1113)
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
   scripts $ node mint --token 0xbb1ca29e60971dfa434fc1e44912a4b1082e7873
   ```
   ### Hub.sol
   - Review the existing [hub-template/contracts/Hub.sol](https://github.com/Blockchain-Learning-Group/hub-template/blob/master/contracts/Hub.sol)
   - Update the deployment script to include the hub. [hub-template/migrations/2_deploy_contracts.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/edb8eef80140e0ca41869a094059b803b4ea8510/solutions/Hub/migrations/2_deploy_contracts.js#L11) and your migration file should be the following:
   
  ```
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
  })
}

  ```
   
  - Compile and deploy the hub and token
  ```
  hub-template $ truffle compile
  hub-template $ truffle migrate --reset
  ```
  - First update the address of the token
  - Copy the output token address of the migration to [hub-template/app/client/js/home.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/edb8eef80140e0ca41869a094059b803b4ea8510/solutions/Hub/app/client/js/home.js#L7)
  
  - Create a client side reference of the Hub as well adding the below lines to [hub-template/app/client/js/home.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/edb8eef80140e0ca41869a094059b803b4ea8510/solutions/Hub/app/client/js/home.js#L659)
  - Copy the hub address from the migration output
  - Copy the contents of build/contracts/Hub.json
  ```
   const hubAddress = '0x5d61309756460093947261d105e71c2f4b90220e'
   // Copy the contents of ../build/contracts/Hub.json
   const hubJson = <contents of Hub.json>
  ```
 
   - And create a reference to the object in [hub-template/app/client/js/home.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/edb8eef80140e0ca41869a094059b803b4ea8510/solutions/Hub/app/client/js/home.js#L1101).
   ```
   // Create a reference to the Hub
   window.hub = await web3.eth.contract(hubJson.abi).at(hubAddress)
   ```

   - Confirm deployed hub token matches the token address, within browser console.
   ```
   hub.token_() == token.address
   ```
   
   ### Hub.addUser()
   - Write the addUsers method within the hub. [addUser Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/edb8eef80140e0ca41869a094059b803b4ea8510/solutions/Hub/contracts/Hub.sol#L130)
   - Also remember to add the correct event!
   ```
   /**
   * Events
   */
   event LogUserAdded(address user);
   
   /**
   * @dev Add a new user that may write to the hub.
   * @param _userEOA User owner EOD, used as their id.
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

   - Create a few tests in order to add users, [hub-template/test/Hub/test_addUsers.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Hub/test/Hub/test_addUser.js)
   - Create a new folder for our hub tests, test/Hub and create a file within it to test our addUser method, test/Hub/test_addUser.js.  Solution copied below.
   ```
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
   ```
   - Run the test file and ensure it is passing
   ```
   hub-template $ truffle test test/Hub/test_addUser.js
   ```
   
   - Update the token mint permissioning to allow the hub to mint tokens.
   - Add a method and storage var for the token to hold a reference to the hub.
   - Add the storage variable, [Token.hub_](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/edb8eef80140e0ca41869a094059b803b4ea8510/solutions/Hub/contracts/token/Token.sol#L45)
   ```
   address public hub_; // Hub contract address in order to mint tokens.
   ```
   
   ### Token.setHub()
   - Add the method to set this value, [Token.setHub()](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/edb8eef80140e0ca41869a094059b803b4ea8510/solutions/Hub/contracts/token/Token.sol#L119)
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
   - Create the test file for this method at [hub-template/test/Token/test_setHub.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Hub/test/Token/test_setHub.js)
   ```
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
   ```
   
   - Confirm it is passing
   ```
   hub-template $ truffle test test/Token/test_setHub.js
   ```
   - And run the entire test suite for good measure
   ```
   hub-template $ truffle test
   ```
   
   - Update the migration file to set the hub address upon deployment now. [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Hub/migrations/2_deploy_contracts.js) resulting in the following:
   ```
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

  /*
  Section 2: Not required initially until adding the hub address to the token
   */
  }).then(() => {
    // Get reference to the deployed token
    return Token.deployed()

  }).then(token => {
    token.setHub(Hub.address, { from: owner, gas: 4e6 })
  })
}
   ```
   - Confirm migration is successful
   ```
   hub-template $ truffle migrate --reset
   ```
   
   ### Token.mint()
   - Update the token mint method to now allow the hub to also mint. [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/edb8eef80140e0ca41869a094059b803b4ea8510/solutions/Hub/contracts/token/Token.sol#L95)
   ```
   if (msg.sender != owner_ && msg.sender != hub_)
      return error('msg.sender != owner, Token.mint()');
   ```

   - Confirm mint still passing
   ```
   hub-template $ truffle test test/Token/test_mint.js
   ```
   
   ### Hub.addResource()
   - Create the addResource test file, [hub-template/test/Hub/test_addResource.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/Hub/test/Hub/test_addResource.js)
   - Create the new file hub-template/test/Hub/test_addResource.js.
   ```
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
   ```
   
   - Confirm the failure
   ```
   hub-template $ truffle test test/Hub/test_addResource.js
   ```
   
   - Now write the method! If you get stuck... [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/edb8eef80140e0ca41869a094059b803b4ea8510/solutions/Hub/contracts/Hub.sol#L81) and copied below for reference, but don't copy and paste it!
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
   - And don't forget the event!
   ```
   event LogResourceAdded(address user, string resourceUrl, uint blockNumber);
   ```
   
   - Confirm the test passes once method is complete
   ```
   hub-template $ truffle test test/Hub/test_addResource.js
   ```
   
   ### UI Add User
   - Add a user from the ui.  Wire up the add user from at the bottom of the index.html
   - Create the listener for the button click to add a user, [Hub/app/client/js/home.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/d85c94b7d0088e2a7ccb3bc4b4582e361684453b/solutions/Hub/app/client/js/home.js#L1042)
   ```
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
   
   - Write the method to actually add the user by sending a transaction. [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/d85c94b7d0088e2a7ccb3bc4b4582e361684453b/solutions/Hub/app/client/js/home.js#L1059)
   ```
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
   
   - Deploy latest contracts
   ```
   hub-template $ truffle migrate --reset
   ```
   
   - Update the token address and json in [hub-template/app/client/js/home.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/d85c94b7d0088e2a7ccb3bc4b4582e361684453b/solutions/Hub/app/client/js/home.js#L7)
   - Update the hub address and json in [hub-template/app/client/js/home.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/d85c94b7d0088e2a7ccb3bc4b4582e361684453b/solutions/Hub/app/client/js/home.js#L659)
   
   - Add an event listener for the addUser Event. [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/d85c94b7d0088e2a7ccb3bc4b4582e361684453b/solutions/Hub/app/client/js/home.js#L1128)
   ```
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
   
   - And the method to update the ui when a user is added, add an appendUser method to append the user to the table. [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/d85c94b7d0088e2a7ccb3bc4b4582e361684453b/solutions/Hub/app/client/js/home.js#L1073)
   ```
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
   
   - Update the newsfeed when any event is caught
   - Create a listener for all token and hub events. [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/d85c94b7d0088e2a7ccb3bc4b4582e361684453b/solutions/Hub/app/client/js/home.js#L1144)
   ```
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
   
   - Write a method to update the ui when an event is caught. [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/d85c94b7d0088e2a7ccb3bc4b4582e361684453b/solutions/Hub/app/client/js/home.js#L1215)
   ```
   /**
    * Prepend a new item to the newsfeed table
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
       img = '<img class="d-flex mr-3 rounded-circle" src="img/userAdded.png" height="55" width="55">'
       userData = await hub.userData_(data.args.user)
       args = 'Name: ' + userData[0] + '</br>Position: ' + userData[1] + '</br>Location: ' + userData[2]

     } else if (_event === 'ResourceAdded') {
       img = '<img class="d-flex mr-3 rounded-circle" src="img/resourceAdded.png" height="55" width="55">'
       userData = await hub.userData_(data.args.user)
       args = data.args.resourceUrl + '</br> Added by: ' + userData[0]

     } else if (_event === 'TokensMinted') {
       img = '<img class="d-flex mr-3 rounded-circle" src="img/tokensMinted.png" height="55" width="55">'
       userData = await hub.userData_(data.args.to)
       args = '1 BLG token minted!' + '</br> To: ' + userData[0]

     } else if (_event === 'ErrorString') {
       _event = _event.replace('String', '')
       img = '<img class="d-flex mr-3 rounded-circle" src="img/error.png" height="55" width="55">'
       args = '' + data.args.errorString

     } else {
       _event = _event.replace('String', '')
       img = ''
       args = '' + JSON.stringify(data.args)
     }

     // Finally prepend the div to the table
     $('#newsFeed').prepend(
       '<a href="#" class="list-group-item list-group-item-action">'
         +'<div class="media">'
           + img
           +'<div class="media-body">'
             +'<strong>'+ data['event'].replace('Log', '') +'</strong></br>'
             + args
             +'<div class="text-muted smaller">Transaction: '+ data['transactionHash'].slice(0, 20) +'...</div>'
             +'<div class="text-muted smaller">Mined at block: '+ data['blockNumber'] +'</div>'
           +'</div>'
         +'</div>'
       +'</a>'
     )
   }
   ```
   
   ### Hub.getAllUsers()
   - Finally a getAllUsers method exists in [Hub.sol](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/d85c94b7d0088e2a7ccb3bc4b4582e361684453b/solutions/Hub/contracts/Hub.sol#L169)
   
   - Write a method in hub-template/app/client/js/home.js to load these users. [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/d85c94b7d0088e2a7ccb3bc4b4582e361684453b/solutions/Hub/app/client/js/home.js#L1196)
   ```
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
   
   - Invoking this method when the page renders. [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/d85c94b7d0088e2a7ccb3bc4b4582e361684453b/solutions/Hub/app/client/js/home.js#L1104)
   ```
   loadUsers()
   ```
   
   ### Day 3
   - Solution to Day 2 available here: [solutions/Hub](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/tree/master/solutions/Hub)
   - Ensure Metamask is installed and unlocked.
   
   - Clone the exchange template and install dependencies
   ```
   git clone git@github.com:Blockchain-Learning-Group/exchange-template.git
   cd exchange-template && npm install
   ```
   - Start your ethereum client, in another window
   ```
   testrpc
   ```
   
   - Start the app
   ```
   cd app
   app $ node server
   ```
   [http://localhost:9191/](http://localhost:9191/)
   
   - Compile and deploy the hub and token contracts. Ensure testrpc is running. 
   - From within the hub repo completed during day 2. Or utilizing the above solution.
   ```
   hub-template $ truffle migrate --reset
   ```
   
   - Update the exchange to interact with the hub and the token, within exchange-template/app/client/js/ether.js add the hub and token addresses and build json data. [Exchange/app/client/js/ether.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/772955ae9754b73602d90db6c77aa2d650e00236/solutions/Exchange/app/client/js/ether.js#L1102)
   ```
   const tokenAddress = '0x4519b80e842c4e8a9538997c39550dc724c28427'
   const tokenJSON = <copied form hub-template/build/contracts/Token.json>
   
   const hubAddress = '0x4519b80e842c4e8a9538997c39550dc724c28427'
   const hubJSON = <copied form hub-template/build/contracts/Hub.json>
   ```
   
   - Create instances of both the hub and token. [exchange-template/app/client/js/ether.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/2b45632be1eae613a2bcb2b62ca7bf95cc927e12/solutions/Exchange/app/client/js/ether.js#L1105)
   ```
    // Create instance of the exchange, blg token and hub
    window.token = web3.eth.contract(tokenJSON.abi).at(tokenAddress)
    window.hub = web3.eth.contract(hubJSON.abi).at(hubAddress)
   ```
   
   - Refresh the browser and ensure objects are available, hub & token in console.
   - Ensure Metamask is connected to localhost 8545
   
   - Add a listener to the submit resource button to submit a transaction. Add this in app/client/js/home.js. [exchange-template/app/client/js/home.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/772955ae9754b73602d90db6c77aa2d650e00236/solutions/Exchange/app/client/js/home.js#L7)
   ```
    // Add a resource to the blg hub
     $('#submitResource').click(e => {
       e.preventDefault()

       const resourceUrl = $('#resourceUrl').val()

       // Confirm valid input, url and url in correct format
       if (!resourceUrl) {
         $('#urlIncorrectModal').modal('show')

       // Valid, submit resource
       } else if (isUrlValid(resourceUrl)) {
         window.hub.addResource(
           resourceUrl,
           {
             from: window.defaultAccount,
             gas: 4e6
           },
           (err, res) => {
             if (err) console.log(err)
             console.log(res)
           }
         )

       } else {
         $('#urlIncorrectModal').modal('show')
       }
     })

   ```

   - Fund the Metamask account
   - Copy your address from metamask, ie. 0x9Cb47a806AC793CE9739dd138Be3b9DEB16C14E4 below.
   ```
   exchange-template $ truffle console
   truffle(development)> web3.eth.sendTransaction({ from: web3.eth.accounts[0], to: '0x9Cb47a806AC793CE9739dd138Be3b9DEB16C14E4', value: 1e18 })
   ```
   - And view the new balance within metamask of 1 ether.
   
   - Start up the hub. Note newly deployed token address
   - Update app/client/js/home.js with new token and hub address and the start the server.
   ```
   app $ node server --token 0x1079e3b563820b86bcdc3fed02129bf7e6d9f543
   ```

   - Create a listener within the exhange for when tokens are minted and to catch errors, add this to app/client/js/ether.js. [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/ba7bf4dc53795371594410ee6eca69d4edcbae87/solutions/Exchange/app/client/js/ether.js#L2472)
   ```
   /**
    * Create listeners for the BLG token.
    */
   function initBLGTokenListeners() {
     // Tokens minted. Will be the result of submitting a resource to the hub.
     window.blgToken.LogTokensMinted({ from: 'latest', to: 'latest' }).watch((err, res) => {
       if (err) {
         console.log(err)
       } else {
         console.log(res)
         openTransactionSuccessModal('BLG tokens minted.', res.transactionHash)

         // If tokens minted to user update their balance
         if (res.args.to == window.defaultAccount) {
           updateETHBalance(window.defaultAccount)
           updateTokenBalance(window.defaultAccount)
         }
       }
     })

     // Error event
     window.blgToken.LogErrorString({ from: 'latest', to: 'latest' }).watch((err, res) => {
       if (err) {
         console.log(err)
       } else {
         updateETHBalance(window.defaultAccount)
         alert('Error! \n' + res.args.errorString)
       }
     })
   }
   ```
   - And create these listeners once the token object has been created. [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/ba7bf4dc53795371594410ee6eca69d4edcbae87/solutions/Exchange/app/client/js/ether.js#L2418)
   ```
   initBLGTokenListeners()
   ```
   
   - Add a function to now get the updated token balance. [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/ba7bf4dc53795371594410ee6eca69d4edcbae87/solutions/Exchange/app/client/js/ether.js#L2600)
   ```
   /**
    * Update the default account's token balance.
    * @param  {String} user The EOA address.
    */
   function updateBLGTokenBalance(user) {
     window.blgToken.balanceOf(user, (err, balance) => {
       if (err) {
         console.error(err)
       } else {
         $('#blgBalance').text(balance.toNumber() + ' BLG') // convert wei to eth
       }
     })
   }
   ```
   
   - Add a function to now get the updated ether balance. [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/ba7bf4dc53795371594410ee6eca69d4edcbae87/solutions/Exchange/app/client/js/ether.js#L2614)
   ```
   /**
    * Update the the default account's ether balance.
    * @param  {String} user The EOA address.
    */
   function updateETHBalance(user) {
     web3.eth.getBalance(user, (err, balance) => {
       if (err) {
         console.error(err)
       } else {
         $('#etherBalance').text(balance.toNumber() / 10**18 + ' ETH') // convert wei to eth
       }
     })
   }
   ```
   
   - Submit an order!
   
   ### Exchange.sol
   - Confirm the test file is failing.
   ```
   exchange-template $ truffle test
   ```
   
   - Create the submit order function. [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/ba7bf4dc53795371594410ee6eca69d4edcbae87/solutions/Exchange/contracts/Exchange.sol#L68)
   ```
  /**
   * @dev Submit a new order to the exchange.  If you are offering ether you must
   * send the amount along with the tx to be executed.  If you are offering a token
   * you must first approve this exchange to transfer on your behalf.
   * @param  _offerToken The token being offered.
   * @param  _offerAmount The amount of tokens being offered.
   * @param  _wantToken The token that is wanted.
   * @param  _wantAmount The amount of tokens wanted.
   * @return The success of this method.
   */
  function submitOrder(
    address _offerToken,
    uint256 _offerAmount,
    address _wantToken,
    uint256 _wantAmount
  ) external
    payable
    returns(bool)
  {
    require(_offerAmount > 0);
    require(_wantAmount > 0);

    // Sufficent offer token balance
    /* TODO map the ether to a specific user */
    if (_offerToken == address(0))
      require(this.balance >= _offerAmount);

    else
      require(ERC20(_offerToken).balanceOf(msg.sender) >= _offerAmount);

    // Save writes to new storage locations
    bytes32 orderId;
    uint orderIndex;

    // check if there is a matching order
    // Invert to tokens to see if a match exists
    orderId = keccak256(_wantToken, _wantAmount, _offerToken, _offerAmount);

    // Check for existence of matching order and that it is not filled
    if (orderBook_[orderId].wantAmount != 0 && !orderBook_[orderId].filled) {
      return executeOrder(orderId); // match! msg.sender == taker

    // No match, look to add this order to the order book
    } else {
      orderId = keccak256(_offerToken, _offerAmount, _wantToken, _wantAmount);

      // Confirm an exact copy of this order does not already exist
      if (orderBook_[orderId].wantAmount != 0 && !orderBook_[orderId].filled)
        return error('Identical order is already active, Exchange.submitOrder()');

      // else add the order to the order book
      // Add id for DApp to retrieve book
      orderIds_.push(orderId);

      // Push new order object into order book
      orderBook_[orderId] = Order({
        maker: msg.sender,
        offerToken: _offerToken,
        offerAmount: _offerAmount,
        wantToken: _wantToken,
        wantAmount: _wantAmount,
        filled: false
      });

      logOrderSubmitted(
        msg.sender,
        _offerToken,
        _offerAmount,
        _wantToken,
        _wantAmount
      );

      return true;
    }
  }
  ```
  
  - Confirm the test is passing.
  ```
  exchange-template $ truffle test
  ```
  
  - Write a test case for two matching order that are to be executed. [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/ba7bf4dc53795371594410ee6eca69d4edcbae87/solutions/Exchange/test/test_submit_executeOrder.js#L58)
  ```
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
  ```
  
  - Create the executeOrder function for when two orders are matched. [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/ba7bf4dc53795371594410ee6eca69d4edcbae87/solutions/Exchange/contracts/Exchange.sol#L143)
  ```
  /**
   * @dev Execute an order that has been matched.
   * @param _orderId The id of the matched order.
   * @return The success of this method
   */
  function executeOrder(
    bytes32 _orderId
  ) private
    returns(bool)
  {
    // Load into mem to save gas on read operations
    Order memory order = orderBook_[_orderId];

    // Maker is offering ether
    if (order.offerToken == address(0)) {
      // Ether to taker
      msg.sender.transfer(order.offerAmount);
      // Tokens to maker
      ERC20(order.wantToken).transferFrom(msg.sender, order.maker, order.wantAmount);

    // Taker is offering ether
    } else if (order.wantToken == address(0)) {
      // Ether to maker
      order.maker.transfer(order.wantAmount);
      // Tokens to taker
      ERC20(order.offerToken).transferFrom(order.maker, msg.sender, order.offerAmount);
    }

    // Update to filled in storage
    orderBook_[_orderId].filled = true;

    logOrderExecuted(
      order.maker,
      msg.sender,
      order.offerToken,
      order.offerAmount,
      order.wantToken,
      order.wantAmount
    );

    return true;
  }
  ```
  
  - Confirm tests passing
  ```
  exchange-temlate $ truffle test
  ```
  
  ### Wiring it up
  - Create a listener on the submit order button to do so within app/client/js/home.js. [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/ba7bf4dc53795371594410ee6eca69d4edcbae87/solutions/Exchange/app/client/js/home.js#L36)
  ```
   $('#submitOrder').click(e => {
    e.preventDefault()

    const offerToken = $('#offerToken').val()
    const offerAmount = $('#offerAmount').val()
    const wantToken = $('#wantToken').val()
    const wantAmount = $('#wantAmount').val()

    if (offerAmount <= 0 || wantAmount <= 0) {
      alert('Invlaid input, amounts must be > 0.')
      return

    } else if (wantToken === offerToken) {
      alert('Want and offer token may not be the same!')
      return
    }

    // If offer token is eth send the ether to the exchange contract
    if (offerToken === 'ETH') {
        submitOrder(offerToken, offerAmount* 10**18, wantToken, wantAmount, offerAmount * 10**18) // convert to ether

    // If the offer token is not eth and therefore some other ERC20 token approve
    // the exchange to spend on sender's behalf
    } else if (offerToken === 'BLG') {
      // Need to check token balance TODO move verification on chain
      window.blgToken.balanceOf(window.defaultAccount, (error, balance) => {
        if (balance.toNumber() < offerAmount) {
          alert('Insufficient token balance!')

        } else {
          window.blgToken.approve(
            window.exchange.address,
            offerAmount,
            {
              from: window.defaultAccount,
              gas: 4e6
            }, (error, tx) => {
              if (error) {
                console.error(error)
              } else {
                console.log(tx)
                submitOrder(offerToken, offerAmount, wantToken, wantAmount * 10**18, 0)
              }
            }
          )
        }
      })
    }
  })
  ```
  
  - Write the function to actually submit the order, sending the transactions. [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/ba7bf4dc53795371594410ee6eca69d4edcbae87/solutions/Exchange/app/client/js/home.js#L96)
  ```
/**
 * Submit the actual order to the order book.
 * @param  {String} offerToken  The address of the token contract offered.
 * @param  {Number} offerAmount The amount of tokens offered.
 * @param  {String} wantToken  The address of the token contract wanted.
 * @param  {Number} wantAmount The amount of tokens wanted.
 * @param  {Number} value The ether value to send along with the tx. Used in the case
 * when offering ether to transfer the value to the exchange to broker the trade.
 */
function submitOrder(offerToken, offerAmount, wantToken, wantAmount, value) {
  window.exchange.submitOrder(
    window.approvedTokens[offerToken],
    offerAmount,
    window.approvedTokens[wantToken],
    wantAmount,
    {
      from: window.defaultAccount,
      gas : 4e6,
      value: value
    }, (error, tx) => {
      if (error)
        console.error(error)
      else
        console.log(tx)
    }
  )
}
  ```
  
  - Update the approved token address and symbol. [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/ba7bf4dc53795371594410ee6eca69d4edcbae87/solutions/Exchange/app/client/js/ether.js#L2387)
  
  - Now let's deploy our exchange and tell the ui about it.
  ```
  exchange-template $ truffle migrate
  ```
  
  - Update app/client/js/ether.js with the exchange's address and build json data. [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/ba7bf4dc53795371594410ee6eca69d4edcbae87/solutions/Exchange/app/client/js/ether.js#L8)
  
  - Create an instance of the exchange. [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/ba7bf4dc53795371594410ee6eca69d4edcbae87/solutions/Exchange/app/client/js/ether.js#L2412)
  ```
   window.exchange = web3.eth.contract(exchangeJSON.abi).at(exchangeAddress)
  ```
  
  - Submit an order!
  
  ### Listeners
  - Create listeners for the Exchange. [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/ba7bf4dc53795371594410ee6eca69d4edcbae87/solutions/Exchange/app/client/js/ether.js#L2503)
  ```
/**
 * Create listeners for the exchange contract.
 */
function initExchangeListeners() {
  // Listen for all exchange events
  window.exchange.allEvents({ from: 'latest', to: 'latest' }).watch((error, res) => {
    if (error) console.log(error)

    console.log(res)

    if (res.event === 'logOrderSubmitted') {
      // Update balances - eth may have been transferred to exchange
      updateETHBalance(window.defaultAccount)
      const { maker, offerToken, offerAmount, wantToken, wantAmount } = res.args
      // Append new order to order book table
      appendOrder(maker, offerToken, offerAmount, wantToken, wantAmount)
      openTransactionSuccessModal('Order Submitted.', res.transactionHash)

    } else if (res.event === 'logOrderExecuted') {
      openTransactionSuccessModal('Order Executed.', res.transactionHash)

      // Update balances
      updateETHBalance(window.defaultAccount)
      updateTokenBalance(window.defaultAccount)

      // Color the row grey showing it has been filled
      const id = '#' + res.args.offerToken + res.args.offerAmount + res.args.wantToken + res.args.wantAmount
      $(id).remove()

    } else if (res.event === 'LogErrorString') {
      updateETHBalance(window.defaultAccount)
      alert('Error! \n' + res.args.errorString)
    }
  })
}
  ```
  
  - Create the listeners once the exchange object has been created. [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/ba7bf4dc53795371594410ee6eca69d4edcbae87/solutions/Exchange/app/client/js/ether.js#L2417)
  ```
  initExchangeListeners()
  ```
  
  - Submit an order!
  
  - Write a function to load the order book. [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/ba7bf4dc53795371594410ee6eca69d4edcbae87/solutions/Exchange/app/client/js/ether.js#L2569)
  ```
/**
 * Load the contents of the order book.
 */
function loadOrderBook() {
  window.exchange.getOrderBookIds.call((error, ids) => {
    // Get order data and load for each returned id
    for (let i = 0; i < ids.length; i++) {
      window.exchange.orderBook_.call(ids[i], (err, order) => {
        // If the order is not filled then append
        if (!order[5]) {
          appendOrder(order[0], order[1], order[2], order[3], order[4])
        }
      })
    }
  })
}
  ```
  
  - Load the order book once contracts are instantiated. [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/ba7bf4dc53795371594410ee6eca69d4edcbae87/solutions/Exchange/app/client/js/ether.js#L2424)
  ```
  loadOrderBook()
  ```
  
  - And confirm the current orders are all rendered into the table on load.
  
  - Finally let's also load the user's ether and token balances on load. [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/ba7bf4dc53795371594410ee6eca69d4edcbae87/solutions/Exchange/app/client/js/ether.js#L2422)
 
  - Get your parity node synced!
  
  ## Day 4
  ### Deployment
  - Run your ethereum client.
  ```
  parity ui --chain kovan --rpccorsdomain "*" --no-warp --mode active --tracing off --cache-size 1024
  ```
  
  - If troubles connecting to ui update ui and dapps ports
  ```
  parity ui --chain kovan --rpccorsdomain "*" --no-warp --mode active --tracing off --cache-size 1024 --ui-port 3333 --dapps-port 4444
  ```
  
  - Fund your parity account, BLG trainer will be able to send the required funds to each provider user address.
  
  - Deploy the hub and token
  ```
  hub-template $ truffle migrate
  ```
  - View the contracts and txs at https://kovan.etherscan.io/address/<address of token / hub>, [Example](https://kovan.etherscan.io/address/0xc6cccf463b30d8f79159435edccb348dcec5023c)
  - Update the hub and token address at hub-template/app/client/js/home.js 
  - Update the hub and token address at exchange-template/app/client/js/ether.js
  - Also don't forget to update the mapping of address to token symbol for the ui
  ```
  window.tokenAddressToSymbol = {
    '0x0000000000000000000000000000000000000000': 'ETH',
    '<newAddress>': 'BLG'
  }
  ```
  
  - Start the hub
  ```
  hub-template/app $ node server --token <tokenAddress>
  ```
  
  - Add your Metamask address to the hub.
  - View your transaction on Kovan https://kovan.etherscan.io/tx/<tx id(accessible direct in parity)>, [Example](https://kovan.etherscan.io/tx/0x33137753b9798c1c3a123a53cf1f36476c6d0f415cb126d2bd8166d716313975)
  
  - Deploy the exchange
  ```
  exchange-template $ truffle migrate
  ```
  - Update the exchange address at exchange-template/app/client/js/ether.js 
  
  - Start the exchange server
  ```
  app $ node server
  ```
  - Fund your metamask account.  You may now send ether from your account directly in parity or within the truffle console as below.
  ```
  $ truffle console
  > web3.eth.sendTransaction({ from: web3.eth.accounts[0], to: '0x9Cb47a806AC793CE9739dd138Be3b9DEB16C14E4', value: 1e18 })
  ```
  
  ### IPFS
  - Deploy the exchange to ipfs and share with your friends and colleagues!
  ```
  cd exchange/deploy
  deploy $ python3 deploy_to_ipfs.py
  
**********************************
* Success, App deployed to IPFS! *
**********************************


**********************************************************************************************
* Naviagte to: https://ipfs.io/ipfs/QmRppv7LMa5LXEJjGFqg5wVAAMon3kForG7Jy8xxG1EaCj/home.html *
**********************************************************************************************
```
   - Navigate to your truly decentralized app! [Example](https://ipfs.io/ipfs/QmRppv7LMa5LXEJjGFqg5wVAAMon3kForG7Jy8xxG1EaCj/home.html)
  
  ### Bonus Challenge
  1. Additional Token Support
  - Add support for other tokens and re deploy.  Coordinate with the your fellow course participants!
  
  2. Gas Optimizations
  - Retrieve all exchange orders by querying events and not using a storage array.
  - Retrieve all hub users by querying events and not user a storage array as well.
  
