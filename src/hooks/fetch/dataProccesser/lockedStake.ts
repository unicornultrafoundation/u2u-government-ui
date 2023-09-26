import { BigNumber } from "ethers"
import { LockedStake } from "../../../types"

export const lockedStake  = (data: any): LockedStake => {  
  if (!data) return {} as LockedStake
  return {
    delegator: data.delegator.id,
    validatorId: data.validator.id,
    duration: Number(data.duration) * 1000,
    endTime: Number(data.endTime) * 1000,
    lockedAmount: BigNumber.from(data.lockedAmount),
    penalty: data.penalty ? BigNumber.from(data.penalty) : BigNumber.from(0),
    isLockedUp: !!data.delegator.id 
  }
}