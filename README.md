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

2. [Metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)

3. [Truffle](http://truffleframework.com/)

```npm install -g truffle```

Having problems? Be sure to check out the [FAQ](https://github.com/ethereumjs/testrpc/wiki/FAQ) and if you're still having issues and you're sure its a problem with testrpc

4. [testrpc](https://github.com/ethereumjs/testrpc)

```npm install -g ethereumjs-testrpc```

5. [Partiy](https://parity.io/)

Download from here and sync beforehand if possible.

Ubuntu / mac: 

```bash <(curl https://get.parity.io -L)```

Sync the node to Kovan

```parity --chain kovan --warp --mode active --tracing off --cache-size 1024```

6. [Web3](https://github.com/ethereum/wiki/wiki/JavaScript-API)

```npm install web3``` 

7. [PySha3](https://pypi.python.org/pypi/pysha3)

```pip3 install sha3```


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
npm install -g ethereum-testrpc
testrpc
```

2.Truffle Usage
```
npm install -g truffle
mkdir ether && cd ether && truffle init
truffle version
truffle compile
testrpc
truffle test
truffle migrate
```

3. DApp Development

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
   - Utilize code written during Day 1 or Copy the [TokenSolution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/305c778dee2164259c091c7e037c9bd5f61466e9/solutions/TokenSolution_EOD1.sol#L106)
   - And paste it within [contract/token/Token.sol](https://github.com/Blockchain-Learning-Group/hub-template/blob/58d7ab1ab1230fcf72bfa8a3e96acc4ba325a5ef/contracts/token/Token.sol#L14)
   - Test the token's mint function
   ```
   truffle test test/Token/test_mint.js
   ```
   - Add another test case, should not be able to mint 0 tokens
   - [Token Mint Test Case Solutions](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/517605e79d900c5439505775dff5b3ad619428fe/solutions/TokenTests/test_mints.js#L65)
   - Confirm new test passing
   ```
   truffle test test/Token/test_mint.js
   ```
   - Run the current test suite and confirm all passing, just the mint test case at this time.
   ```
   hub-template $ truffle test
   ```
   
   - Run the application server
   ```
   npm install
   truffle compile
   cd app
   node server
   ```
   
   - Load the app
   [http://localhost:8081](https://localhost:8081)
   _Pop open the console and note the error, we must deploy our token contract._

   - Deploy your token, in another terminal window. Note this should be your 3rd window. 1. testrpc, 2. App server and now 3. Truffle
   ```
   truffle migrate
   ```
   
   - Copy the token address from the migration output and update the address in [app/client/js/home.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/0e3c950d388fb822a6a4312de85c9b2d547bd582/solutions/HubApp/home.js#L12)
   - Also copy in the token artifact json from build/contracts/Token.json and paste into [app/client/js/home.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/0e3c950d388fb822a6a4312de85c9b2d547bd582/solutions/HubApp/home.js#L14) as tokenJson
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
   
   - Method to retrieve the total supply server side.  Add the following to your [initHub Method](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/3794646c23648d104a8029d01dddf4ed1ca31180/solutions/HubApp/ether.js#L36).
   ```
    // Get the total supply of the token
    totalSupply = (await token.totalSupply()).toNumber()
    console.log('Total Supply: ' + totalSupply)
   ```
   
   - Update to ui with the total supply on load adding the below to [app/client/js/home.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/3794646c23648d104a8029d01dddf4ed1ca31180/solutions/HubApp/home.js#L1103)
   ```
    // Set the total supply and symbol
    window.totalSupply = (await token.totalSupply()).toNumber()
    window.symbol = (await token.symbol()).valueOf()
    $('#totalSupply').text('Total Supply: ' + totalSupply + ' ' + symbol)
   ```
   
   - Create a listener for when tokens are minted, adding the below to [app/client/js/home.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/3794646c23648d104a8029d01dddf4ed1ca31180/solutions/HubApp/home.js#L1118)
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
   
   - Create a script to mint some tokens
   - Make a new scripts directory
   ```
   mkdir scripts && cd scripts
   ```
   - Create a new file, mint.js, for our minting script, and copy the following [mint.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/HubApp/mint.js)
   
   - Mint some tokens.
   ```
   scripts $ node mint --token 0xbb1ca29e60971dfa434fc1e44912a4b1082e7873
   ```
   - Review the existing [contracts/Hub.sol](https://github.com/Blockchain-Learning-Group/hub-template/blob/master/contracts/Hub.sol)
   - Update the deployment script to include the hub. [migrations/2_deploy_contracts.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/3794646c23648d104a8029d01dddf4ed1ca31180/solutions/HubApp/2_deploy_contracts.js#L11) adding the below lines.
   
  ```
  const Hub = artifacts.require('./Hub.sol')
   
  // Deploy Token contract
  deployer.deploy(Token, { from: owner, gas: 4e6 })
  .then(() => {
    // Deploy the hub with refernce to the token
    return deployer.deploy(Hub, Token.address, { from: owner, gas: 4e6 })
   })
  ```
   
  - Deploy the hub and token
  ```
  hub-template $ truffle migrate
  ```
  - First update the address of the token
  - Copy the output of the migration to [app/client/js/home.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/3794646c23648d104a8029d01dddf4ed1ca31180/solutions/HubApp/home.js#L12)
  - Restart the server with the new address
  ```
  ctrl+c
  node server --token 0xe23390561b9e7e75a2e0b2a3c4513e7bbc23cc5b
  ```
  
  - Create a client side reference of the Hub as well adding the below lines to [app/client/js/home.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/3794646c23648d104a8029d01dddf4ed1ca31180/solutions/HubApp/home.js#L664)
  - Copy the hub address from the migration output
  - Copy the contents of build/contracts/Hub.json
  ```
   const hubAddress = '0x5d61309756460093947261d105e71c2f4b90220e'
   // Copy the contents of ../build/contracts/Hub.json
   const hubJson = <contents of Hub.json>
  ```
 
   - And create a reference to the object in [app/client/js/home.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/3794646c23648d104a8029d01dddf4ed1ca31180/solutions/HubApp/home.js#L1108) as well.
   ```
   // Create a reference to the Hub
   window.hub = await web3.eth.contract(hubJson.abi).at(hubAddress)
   ```

   - Confirm deployed hub token matches the token address, within browser console.
   ```
   hub.token_() == token.address
   ```
   
   - Write the addUsers method within the hub. [addUser Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/8b28e021af300407747e6134df32045f33fc46e2/solutions/Hub.sol#L130)
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

   - Create a few tests in order to add users, [test_addUsers.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/HubTests/test_addUser.js)
   - Create a new folder for our hub tests, test/Hub and create a file within it to test our addUser method, test/Hub/test_addUser.js.  Solution copied below
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
   - Add the storage variable, [Token Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/8b28e021af300407747e6134df32045f33fc46e2/solutions/TokenSolution_EOD2.sol#L45)
   ```
   address public hub_; // Hub contract address in order to mint tokens.
   ```
   - Add the method to set this value, [Tokensolution.setHub](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/8b28e021af300407747e6134df32045f33fc46e2/solutions/TokenSolution_EOD2.sol#L119)
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
   - Create the test file for this method at [test/Token/test_setHub.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/TokenTests/test_setHub.js)
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
   
   - Update the migration file to set the hub address upon deployment now. [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/HubApp/2_deploy_contracts.js)
   ```
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
   ```
   
   - Update the token mint method to now allow the hub to also mint. [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/943d769a30acf0e743b581a0c02ac21a44d3e285/solutions/TokenSolution_EOD2.sol#L95)
   ```
   if (msg.sender != owner_ && msg.sender != hub_)
      return error('msg.sender != owner, Token.mint()');
   ```

   - Confirm mint still passing
   ```
   hub-template $ truffle test test/Token/test_mint.js
   ```
   
   - Create the addResource test file, [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/HubTests/test_addResource.js)
   - Create the new file test/Hub/test_addResource.js and copy the below
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
   
   - Now write the method! If you get stuck... [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/943d769a30acf0e743b581a0c02ac21a44d3e285/solutions/Hub.sol#L81)
   - And don't forget the event!
   ```
   event LogResourceAdded(address user, string resourceUrl, uint blockNumber);
   ```
   
   - Confirm the test passes once method is complete
   ```
   hub-template $ truffle test test/Hub/test_addResource.js
   ```
   
   - Add a user from the ui.  Wire up the add user from at the bottom of the index.html
   - Create the listener for the button click to add a user, [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/943d769a30acf0e743b581a0c02ac21a44d3e285/solutions/HubApp/home.js#L1047)
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
    // NOTE Add user form END
  })
   ```
   
   - Write the method to actually add the user by sending a transaction. [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/943d769a30acf0e743b581a0c02ac21a44d3e285/solutions/HubApp/home.js#L1066)
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
   
   - Update the token address and json in [app/client/js/home.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/943d769a30acf0e743b581a0c02ac21a44d3e285/solutions/HubApp/home.js#L12)
   - Update the hub address and json in [app/client/js/home.js](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/943d769a30acf0e743b581a0c02ac21a44d3e285/solutions/HubApp/home.js#L664)
   
   - Add an event listener for the addUser Event. [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/943d769a30acf0e743b581a0c02ac21a44d3e285/solutions/HubApp/home.js#L1135)
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
   
   - Update the ui when a user is added, add an appendUser method to append the user to the table. [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/943d769a30acf0e743b581a0c02ac21a44d3e285/solutions/HubApp/home.js#L1080)
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
   - Create a listener for all token and hub events. [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/943d769a30acf0e743b581a0c02ac21a44d3e285/solutions/HubApp/home.js#L1151)
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
   
   - Write a method to update the ui when an event is caught. [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/943d769a30acf0e743b581a0c02ac21a44d3e285/solutions/HubApp/home.js#L1222)
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
   
   - Finally write a method to get all users when the page is rendered.
   - A getAllUsers method exists in [Hub.sol](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/943d769a30acf0e743b581a0c02ac21a44d3e285/solutions/Hub.sol#L169)
   
   - Write a method in app/client/js/home.js to load these users. [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/943d769a30acf0e743b581a0c02ac21a44d3e285/solutions/HubApp/home.js#L1203)
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
   
   - Invoking this method when the page renders. [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/943d769a30acf0e743b581a0c02ac21a44d3e285/solutions/HubApp/home.js#L1111)
   
   ### Day 3
   - 
