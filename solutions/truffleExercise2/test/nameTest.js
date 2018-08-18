// include the Demo.sol contract and pass it as an artifcat to the Demo variable
const Demo = artifacts.require("./Demo.sol");

// use the contract object with to "Test the Demo contract" with a callback function with no params
contract("Test the Demo contract", function() {
    // use the describe function to "deploy the Demo smart contract" with a callback function with no params
    describe("deploy the Demo smart contract", () => {
        // use the it function to "catch an instance of the contract" with a callback function with no params
        it.only("catch an instance of the contract", async () => {
            const demo = await Demo.new();
            assert.isNotNull(demo, "contract not deloyed");
        });
    });
   
    // use the describe function to "Check the contract variable" with a callback function with no params
    describe("Check the contract variable", function() {
        // use the it function to ensure "The name variable is correct" with a callback function with no params
        it.only("The name variable is correct", async () => {
            const demo = await Demo.new();
            console.log(await demo.name());
            console.log(await demo.name());
            console.log(await demo.name());

            const name = await demo.name();

            console.log(name);
            console.log(name);
            console.log(name);
            // expect the result to.be.equal to "shahrukh khan"
            assert.equal(name, "shahrukh khan", "The name variable is not correctly set");
        });

        it("Should change the name as expected", async () => {
            const newName = "John Doe";
            const txreciept = await demoContract.changeName(newName);

            return demoContract.name().then(function(res){
                // console log the result
                console.log(res.toString());
                // expect the result to.be.equal to "shahrukh khan"
                assert.equal(res, newName, "The name variable has not correctly changed")
            });
        })
    });
})