# Blockchain Learning Group Inc. Community Hub
## DApp Developmnet Fundamentals Quick Start
1. Clone Me :)
```
$ cd /fav_dir/
$ git clone git@github.com:Blockchain-Learning-Group/community-hub.git
$ cd community-hub
```

2. Checkout Correct Branch
```
community-hub $ git checkout non_upgradeable
```

3. Install Dependencies
```
community-hub $ npm install
```

4. Run an Ethereum Client

  *In a separate terminal window / tab.*
```
$ testrpc
```

5. Compile All Contracts
```
community-hub $ truffle compile
```

6. Execute Test Suite
```
community-hub $ truffle test
```

7. Deploy All Contracts
```
community-hub $ truffle migrate
```

8. Update the Client with Deployed Contract Addresses

  *community-hub/app/client/js/home.js#L27*
```
const HubAddress = <deployed Hub address>
ie. const HubAddress = '0x4519b80e842c4e8a9538997c39550dc724c28427'
```

  *community-hub/app/client/js/home.js#L619*
```
const blgTokenAddress = <deployed BLG address>
ie. const blgTokenAddress = '0xfec1266f7e026363be4a7b0d10df790bbd92bff4'
```

9. Start the Server, specifying contract addresses
```
community-hub $ cd app
app $ node server --hub <hubAddress> --blgToken <blgAddress>
ie. node server --hub 0x77cb1679e814b92e0a5fedacebd2fa52a2ac1d24 --blgToken 0x26aab24a2a4002fae820419888fa23d07f121e1b
```

10. Navigate to http://localhost:8081

## Populating the hub
1. Add users
- update scripts/addUsers.js by adding all user information you wish to add
```
$ npm run addUsers -- --hub <hubAddress>
```

2. Add resources
- update scripts/addResources.js by adding all resource info you wish to add
```
$ npm run addResources -- --hub <hubAddress>
```
