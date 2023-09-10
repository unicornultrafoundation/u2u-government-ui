import { BigNumber } from "ethers"
import { WithdrawalRequest } from "../../../types"
import { appConfig } from "../../../contants"

export const withdrawalRequest = (data: any): WithdrawalRequest => {
  if (!data) return {} as WithdrawalRequest
  const _now = Math.floor(Date.now() / 1000)
  return {
    wrId: data.wrID,
    delegatorAddress: data.delegatorAddress,
    validatorId: data.validatorId,
    unbondTime: Number(data.time) * 1000,
    unbondingAmount: BigNumber.from(data.unbondingAmount),
    withdrawalAbleTime: (Number(data.time) * 1000 + appConfig.withdrawPeriodTime * 1000),
    withdrawable: _now -  Number(data.time) > appConfig.withdrawPeriodTime ? true : false,
    withdrawalAmount: BigNumber.from(data.withdrawalAmount),
    undelegateHash: data.hash,
    withdrawalHash: data.withdrawHash,
    withdrawalTime: Number(data.withdrawTime) * 1000,
    withdrawal: !BigNumber.from(data.withdrawalAmount).isZero()
  }
}
