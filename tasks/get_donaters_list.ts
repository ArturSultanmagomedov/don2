import { task } from "hardhat/config";

import "@nomiclabs/hardhat-ethers";

interface Args {
  address: string;
}

task("get_donaters_list", "Get donaters list")
  .addParam("address", "Contract address")
  .setAction(async (args: Args, hre) => {
    const contract = await hre.ethers.getContractAt("Donations", args.address);
    const donaters = await contract.getDonaters();

    console.log(`Donaters: ${donaters}`);
  });

export { };