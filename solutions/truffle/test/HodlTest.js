// include the HodlCapsule.sol contract and pass it as an artifact to the HodlContract variable
const HodlContract = artifacts.require("./HodlCapsule.sol");

// use the contract object to "Test the hodl contract" with a callback function with accounts as a param\
contract("Test the hodl contract", function(accounts) {
    // use the describe function to "deploy the hodl smart contract" with a callback function with no params
    describe("deploy the hodl smart contract", () => {
        // use the describe function to "deploy the hodl smart contract" with an async callback function with no params
        it("catch an instance of the contract", async () => {
            // create a .new() instance of HodlContract saving it to hodl
            const hodl = await HodlContract.new(0, {from: accounts[0]});
            // check that an instance of the contract was created -- include an error message
            assert.isNotNull(hodl, "contract not deployed");
        });
    });

    // use the describe function - the withdraw function "should fail when not unlocked" with a callback function with no params
    describe("should fail when not unlocked", () => {
        // use the it function - the withdraw function "should fail if wrong user calls it" with an async callback function
        it("should fail if wrong user calls it", async () => {
            //define the owner and other account
            const owner = accounts[0];
            const other = accounts[1];

            // create a .new() instance of HodlContract saving it to hodl - from the owner account with unlocktime param being 0
            const hodl = await HodlContract.new(0, { from: owner });
            // try calling the withdraw function from the other account
            try {
                await hodl.withdraw({ from: other });
                assert(false, "did not raise error");
            // create a catch block to ensure that the error is thrown - if not, the assertion above will fail the test
            } catch(err) {
                return;
            }  
        });

        // use the it function - the withdraw function "should fail before unlock time" with an async callback function
        it("should fail before unlock time", async () => {
            //define the owner
            const owner = accounts[0];
            // create a .new() instance of HodlContract saving it to hodl - from the owner account with unlocktime param being 1
            const hodl = await HodlContract.new(1, { from: owner });

             // try calling the withdraw function from the owner account
            try {
                await hodl.withdraw({ from: owner });
                assert(false, 'did not raise error');
             // create a catch block to ensure that the error is thrown - if not, the assertion above will fail the test
            } catch(err) {
                return;
            }
        });
    });

    // use the describe function, the withdraw function "should return value once both conditions are met" with a callback function with no params
    describe("should return value once both conditions are met", () => {
        // use the it function - the "contract should collect appropriate value from wallet" with an async callback function
        it("contract should collect appropriate value from wallet", async () => {
            // define owner
            const owner = accounts[0];
            // get the owners balance before
            const ownerBalanceBefore = (await web3.eth.getBalance(owner)).toNumber();
            // create an instance of the hodl contract with unlockTime 0, from the owner and with 1e18 wei (1 ether)
            const hodl = await HodlContract.new(0, { from: owner, value: 1e18});
            // get the balance of the owner after calling the hodl contract
            const ownerBalanceHodl = (await web3.eth.getBalance(owner)).toNumber();
            // console.log("balance before: ", ownerBalanceBefore);
            // console.log("balance during: ", ownerBalanceHodl);
            
            // create a test to ensure that sufficient value is taken from the owner
            assert.isBelow(ownerBalanceHodl, ownerBalanceBefore - 1e18);
        });

        // use the it function - the "contract should return appropriate value to wallet" with an async callback function        
        it("contract should return appropriate value to wallet", async () => {
            // define owner
            const owner = accounts[0];
            // get the owners balance before
            const ownerBalanceBefore = (await web3.eth.getBalance(owner)).toNumber();
            // create an instance of the hodl contract with unlockTime 0, from the owner and with 1e18 wei (1 ether)
            const hodl = await HodlContract.new(0, { from: owner, value: 1e18});
            // call the withdraw function
            const withdrawTx = await hodl.withdraw({from: owner});
            // get the owners balance after
            const ownerBalanceAfter = (await web3.eth.getBalance(owner)).toNumber();
            // console.log("balance before: ", ownerBalanceBefore);
            // console.log("balance after: ", ownerBalanceAfter);\

            // create a test to ensure that sufficient value is returned to the owner
            assert.isBelow(ownerBalanceBefore-1e18, ownerBalanceAfter);
        });
    });
})