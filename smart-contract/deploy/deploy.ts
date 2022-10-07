import { getDefaultProvider } from '@ethersproject/providers';
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
        let ethersProvider = getDefaultProvider();
        let rootPath = ''

        if(network.name === "ultron") {
            stakerInfoAddress = '0x8346c42d1023BAfA955fF3623c96d54982AB8b0F';
            //TODO use hardhat config
            ethersProvider = new ethers.providers.JsonRpcProvider("https://ultron-rpc.net");
            rootPath = 'https://raw.githubusercontent.com/UltronFoundationDev/ultron-staker-info/main/configs'
        }
        else if(network.name === "ultron_testnet") {
            stakerInfoAddress = '0x33F0C573e9415497D30FB7C1bd4632b2F27dC689';
            ethersProvider = new ethers.providers.JsonRpcProvider("https://ultron-dev.io");
            rootPath = 'https://raw.githubusercontent.com/UltronFoundationDev/ultron-staker-info/main/configs/testnet'
        }

        const validators = fs.readFileSync(`${fileName}`, { encoding: 'utf-8' }).split('\n');
        
        for(let i:number = 1; i <= validators.length; i++) {
            if (!validators[i-1]) {
                continue;
            }

            let wallet = new ethers.Wallet(validators[i - 1]);

            const walletSigner = wallet.connect(ethersProvider);

            let stakerInfo = await ethers.getContractAt("StakerInfo", stakerInfoAddress, walletSigner);

            let cfgUrl = `${rootPath}/Validator${i}.json`;
            // console.log(cfgUrl);
            await stakerInfo.updateInfo(cfgUrl);
            await Helpers.delay(2000);
            console.log(await stakerInfo.getInfo(i))
        }
    });

task("get-info", "Get validator cfg info")
    .addParam("id", "Validator id")
    .setAction(async (taskArgs, {ethers, network}) => {

        let stakerInfoAddress = '';
        let ethersProvider = getDefaultProvider();
        if(network.name === "ultron") {
            stakerInfoAddress = '0x8346c42d1023BAfA955fF3623c96d54982AB8b0F';
            //TODO use hardhat config
            ethersProvider = new ethers.providers.JsonRpcProvider("https://ultron-rpc.net");
        }
        else if(network.name === "ultron_testnet") {
            stakerInfoAddress = '0x33F0C573e9415497D30FB7C1bd4632b2F27dC689';
            ethersProvider = new ethers.providers.JsonRpcProvider("https://ultron-dev.io");
        }

        let stakerInfo = await ethers.getContractAt("StakerInfo", stakerInfoAddress);

        console.log(`Validator id ${taskArgs.id}:`, await stakerInfo.getInfo(taskArgs.id))
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