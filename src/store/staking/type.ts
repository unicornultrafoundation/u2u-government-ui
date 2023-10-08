import { StakingStats } from "../../types";

export interface StakingStoreType {
  stakingStats: StakingStats
  totalSupply: number | string
}

export interface StakingStoreAction {
  updateStakingStats: (s: StakingStats) => void;
  updateTotalSupply: (b: number | string) => void
}