// include the SimpleStorage.sol contract and pass it as an artifcat to the Demo variable
const SimpleStorage = artifacts.require("./SimpleStorage.sol");

// use the contract object with to "Test the Demo contract" with a callback function with no params
contract("Test the Demo contract", function(accounts) {
    // use the describe function to "deploy the Demo smart contract" with a callback function with no params
    describe("deploy the Demo smart contract", () => {
        // use the it function to "catch an instance of the contract" with a callback function with no params
        it.only("catch an instance of the contract", async () => {
            const simpleStorage = await SimpleStorage.new();
            assert.isNotNull(simpleStorage, "contract not deployed");
        });
    });
   
    // use the describe function to "Check the contract variable" with a callback function with no params
    describe("Check the contract variable", function() {
        // use the it function to ensure "The name variable is correct" with an async function
        it.only("The variable is stored correctly", async () => {
            const simpleStorage = await SimpleStorage.new();
            const numberToCheck = 9;
            const setNumberTx = await simpleStorage.set(numberToCheck, {from: accounts[0]});
            const getNumber = await simpleStorage.get();
            console.log(getNumber)
            // expect the result to equal 
            assert.equal(getNumber, numberToCheck, "The variable is not correctly set");
        });
    });
})