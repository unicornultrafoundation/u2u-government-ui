
export interface AppConfig {
  chainID: number,
  networkName: string,
  tokenName: string
  rpc: string,
  explorer: string,
  sfcSubgraph: string,
  stakingGraphql: string,
  u2uNetworkSubgraph: string,
  withdrawPeriodTime: number,
  stakingContract: string,
}

const appConfigs: {[k: string]: AppConfig} = {
  "4439" : {
    chainID: 4439,
    networkName: "U2U Dev Net",
    tokenName: "U2U Dev",
    rpc: "https://rpc-devnet.uniultra.xyz/",
    explorer: "https://rpc-nebulas-testnet.uniultra.xyz/",
    sfcSubgraph: "http://localhost:8000/subgraphs/name/u2u/sfc-subgraph",
    u2uNetworkSubgraph: "http://localhost:8000/subgraphs/name/u2u/sfc-network",
    stakingContract: "0xfc00face00000000000000000000000000000000",
    withdrawPeriodTime: 600,
    stakingGraphql: ""
  },
  "2484" : {
    chainID: 2484,
    networkName: "U2U Nebulas Testnet",
    tokenName: "U2U",
    rpc: "https://rpc-nebulas-testnet.uniultra.xyz/",
    explorer: "https://testnet.u2uscan.xyz",
    sfcSubgraph: "https://subgraph.uniultra.xyz/subgraphs/name/u2u/sfc-subgraph",
    u2uNetworkSubgraph: "https://subgraph.uniultra.xyz/subgraphs/name/u2u/sfc-network",
    stakingContract: "0xfc00face00000000000000000000000000000000",
    withdrawPeriodTime: 604800,
    stakingGraphql: "https://testnet-staking-graphql.uniultra.xyz/graphql"
  },
  "39" : {
    chainID: 39,
    networkName: "U2U Solaris Mainnet",
    tokenName: "U2U",
    rpc: "https://rpc-mainnet.uniultra.xyz/",
    explorer: "https://u2uscan.xyz",
    sfcSubgraph: "https://graph.uniultra.xyz/subgraphs/name/u2u/sfc-subgraph-v2",
    u2uNetworkSubgraph: "https://graph.uniultra.xyz/subgraphs/name/u2u/sfc-network",
    stakingContract: "0xfc00face00000000000000000000000000000000",
    withdrawPeriodTime: 604800,
    stakingGraphql: "https://staking-graphql.uniultra.xyz/graphql"
  }
}
const U2U_CHAINID = process.env.REACT_APP_U2U_CHAINID as string || "39";
export const appConfig: AppConfig = appConfigs[U2U_CHAINID]