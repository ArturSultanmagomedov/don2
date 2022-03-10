import { task } from "hardhat/config";
import { parseEther } from "ethers/lib/utils";

import "@nomiclabs/hardhat-ethers";

interface Args {
  address: string;
  amount: string;
}

task("donate", "Donate to contract")
  .addParam("address", "Contract address")
  .addParam("amount", "Donate amount (in ETH)")
  .setAction(async (args: Args, hre) => {
    const contract = await hre.ethers.getContractAt("Donations", args.address);

    const tx = await contract.donate({ value: parseEther(args.amount) });
    await tx.wait();

    console.log(`Successfully donated ${args.amount} ETH`);
  });

export { };
