## Why

Ultron delegators have a hard time finding the right validators to delegator their ULX to. The community started some efforts to create more transparency and collect more information about validators but nothing was nice and easy to use. There also were issues keeping the data up-to-date because it was maintained in a centralized manner.

## How

By creating a [smart contract](https://github.com/UltronFoundationDev/ultron-staker-info/blob/master/smart-contract/contracts/StakerInfo.sol) that interacts with the [SFC smart contract](https://github.com/UltronFoundationDev/nodes-deploy-automation-docker/blob/v3/opera-sfc/contracts/sfc/SFC.sol). It allows each Ultron validators to add and update information (a URL to a `JSON` file) about themselves, so delegators have more insights who they are, without the involvement of a third party.
A small backend application continously fetches all the validator data (to take load off the clients) and a frontend application displays it to users and delegators in a nice way.

## What

The smart contract is already deployed and can be found on the Ultron MainNet at the following address:

```solidity
0x8346c42d1023BAfA955fF3623c96d54982AB8b0F
```

ULXScan: [https://ulxscan.com/address/0x8346c42d1023BAfA955fF3623c96d54982AB8b0F](https://ulxscan.com/address/0x8346c42d1023BAfA955fF3623c96d54982AB8b0F)

The smart contract is already deployed and can be found on the Ultron TestNet at the following address:

```solidity
0x33F0C573e9415497D30FB7C1bd4632b2F27dC689
```

ULX_TestNet_Scan: [https://explorer.ultron-dev.io/address/0x33F0C573e9415497D30FB7C1bd4632b2F27dC689](https://explorer.ultron-dev.io/address/0x33F0C573e9415497D30FB7C1bd4632b2F27dC689)

### How it looks like

![image](https://user-images.githubusercontent.com/6087393/72662226-f7be6c00-39e4-11ea-9a84-3aab9699d695.png)

Most of the information that is shown is fetched automatically, but there are a few parameters than can be set by validators.

## Update your validator info

### Config File

Create a config file in `JSON` format that contains the following parameters (you can also leave parameters empty):

```js
{
  "name": "VALIDATOR_NAME", /* Name of the validator */
  "logoUrl": "LOGO_URL", /* Validator logo (PNG|JPEG|SVG) - 100px x 100px is enough */
  "website": "WEBSITE_URL", /* Website icon on the right */
  "contact": "CONTACT_URL" /* Contact icon on the right */
}

/* It could look something like this 👇 */

{
  "name": "Ultron Foundation",
  "logoUrl": "https://ulxscan.com/img/ultron-logo.png",
  "website": "https://ultron.foundation",
  "contact": "https://www.instagram.com/ultron.foundation"
}
```

Then host it somewhere so it is publicly accessible!

### Update your info in the smart contract
1. Create a `wallets.txt` file inside the `smart-contract/` directory.
2. Put the private key of the validator into the `wallets.txt` file and save the file.
3. To enter the working directory, open the terminal in the root project directory and execute the following command.:
```script
cd smart-contract
```
4. To set up all required packages, execute the following command:
```script
yarn install
```
5. To update validator information within the StakerInfo smart contract on the mainnet, execute the following steps:
```script
yarn hardhat update-info --network ultron
```


## Support

If you have any issues updating your validator info do not hesitate to join our [validator group](https://t.me/block42_fantom).
