
// include the Demo.sol contract and pass it as an artifcat to the Demo variable
var Demo = artifacts.require("./Demo.sol");
// initialized the chai assertion library
expect = require("chai").expect;

// use the contract object with to "Test the Demo contract" with a callback function with no params
contract("Test the Demo contract", function(){
    // use the describe function to "deploy the Demo smart contract" with a callback function with no params
    describe("deploy the Demo smart contract", function(){
        // use the it function to "catch an instance of the contract" with a callback function with no params
        it("catch an instance of the contract", function(){
            // call the .new() function on the Demo artifact and use the .then function to assign the callback variable instance to demoContract
            return Demo.new().then(function(instance){
                demoContract = instance;
            });
        });
    });
   
    // use the describe function to "Check the contract variable" with a callback function with no params
    describe("Check the contract variable", function(){
        // use the it function to ensure "The name variable is correct" with a callback function with no params
        it("The name variable is correct", function(){
            // return the .name() function of the demoContract object - call the .then() function with the result
            return demoContract.name().then(function(res){
                // console log the result
                console.log(res.toString());
                // expect the result to.be.equal to "shahrukh khan"
                expect(res.toString()).to.be.equal("shahrukh khan")
            });
        });
    });

})