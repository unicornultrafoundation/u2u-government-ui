import { BigNumber } from "ethers"
import { EpochInfo } from "../../../types"

export const epoch  = (data: any): EpochInfo => {
  if (!data) return {} as EpochInfo
  return {
    epochId: Number(data.epoch),
    endTime:  Number(data.endTime) * 1000,
    epochRewards: BigNumber.from(data.epochRewards),
    totalRewards: BigNumber.from(data.totalRewards)
  }
}