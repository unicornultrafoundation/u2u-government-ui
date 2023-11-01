import { BigNumber } from "ethers"
import { Validation } from "../../../types"
import { validator } from "./validator"

export const validation  = (data: any, totalStaked: BigNumber, apr: number = 0): Validation => {  
  if (!data) return {} as Validation
  let actualStakedAmount = BigNumber.from(0)
  if (BigNumber.from(data.stakedAmount).gt(BigNumber.from(data.totalLockStake))) {
    actualStakedAmount = BigNumber.from(data.stakedAmount).sub(BigNumber.from(data.totalLockStake))
  }
  return {
    id: data.id,
    stakedAmount: BigNumber.from(data.stakedAmount),
    validator: validator(data.validator, totalStaked, apr),
    actualStakedAmount: actualStakedAmount
  }
}