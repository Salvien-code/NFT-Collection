import { ethers } from "hardhat";
import { METADATA_URL, WHITELIST_CONTRACT_ADDRESS } from "../Constants";

async function main() {
  const whitelistContract = WHITELIST_CONTRACT_ADDRESS;

  const metadataURL = METADATA_URL;

  const lionsFactory = await ethers.getContractFactory("Lions");
  const lionContract = await lionsFactory.deploy(
    metadataURL,
    whitelistContract
  );

  await lionContract.deployed();

  console.log(`lions Contract Address: ${lionContract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
