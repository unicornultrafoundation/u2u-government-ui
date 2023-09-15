import { BigNumber } from "ethers";
import { SelectOption } from "../components/form";

export * from "./abi"
export const POLLING_INTERVAL = 12000;
export const connectorLocalStorageKey = "connectorId";
export const GAS_LIMIT_HARD = 1000000
export const VALIDATOR_COMMISSION = 15
export const FAST_REFRESH_INTERVAL = 5000
export const MEDIUM_REFRESH_INTERVAL = 20000
export const SLOW_REFRESH_INTERVAL = 60000
export const epochTime = BigNumber.from(420);
export const DecimalBigNumber = BigNumber.from("1000000000000000000")

export const WALLET_CONNECT_KEY = process.env.REACT_APP_WALLET_CONNECT_KEY as string

export const TableLimit = 10;

const durationOptionsMainet: SelectOption[] = [
  { label: "14 days", value: 1209600 },
  { label: "30 days", value: 2592000 },
  { label: "60 days", value: 5184000 },
  { label: "90 days", value: 7776000 },
  { label: "180 days", value: 15552000 },
  { label: "365 days", value: 31536000 }
]

const durationOptionsTestnet: SelectOption[] = [
  { label: "14 days", value: 1209600 },
  { label: "30 days", value: 2592000 },
  { label: "60 days", value: 5184000 },
  { label: "90 days", value: 7776000 },
  { label: "180 days", value: 15552000 },
  { label: "365 days", value: 31536000 }
]

const durationOptionsDevnet: SelectOption[] = [
  { label: "5 mins", value: 300 },
  { label: "10 mins", value: 600 },
  { label: "15 mins", value: 900 },
  { label: "20 mins", value: 1200 },
]

export interface AppConfig {
  chainID: number,
  networkName: string,
  tokenName: string
  rpc: string,
  explorer: string,
  sfcSubgraph: string,
  stakingGraphql: string,
  withdrawPeriodTime: number,
  stakingContract: string,
  lockStakeDuration: SelectOption[]
}

const appConfigs: {[k: string]: AppConfig} = {
  "4439" : {
    chainID: 4439,
    networkName: "U2U Dev Net",
    tokenName: "U2U Dev",
    rpc: "https://rpc-devnet.uniultra.xyz/",
    explorer: "https://rpc-nebulas-testnet.uniultra.xyz/",
    sfcSubgraph: "http://localhost:8000/subgraphs/name/u2u/sfc-subgraph",
    stakingContract: "0xfc00face00000000000000000000000000000000",
    withdrawPeriodTime: 600,
    lockStakeDuration: durationOptionsDevnet,
    stakingGraphql: ""
  },
  "2484" : {
    chainID: 2484,
    networkName: "U2U Nebulas Testnet",
    tokenName: "U2U",
    rpc: "https://rpc-nebulas-testnet.uniultra.xyz/",
    explorer: "https://testnet.u2uscan.xyz",
    sfcSubgraph: "https://subgraph.uniultra.xyz/subgraphs/name/u2u/sfc-subgraph",
    stakingContract: "0xfc00face00000000000000000000000000000000",
    withdrawPeriodTime: 604800,
    lockStakeDuration: durationOptionsTestnet,
    stakingGraphql: "https://testnet-staking-graphql.uniultra.xyz/graphql"
  },
  "39" : {
    chainID: 39,
    networkName: "U2U Solaris Mainnet",
    tokenName: "U2U",
    rpc: "https://rpc-mainnet.uniultra.xyz/",
    explorer: "https://u2uscan.xyz",
    sfcSubgraph: "https://graph.uniultra.xyz/subgraphs/name/u2u/sfc-subgraph",
    stakingContract: "0xfc00face00000000000000000000000000000000",
    withdrawPeriodTime: 604800,
    lockStakeDuration: durationOptionsMainet,
    stakingGraphql: "https://staking-graphql.uniultra.xyz/graphql"
  }
}
const U2U_CHAINID = process.env.REACT_APP_U2U_CHAINID as string || "39";
export const appConfig: AppConfig = appConfigs[U2U_CHAINID]