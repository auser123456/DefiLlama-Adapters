const { sumTokens2 } = require("../helper/unwrapLPs");
const { getLogs } = require("../helper/cache/getLogs");
const { staking } = require("../helper/staking");

const POOL_CONTRACT = "0x7f885c6c9f847a764d247056ed4d13dc72cef7d0";
const OCTO_ETH_LP_ADDRESS = "0xFe4cd8B965353de5fac7c0Cb041B75f5e238B413";

async function tvl(timestamp, block, chainBlocks, { api }) {
  const logs = await getLogs({
    api,
    target: POOL_CONTRACT,
    topics: ["0x18caa0724a26384928efe604ae6ddc99c242548876259770fc88fcb7e719d8fa",],
    eventAbi: "event AddPool (index_topic_1 uint256 pid, uint256 rewardToken, index_topic_2 address stakingToken, bool isRegular)",
    onlyArgs: true,
    fromBlock: 17209964,
  });

  const lsdAddresses = logs.map((i) => i.stakingToken);
  return sumTokens2({ api, owner:POOL_CONTRACT , tokens: lsdAddresses, resolveLP: true});

}

module.exports = {
  ethereum: {
    methodology:
      "TVL of Staked ETH & LSD tokens, with pool2 including value of staked OCTO/ETH Uniswap-V2 LP tokens",
    tvl,
  },
};
