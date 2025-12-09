const SfcContract = artifacts.require("./contracts/SFC.sol");
const StakerInfoContract = artifacts.require("./contracts/StakerInfo.sol");

module.exports = function(deployer) {
  deployer.deploy(SfcContract).then(() => {
    return deployer.deploy(StakerInfoContract, SfcContract.address);
  });
};