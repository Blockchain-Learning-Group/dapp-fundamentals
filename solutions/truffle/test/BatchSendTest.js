// include the BatchSend.sol contract artifacts in order to create an instance to test against
const BatchSend = artifacts.require('./BatchSend.sol');

// define a contract test suite, using truffle's contract object, anonymous callback function with available accounts as a param
contract("BatchSend", (accounts) => {
    // define the owner and reciever
    const owner = accounts[0];
    const reciever = accounts[1];

    // use the describe function to "batchSend multiple transactions" with a callback function with no params
    // describing a collection of tests for the above contract
    describe("batchSend multiple transactions", () => {
        // use the it function to "catch an instance of the contract" with an async callback function with no params
        // defining a single test case
        it("call the batchSend function", async () => {
            // create a .new() instance of BatchSend, we will test against this 
            const batchSend = await BatchSend.new();

            // tx params
            const amountToBeSent = 100000;
            const amountSent = 200000;

            // get the initial balances of the reciever and owner
            const ownerBalanceBefore = (await web3.eth.getBalance(owner)).toNumber();
            const recieverBalanceBefore = (await web3.eth.getBalance(reciever)).toNumber();
            
            // call the batchSend function passing it the appropriate params and transaction options object
            const txReceipt = await batchSend.batchSend([reciever], [amountToBeSent], { from: owner, value: amountToBeSent});
            
            // get the 0th log of the emitted logs(events) within the transaction receipt
            const log = txReceipt.logs[0]; 
            // assert that the log.event was the BatchSent event - include error message
            assert.equal(log.event, 'BatchSent', 'Incorrect event emitted');

            // get the final balances of the reciever and owner
            const recieverBalanceAfter = (await web3.eth.getBalance(reciever)).toNumber();
            const ownerBalanceAfter = (await web3.eth.getBalance(owner)).toNumber();

            // check that the appropriate amount was taken from the owner -- HINT: the txfee will decrease the owner's final balance
            assert.isBelow(ownerBalanceAfter, ownerBalanceBefore - amountSent, "amount was not correctly taken from owner");
            // check that the appropriate amount was given to the reciever 
            assert.equal(recieverBalanceAfter, recieverBalanceBefore + amountToBeSent, 'Received balance incorrect');
        });
    });
});
