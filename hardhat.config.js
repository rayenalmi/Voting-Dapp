require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition");

require('dotenv').config();

const { PROVIDER_URL, PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    fantomtest: {
      url: PROVIDER_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};