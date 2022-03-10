import { task } from "hardhat/config";
import { parseEther } from "ethers/lib/utils";

import "@nomiclabs/hardhat-ethers";

interface WithdrawalArgs {
  contractAddress: string;
  amount: string;
  withdrawalTo: string;
}

task("withdrawal", "Withdrawal")
  .addParam("contractAddress", "Contract address")
  .addParam("amount", "Withdrawl amount (in ETH)")
  .addParam("withdrawalTo", "Address for withdrawal")
  .setAction(async (args: WithdrawalArgs, hre) => {
    const contract = await hre.ethers.getContractAt("Donations", args.contractAddress);
    const tx = await contract.withdrawal(parseEther(args.amount), args.withdrawalTo);
    await tx.wait();

    console.log("Success");
  });

export { };