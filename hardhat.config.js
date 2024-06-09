require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition");

require('dotenv').config();

const { PROVIDER_URL, PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {

    hardhat: {
      // Configuration for the local Hardhat network
      chainId: 1337,
    },

    localhost: {
      // Configuration for connecting to a local Ethereum node
      url: "http://127.0.0.1:8545",
      chainId: 1337,
    },

    fantomtest: {
      url: PROVIDER_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};