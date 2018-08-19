const HodlContract = artifacts.require("./HodlCapsule.sol");

contract("Test the Hodl contract", function(accounts) {
    describe("deploy the HODL smart contract", () => {
        it.only("catch an instance of the contract", async () => {
            const hodl = await HodlContract.new(0, {from: accounts[0]});
            assert.isNotNull(hodl, "contract not deployed");
        });
    });


    describe("should fail when not unlocked", () => {

        it.only("should fail due to wrong user", async () => {
            const owner = accounts[0];
            const other = accounts[1];
            const hodl = await HodlContract.new(0, { from: owner });
            try {
                await hodl.withdraw({ from: other });
                assert(false, "did not raise error");
            } catch(err) {
                return;
            }  
        });

        it.only("should fail due to unlock time", async () => {
            const owner = accounts[0];
            const hodl = await HodlContract.new(1, { from: owner });

            try {
                await hodl.withdraw({ from: owner });
                assert(false, 'did not raise error');
            } catch(err) {
                return;
            }
        });
    });

    describe("should return value once both conditions are met", () => {
        it.only("contract should collect appropriate value from wallet", async () => {
            const owner = accounts[0];
            const ownerBalanceBefore = (await web3.eth.getBalance(owner)).toNumber();
            const hodl = await HodlContract.new(0, { from: owner, value: 1e18});
            const ownerBalanceHodl = (await web3.eth.getBalance(owner)).toNumber();
            // console.log("balance before: ", ownerBalanceBefore);
            // console.log("balance during: ", ownerBalanceHodl);
            assert.isBelow(ownerBalanceHodl, ownerBalanceBefore - 1e18);
        });

        it.only("contract should return appropriate value to wallet", async () => {
            const owner = accounts[0];
            const ownerBalanceBefore = (await web3.eth.getBalance(owner)).toNumber();
            const hodl = await HodlContract.new(0, { from: owner, value: 1e18});
            const withdrawTx = await hodl.withdraw({from: owner});
            const ownerBalanceAfter = (await web3.eth.getBalance(owner)).toNumber();
            // console.log("balance before: ", ownerBalanceBefore);
            // console.log("balance after: ", ownerBalanceAfter);
            assert.isBelow(ownerBalanceBefore-1e18, ownerBalanceAfter);
        });
    });
})