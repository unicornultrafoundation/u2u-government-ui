import { EpochInfo, EpochReward } from "../../types";

export interface EpochStoreType {
  lastEpoch: EpochInfo
  epochRewards: EpochReward[]
}

export interface EpochStoreAction {
  updateLastEpoch: (e: EpochInfo) => void;
  updateEpochRewards: (e: EpochReward[]) => void;
}