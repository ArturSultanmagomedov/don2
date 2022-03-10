import { task } from "hardhat/config";

import "@nomiclabs/hardhat-ethers";

interface Args {
  contractAddress: string;
  donaterAddress: string;
}

task("get_donations_value", "Get total amount")
  .addParam("contractAddress", "Contract address")
  .addParam("donaterAddress", "Target donater address")
  .setAction(async (args: Args, hre) => {
    const contract = await hre.ethers.getContractAt("Donations", args.contractAddress);
    const amount = await contract.getTotalAmount(args.donaterAddress);

    console.log(`Total amount: ${amount}`);
  });

export { };