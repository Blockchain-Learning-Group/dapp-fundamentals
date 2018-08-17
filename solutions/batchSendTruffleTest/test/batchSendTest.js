const BatchSend = artifacts.require('./BatchSend.sol');

contract('batchSend.GetMessage', function(accounts) {
    const owner = accounts[0];
    const reciever = accounts[1];

    describe("should batchSend multiple transactions", () => {
        it("Call the batchSend function", async () => {
            const batchSend = await BatchSend.new();

            // Tx params
            const amountToBeSent = 100000;
            const amountSent = 200000;

            // Initial balances
            const ownerBalanceBefore = (await web3.eth.getBalance(owner)).toNumber();
            const recieverBalanceBefore = (await web3.eth.getBalance(reciever)).toNumber();
            
            const txReceipt = await batchSend.batchSend([reciever], [amountToBeSent], { from: owner, value: amountToBeSent});
            
            // Correct events emitted
            const log = txReceipt.logs[0]; 
            assert.equal(log.event, 'BatchSent', 'Incorrect event emitted');

            // Final balances
            const recieverBalanceAfter = (await web3.eth.getBalance(reciever)).toNumber();
            const ownerBalanceAfter = (await web3.eth.getBalance(owner)).toNumber();

            // Below due to tx fee
            assert.isBelow(ownerBalanceAfter, ownerBalanceBefore - amountSent, "amount was not correctly taken from owner");
            assert.equal(recieverBalanceAfter, recieverBalanceBefore + amountToBeSent, 'Received balance incorrect');
        });
    });
});
