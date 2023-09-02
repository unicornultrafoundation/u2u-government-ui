import { BigNumber } from "ethers"
import { StakingStats } from "../../../types"
import { defaultStakingStats } from "./defaultValue"

export const stakingStats = (data: any): StakingStats => {
  if (!data) return defaultStakingStats
  return {
    totalSelfStaked: BigNumber.from(data.totalSelfStaked || 0),
    totalDelegated: BigNumber.from(data.totalDelegated || 0),
    totalStaked: BigNumber.from(data.totalStaked || 0),
    totalValidator: Number(data.totalValidator || 0),
    totalDelegator: Number(data.totalDelegator || 0)
  }
}

