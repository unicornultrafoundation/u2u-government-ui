import { BigNumber } from "ethers"
import { Delegator } from "../../../types"
import { validation } from "./validation"

export const delegator  = (data: any): Delegator => {  
  if (!data) return {} as Delegator
  return {
    id: data.id,
    address: data.address,
    stakedAmount: BigNumber.from(data.stakedAmount),
    createdOn: Number(data.createdOn),
    validations: data.validations && data.validations.length > 0 ? data.validations.map((i: any) => validation(i)) : [],
    totalClaimedRewards: BigNumber.from(data.totalClaimedRewards)
  }
}