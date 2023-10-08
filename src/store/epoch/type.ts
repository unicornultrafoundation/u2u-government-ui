import { EpochInfo } from "../../types";

export interface EpochStoreType {
  lastEpoch: EpochInfo
}

export interface EpochStoreAction {
  updateLastEpoch: (e: EpochInfo) => void;
}