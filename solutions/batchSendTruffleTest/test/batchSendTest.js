var batchSend = artifacts.require('./BatchSend.sol');
expect = require('chai').expect;
console.log(expect);
contract('batchSend.GetMessage', function(accounts) {
  
    describe("Contract Should Deploy", function() {
        it("Catch an instance of the batchSend Contract", async function(done) {
            // testing creating the contact
            var batch_send = await batchSend.new({ from: accounts[0]});
            let owner = await batch_send.owner()

            expect(owner).to.be.equal(accounts[1]);
            console.log(owner);
        });
    });

    describe("batchSend function should work", function(){
        it("Call the batchSend function", async function(){
            await batch_send.batchSend([accounts[1], accounts[2]], [10000, 20000], ({ from: accounts[0], value: 50000}))
        });
        // to be added

    });

});
