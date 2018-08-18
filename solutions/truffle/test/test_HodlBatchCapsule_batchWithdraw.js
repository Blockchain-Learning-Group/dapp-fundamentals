const HodlBatchCapsule = artifacts.require('./HodlBatchCapsule.sol');

contract('hodl.withdrawBatch', (accounts) => {
    const [owner, addr1, addr2]  = accounts;
    const addresses = [addr1, addr2];
    const values = [1e18, 1e18];
    const totalValue = values.reduce((a, b) => a + b, 0);
    let hodl;

    describe('should batchSend multiple transactions from the hodl capsule', () => {
        let ownerBalanceBefore;
    
        before(async () => {
           ownerBalanceBefore = (await web3.eth.getBalance(owner)).toNumber();
           hodl = await HodlBatchCapsule.new(1, { from: owner });
        });

        it('should create a batch', async () => {
            const unlockTime = 0;
            
            const txReceipt = await hodl.createBatch(addresses, values, unlockTime, { from: owner, value: totalValue});

            // Get the timestamp of the block this tx was included in, in order to compare unlock time
            const blockTimestamp = web3.eth.getBlock(txReceipt.receipt.blockNumber).timestamp;

            // Confirm batch saved
            const batchUnlockTime = (await hodl.batchUnlockTime()).toNumber();
            assert.strictEqual(batchUnlockTime, blockTimestamp + unlockTime, 'unlocktime on chain incorrect');
        });

        it('should withdraw the batch sending value to all addresses', async () => {
            // Initial balances
            const addr1BalanceBefore = (await web3.eth.getBalance(addr1)).toNumber();
            const addr2BalanceBefore = (await web3.eth.getBalance(addr2)).toNumber();

            // Send tx to withdraw batch
            const txReceipt = await hodl.withdrawBatch({ from: owner });

            // Confirm BatchSend contract emitted event during internal transaction
            const internalEvent = txReceipt.receipt.logs[0];
            assert.isNotNull(internalEvent.address, await hodl.batchSend_(), 'internal event not emitted from BatchSend');

            // Final balances
            const addr1BalanceAfter = (await web3.eth.getBalance(addr1)).toNumber();
            const addr2BalanceAfter = (await web3.eth.getBalance(addr2)).toNumber();
            const ownerBalanceAfter = (await web3.eth.getBalance(owner)).toNumber();

            // Below due to tx fee
            assert.isBelow(ownerBalanceAfter, ownerBalanceBefore - totalValue, 'owner balance after incorrect');
            assert.equal(addr1BalanceAfter, addr1BalanceBefore + values[0], 'addr1 balance incorrect');
            assert.equal(addr2BalanceAfter, addr2BalanceBefore + values[1], 'addr2 balance incorrect');
        });
    });

    describe('should fail when not unlocked', () => {
        before(async () => {
           hodl = await HodlBatchCapsule.new(1, { from: owner });
        });

        it('should create a batch', async () => {
            const unlockTime = 1e18;
            
            const txReceipt = await hodl.createBatch(addresses, values, unlockTime, { from: owner, value: totalValue});

            // Get the timestamp of the block this tx was included in, in order to compare unlock time
            const blockTimestamp = web3.eth.getBlock(txReceipt.receipt.blockNumber).timestamp;

            // Confirm batch saved
            const batchUnlockTime = (await hodl.batchUnlockTime()).toNumber();
            assert.strictEqual(batchUnlockTime, blockTimestamp + unlockTime, 'unlocktime on chain incorrect');
        });

        it('should fail due to unlock time', async () => {
            try {
                await hodl.withdrawBatch({ from: owner });
                assert(false, 'did not raise error');
            } catch(err) {
                return;
            }
        });
    });
});
