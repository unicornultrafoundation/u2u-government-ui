import { BigNumber } from "ethers"
import { Delegation } from "../../../types"

export const delegation  = (data: any): Delegation => {
  if (!data) return {} as Delegation
  return {
    id: data.id,
    validatorId: data.validatorId,
    delegator: data.delegator.id,
    stakedAmount: BigNumber.from(data.stakedAmount | 0)
  }
}