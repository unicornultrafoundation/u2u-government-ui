import { StakingStats } from "../../types";

export interface StakingStoreType {
  stakingStats: StakingStats
  totalSupply: number | string
  priceU2u: number | string
}

export interface StakingStoreAction {
  updateStakingStats: (s: StakingStats) => void;
  updateTotalSupply: (b: number | string) => void
  updatePriceU2u: (b: number | string) => void
}