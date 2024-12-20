import { BigNumber } from "ethers";

export const POLLING_INTERVAL = 12000;
export const connectorLocalStorageKey = "connectorId";
export const GAS_LIMIT_HARD = 1000000
export const VALIDATOR_COMMISSION = 15
export const FAST_REFRESH_INTERVAL = 5000
export const MEDIUM_REFRESH_INTERVAL = 10000
export const SLOW_REFRESH_INTERVAL = 20000
export const epochTime = BigNumber.from(420);
export const DecimalBigNumber = BigNumber.from("1000000000000000000")
export const WALLET_CONNECT_KEY = process.env.REACT_APP_WALLET_CONNECT_KEY as string
export const TableLimit = 8;
