import { BigNumber } from "ethers"
import { Validator } from "../../../types"
import { delegation } from "./delegation"

export const validator  = (data: any, totalStaked: BigNumber): Validator => {  
  if (!data) return {} as Validator
  return {
    valId: data.validatorId,
    name: `Validator ${data.validatorId}`,
    auth: data.auth || "",
    createdEpoch: data.createdEpoch || "",
    createdTime: data.createdTime || "",
    active: Number(data.active) === 0,
    online: Number(data.online) === 0,
    delegatedAmount: BigNumber.from(data.delegatedAmount || 0),
    selfStakedAmount: BigNumber.from(data.selfStaked || 0),
    totalStakedAmount: BigNumber.from(data.totalStakedAmount || 0),
    totalClaimedRewards: BigNumber.from(data.totalClaimedRewards || 0),
    downTime: data.downTime,
    lockedUntil: data.lockedUntil,
    lockDays: data.lockDays,
    votingPower: totalStaked ? Number(BigNumber.from(data.totalStakedAmount).mul(BigNumber.from(1000000)).div(totalStaked)) : 0,
    delegations: data.delegations && data.delegations.length > 0 ? data.delegations.map((d: any) => delegation(d)) : []
  }
}