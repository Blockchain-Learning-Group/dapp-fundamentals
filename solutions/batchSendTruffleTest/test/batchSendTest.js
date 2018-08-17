var batchSend = artifacts.require('./BatchSend.sol');
expect = require('chai').expect;
console.log(expect);
contract('batchSend.GetMessage', function(accounts) {
    var owner = accounts[0];
    var reciever = accounts[1];

    describe("Contract Should Deploy", function() {
        it("catch an instance of the contract", function(){
            // call the .new() function on the Demo artifact and use the .then function to assign the callback variable instance to demoContract
            return batchSend.new().then(function(instance){
                batch_send = instance;
            });
        });
    });

    describe("batchSend function should work", function(){
        it("Call the batchSend function", async function(){
            var amountToBeSent = 100000;
            var amountSent = 200000;
            var ownerBalanceBefore = web3.getBalance(owner).toNumber();
            var recieverBalanceBefore = web3.getBalance(reciever).toNumber();
            await batch_send.batchSend(reciever, amountToBeSent, ({ from: owner, value: amountToBeSent}))
            var recieverBalanceAfter = web3.getBalance(reciever).toNumber();
            var ownerBalanceAfter = web3.getBalance(owner).toNumber();
            
            assert.equal(ownerBalanceBefore-ownerBalanceAfter, amountSent-amountToBeSent, "amount was not correctly taken from sender");
            assert.equal(recieverBalanceAfter - recieverBalanceBefore, amountToBeSent);
        });


    });

});
