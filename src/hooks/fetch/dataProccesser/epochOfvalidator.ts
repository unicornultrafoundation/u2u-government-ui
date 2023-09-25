import { BigNumber } from "ethers"
import { ValidatorEpochInfo } from "../../../types"

export const epochOfvalidator  = (data: any): ValidatorEpochInfo => {
  if (!data) return {} as ValidatorEpochInfo
  return {
    epochId: Number(data.epoch.id),
    validatorId: Number(data.validatorId),
    epochRewards: BigNumber.from(data.epochRewards),
    endTime: Number(data.epoch.endTime) * 1000
  }
}