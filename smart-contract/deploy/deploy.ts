import { subtask, task, types } from "hardhat/config";
import * as Helpers from './helpers';
import * as fs from 'fs';

const fileName: string = 'wallets.txt';

task("deploy", "Deploy StakerInfo")
  .setAction(async (taskArgs, {ethers}) => {
        const signer = (await ethers.getSigners())[0];

        const sfc = '0xfc00face00000000000000000000000000000000';

        const stakerInfoFactory = await ethers.getContractFactory("StakerInfo", signer);
        const stakerInfo = await (await stakerInfoFactory.deploy(sfc)).deployed();

        console.log("StakerInfo deployed to:", stakerInfo.address);
    });

task("update-info", "Updating cfg info")
    .setAction(async (taskArgs, {ethers, network}) => {
        let stakerInfoAddress = '';
        if(network.name === "ultron") {
            stakerInfoAddress = '0x8346c42d1023BAfA955fF3623c96d54982AB8b0F';
        }
        else if(network.name === "ultron_testnet") {
            stakerInfoAddress = '0x33F0C573e9415497D30FB7C1bd4632b2F27dC689';
        }

        const validators = fs.readFileSync(`${fileName}`, { encoding: 'utf-8' }).split('\r\n');
        
        for(let i:number = 1; i <= validators.length; i++) {
            let wallet = new ethers.Wallet(validators[i - 1]);
            let stakerInfo = await ethers.getContractAt("StakerInfo", stakerInfoAddress, wallet);

            let cfgUrl = `https://github.com/UltronFoundationDev/ultron-staker-info/blob/main/configs/Validator${i}.json`;
            console.log(cfgUrl);
            await stakerInfo.updateInfo(cfgUrl);
            await Helpers.delay(4000);
            console.log(await stakerInfo.getInfo(i))
        }
    });

task("change-owner", "Transfer ownership")
    .setAction(async (taskArgs, {ethers, network}) => {
        const signer = (await ethers.getSigners())[0];

        let stakerInfoAddress = '';
        if(network.name === "ultron") {
            stakerInfoAddress = '0x8346c42d1023BAfA955fF3623c96d54982AB8b0F';
        }
        else if(network.name === "ultron_testnet") {
            stakerInfoAddress = '0x33F0C573e9415497D30FB7C1bd4632b2F27dC689';
        }
        
        const stakerInfo = await ethers.getContractAt("StakerInfo", stakerInfoAddress, signer);

        const owner = '0x4CE535D6E2D47690e33CA646972807BeB264dFBf';

        await stakerInfo.transferOwnership(owner);
        await Helpers.delay(4000);
        console.log(await stakerInfo.owner())
    });