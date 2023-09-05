import { BigNumber } from "ethers"
import { Validation } from "../../../types"
import { validator } from "./validator"

export const validation  = (data: any): Validation => {  
  if (!data) return {} as Validation
  return {
    id: data.id,
    stakedAmount: BigNumber.from(data.stakedAmount),
    validator: validator(data.validator)
  }
}