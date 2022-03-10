import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

// 5) Написать unit test (использовать npx hardhat test);
describe("Donations", async function () {
  let contract: Contract;
  let owner: SignerWithAddress;
  let user: SignerWithAddress;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();
    const DonationsContractFactory = await ethers.getContractFactory("Donations");
    contract = await DonationsContractFactory.deploy();

    // возможно я неправильно понимаю механизм работы функции it
    // но если воткнуть этот код в "Test contract got coins", последующие тесты падают
    const tx = {
      to: contract.address,
      value: ethers.utils.parseEther("10.0"),
    }
    const sendTx = await user.sendTransaction(tx);
    await sendTx.wait();

    await contract.deployed();
  });

  it("Owner is a creator check", async () => {
    expect(await contract.owner()).to.equal(owner.address);
  });

  it("Test contract got coins", async () => {
    const balance = await ethers.provider.getBalance(contract.address);
    expect(await ethers.utils.formatEther(balance)).to.equal("10.0");
  });

  it("Test getTotalAmount", async () => {
    expect(await contract.getTotalAmount(user.address)).to.equal(ethers.utils.parseEther("10.0"));
  });

  it("Test withdrawal", async () => {
    await contract.withdrawal(ethers.utils.parseEther("7.0"), user.address);
    const balance = await ethers.provider.getBalance(contract.address);
    expect(await ethers.utils.formatEther(balance)).to.equal("3.0");
  });

  it("Test getDonaters", async () => {
    expect((await contract.getDonaters()).toString()).to.equal([user.address].toString());
  });
});
