var Migrations = artifacts.require("./Migrations.sol");
// adding this as an artifact allows the contract to be available as a javascript object
var Demo = artifacts.require("./Demo.sol")

module.exports = function(deployer) {
  deployer.deploy(Demo)
};
