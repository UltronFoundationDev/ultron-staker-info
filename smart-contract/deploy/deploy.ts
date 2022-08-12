import { subtask, task, types } from "hardhat/config";
import * as Helpers from './helpers';

task("deploy", "Deploy StakerInfo")
  .setAction(async (taskArgs, {ethers}) => {
        const signer = (await ethers.getSigners())[0];

        const sfc = '0xfc00face00000000000000000000000000000000';

        const stakerInfoFactory = await ethers.getContractFactory("StakerInfo", signer);
        const stakerInfo = await (await stakerInfoFactory.deploy(sfc)).deployed();

        console.log("StakerInfo deployed to:", stakerInfo.address);
    });

task("change-owner", "Transfer ownership")
    .setAction(async (taskArgs, {ethers}) => {
        const signer = (await ethers.getSigners())[0];

        const stakerInfoAddress = '0x9F8eFbc1A35f9D5941efEA8F8aD30703e667F009';
        const stakerInfo = await ethers.getContractAt("StakerInfo", stakerInfoAddress, signer);

        const owner = '0x4CE535D6E2D47690e33CA646972807BeB264dFBf';

        await stakerInfo.transferOwnership(owner);
        await Helpers.delay(4000);
        console.log(await stakerInfo.owner())
    });