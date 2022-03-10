import { ethers } from "hardhat";

// 6) Написать script deploy в тестовую сеть rinkeby (использовать "hardhat run scripts/NAME_FILE --network rinkeby";
async function main() {
  const Donations = await ethers.getContractFactory("Donations");
  const contract = await Donations.deploy();

  await contract.deployed();

  console.log("Deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// hardhat run scripts/deploy.ts --network rinkeby
