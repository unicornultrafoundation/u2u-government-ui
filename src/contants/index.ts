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

export const TableLimit = 10;

const durationOptionsMainet: SelectOption[] = [
  { label: "14 day", value: 8467200 },
  { label: "30 day", value: 18144000 },
  { label: "60 day", value: 36288000 },
  { label: "90 day", value: 54432000 },
  { label: "180 day", value: 108864000 }
]

const durationOptionsTestnet: SelectOption[] = [
  { label: "14 day", value: 8467200 },
  { label: "30 day", value: 18144000 },
  { label: "60 day", value: 36288000 },
  { label: "90 day", value: 54432000 },
  { label: "180 day", value: 108864000 }
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
    lockStakeDuration: durationOptionsDevnet
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
    lockStakeDuration: durationOptionsTestnet
  },
  "39" : {
    chainID: 39,
    networkName: "U2U Solaris Mainnet",
    tokenName: "U2U",
    rpc: "https://rpc-mainnet.uniultra.xyz/",
    explorer: "https://u2uscan.xyz",
    sfcSubgraph: "",
    stakingContract: "0xfc00face00000000000000000000000000000000",
    withdrawPeriodTime: 604800,
    lockStakeDuration: durationOptionsMainet
  }
}
const U2U_CHAINID = process.env.REACT_APP_U2U_CHAINID || "2484";
export const appConfig: AppConfig = appConfigs[U2U_CHAINID]