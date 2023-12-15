import { BigNumber } from "ethers"
import { Validation } from "../../../types"
import { validator } from "./validator"
import { nowTime } from "../../../utils"

export const validation  = async (data: any, totalStaked: BigNumber, apr: number = 0): Promise<Validation> => {  
  if (!data) return {} as Validation
  let actualStakedAmount = BigNumber.from(data.stakedAmount)
  if (Math.round(nowTime()/1000) < Number(data.lockedEndtime)) {
    actualStakedAmount = actualStakedAmount.sub(BigNumber.from(data.totalLockStake))
  }
  
  const _validator = await validator(data.validator, totalStaked, apr)
  return {
    id: data.id,
    stakedAmount: BigNumber.from(data.stakedAmount),
    validator: _validator,
    actualStakedAmount: actualStakedAmount
  }
}