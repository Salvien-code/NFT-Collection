import { ethers, run } from "hardhat";
import { setTimeout } from "timers/promises";
import { WHITELIST_CONTRACT_ADDRESS } from "../client/Constants";

async function main() {
  const lionsNftFactory = await ethers.getContractFactory("LionNFT");
  const lionNftContract = await lionsNftFactory.deploy(
    WHITELIST_CONTRACT_ADDRESS
  );

  await lionNftContract.deployed();

  console.log(`NFT Collection Contract Address: ${lionNftContract.address}`);

  console.log(`Waiting for a minute before verifying NFT contract`);
  await setTimeout(60000);

  await run("verify:verify", {
    address: lionNftContract.address,
    constructorArguments: [WHITELIST_CONTRACT_ADDRESS],
  });
  console.log(`Verified NFT Collection contract on Etherscan`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
