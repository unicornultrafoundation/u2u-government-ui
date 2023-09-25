import { BigNumber } from "ethers"
import { EpochInfo } from "../../../types"

export const epoch  = (data: any): EpochInfo => {
  if (!data) return {} as EpochInfo
  return {
    epochId: Number(data.epochId),
    validatorId: Number(data.validatorId),
    epochRewards: BigNumber.from(data.epochRewards)
  }
}