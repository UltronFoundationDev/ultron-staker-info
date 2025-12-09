const assert = require("assert");
const { BigNumber } = require("ethers");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const SfcContract = artifacts.require("./contracts/SFC.sol");
const StakerInfoContract = artifacts.require("./contracts/StakerInfo.sol");

contract('StakerInfo', async (accounts) => {
  console.log(accounts)
  const owner = accounts[0];
  it("should fail to create a staker", async () => {
    const contract = await SfcContract.deployed();

    let success = true;
    try {
      await contract.createValidator(owner, { value: web3.utils.toWei("1000000") });
    } catch (error) {
      success = false;
    }

    assert(success == false);
  })

  it("should successfully create a staker", async () => {
    const contract = await SfcContract.deployed();
    await contract.initialize(Math.round(Date.now() / 1000), BigNumber.from("10000000000"), owner, owner);
    await contract.createValidator(owner, { value: web3.utils.toWei("1000000") });
    const stakersNum = await contract.lastValidatorID();
    assert(stakersNum == 1);
  })

  it("should update staker info", async () => {
    const contract = await StakerInfoContract.deployed();
    await contract.updateInfo("https://fantom.b42.tech/config.json");
    const configUrl = await contract.getInfo(1);
    assert(configUrl == "https://fantom.b42.tech/config.json");
  })
})