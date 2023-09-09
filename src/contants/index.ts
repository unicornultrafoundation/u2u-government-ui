import { BigNumber } from "ethers";
import { SelectOption } from "../components/form";

export * from "./abi"

export const POLLING_INTERVAL = 12000;
export const connectorLocalStorageKey = "connectorId";
export const U2U_CHAINID_MAINET = Number(process.env.REACT_APP_U2U_CHAINID_MAINET || 2484);
export const NODE_RPC = process.env.REACT_APP_NODE_RPC as string || "https://rpc-nebulas-testnet.uniultra.xyz"
export const EXPLORER_LINK = process.env.REACT_APP_EXPLORER_LINK as string || "https://testnet.u2uscan.xyz"
export const CHAIN_SUBGRAPH_URL = process.env.REACT_APP_CHAIN_SUBGRAPH_URL as string || "http://localhost:8000/subgraphs/name/u2u/sfc-subgraph"

export const STAKING_CONTRACT_ADDRESS = "0xfc00face00000000000000000000000000000000"
export const GAS_LIMIT_HARD = 1000000
export const VALIDATOR_COMMISSION = 15


export const FAST_REFRESH_INTERVAL = 5000
export const MEDIUM_REFRESH_INTERVAL = 20000
export const SLOW_REFRESH_INTERVAL = 60000


export const WITHDRAWAL_PERIOD_TIME = Number(process.env.REACT_APP_WITHDRAWAL_PERIOD_TIME || 604800)

export const epochTime = BigNumber.from(420);
export const DecimalBigNumber = BigNumber.from("1000000000000000000")

export const durationOptions: SelectOption[] = [
  { label: "14 day", value: 8467200 },
  { label: "30 day", value: 18144000 },
  { label: "60 day", value: 36288000 },
  { label: "90 day", value: 54432000 },
  { label: "180 day", value: 108864000 }
]

