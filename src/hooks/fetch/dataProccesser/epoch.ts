import { BigNumber } from "ethers"
import { EpochInfo, EpochReward } from "../../../types"

export const epoch  = (data: any): EpochInfo => {
  if (!data) return {} as EpochInfo
  return {
    epochId: Number(data.epoch),
    endTime:  Number(data.endTime) * 1000,
    epochRewards: BigNumber.from(data.epochRewards),
    totalRewards: BigNumber.from(data.totalRewards)
  }
}


export const epochRewards  = (data: any): EpochReward => {
  if (!data) return {} as EpochReward
  return {
    epochId: Number(data.epoch),
    totalRewards: BigNumber.from(data.totalRewards),
    totalStake: BigNumber.from(data.totalStake)
  }
}


export const validatorEpochRewards  = (data: any): EpochReward => {
  if (!data) return {} as EpochReward
  return {
    epochId: Number(data.epoch.epoch),
    totalRewards: BigNumber.from(data.totalRewards),
    totalStake: BigNumber.from(0)
  }
}
