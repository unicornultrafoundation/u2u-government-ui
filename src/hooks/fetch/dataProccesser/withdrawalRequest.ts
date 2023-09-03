import { BigNumber } from "ethers"
import { WithdrawalRequest } from "../../../types"
import { WITHDRAWAL_PERIOD_TIME } from "../../../contants"
import { Zero_Bi } from "../../../utils"

export const withdrawalRequest = (data: any): WithdrawalRequest => {
  if (!data) return {} as WithdrawalRequest
  const _now = Math.floor(Date.now() / 1000)
  return {
    wrId: data.wrID,
    delegatorAddress: data.delegatorAddress,
    validatorId: data.validatorId,
    unbondTime: Number(data.time),
    unbondingAmount: BigNumber.from(data.unbondingAmount),
    withdrawalTime: Number(data.time) + WITHDRAWAL_PERIOD_TIME,
    withdrawableAmount: _now -  Number(data.time) > WITHDRAWAL_PERIOD_TIME ? BigNumber.from(data.unbondingAmount) : Zero_Bi
  }
}
