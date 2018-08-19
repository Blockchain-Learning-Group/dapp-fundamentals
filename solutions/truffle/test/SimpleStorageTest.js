// include the SimpleStorage.sol contract and pass it as an artifact to the SimpleStorage variable
const SimpleStorage = artifacts.require("./SimpleStorage.sol");

// use the contract object to "Test the storage contract" with a callback function with accounts as a param
contract("Test the storage contract", function(accounts) {
    // use the describe function to "deploy the storage smart contract" with a callback function with no params
    describe("deploy the storage smart contract", () => {
    // use the describe function to "deploy the storage smart contract" with an async callback function with no params
    it("catch an instance of the contract", async () => {
            // create a .new() instance of SimpleStorage saving it to simpleStorage
            const simpleStorage = await SimpleStorage.new();
            // check that an instance of the contract was created -- include an error message
            assert.isNotNull(simpleStorage, "contract not deployed");
        });
    });
   
    // use the describe function to "Check the contract variable" with a callback function with no params
    describe("Check the contract variable", function() {
        // use the it function to ensure "The name variable is correct" with an async callback function
        it("The variable is stored correctly", async () => {
            // create a .new() instance of SimpleStorage saving it to simpleStorage
            const simpleStorage = await SimpleStorage.new();
            // define a number to set, get and check
            const numberToCheck = 9;
            // create a transaction that calls the .set() method, passing numberToCheck and transaction details object
            const setNumberTx = await simpleStorage.set(numberToCheck, {from: accounts[0]});
            // create a transaction that calls the .set() method, passing numberToCheck and transaction details object
            const getNumber = await simpleStorage.get();
            console.log(getNumber)
            // assert that the result of get() is equal to the number you stored
            assert.equal(getNumber, numberToCheck, "The variable is not correctly set");
        });
    });
})