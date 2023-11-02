import { StakingTransaction } from "../../../types"
import { nowTime } from "../../../utils"

export const transaction = (data: any): StakingTransaction => {
  if (!data) return {} as StakingTransaction
  return {
    txHash: data.txHash,
    validator: Number(data.validatorId),
    from: data.from,
    type: Number(data.type),
    createdAt: Number(data.createdAt),
    age: nowTime() - (Number(data.createdAt) * 1000)
  }
}

