import { BigNumber } from "ethers"
import { Delegator } from "../../../types"
import { validation } from "./validation"

export const delegator  = async (data: any, totalStaked: BigNumber): Promise<Delegator> => {  
  if (!data) return {} as Delegator
  let _validations = [];
  if (data.validations && data.validations.length > 0) {
    const validationPromises = data.validations.map((i: any) => validation(i, totalStaked))
    _validations = await Promise.all(validationPromises)        
  }
  return {
    id: data.id,
    address: data.address,
    stakedAmount: BigNumber.from(data.stakedAmount),
    createdOn: Number(data.createdOn),
    validations: _validations,
    totalClaimedRewards: BigNumber.from(data.totalClaimedRewards)
  }
}