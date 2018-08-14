var Migrations = artifacts.require("./Migrations.sol");
var batchSend = artifacts.require('./BatchSend.sol');

module.exports = function(deployer) {
  deployer.deploy(batchSend);
  deployer.deploy(Migrations);
};
