const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("VotingModule", (m) => {

  const lock = m.contract("Voting", []);

  return { lock };
});
