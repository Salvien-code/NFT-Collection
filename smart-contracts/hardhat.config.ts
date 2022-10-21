import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const { ALCHEMY_API_URL, METAMASK_PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: ALCHEMY_API_URL,
      accounts: [METAMASK_PRIVATE_KEY!],
    },
  },
};

export default config;
