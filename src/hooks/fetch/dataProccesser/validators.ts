import { BigNumber } from "ethers"
import { Validator } from "../../../types"
import { delegation } from "./delegations"

export const validator  = (data: any): Validator => {  
  if (!data) return {} as Validator
  return {
    valId: data.validatorId,
    auth: data.auth || "",
    createdEpoch: data.createdEpoch || "",
    createdTime: data.createdTime || "",
    active: data.active === 1,
    online: data.online === 1,
    delegatedAmount: BigNumber.from(data.delegatedAmount || 0),
    selfStakedAmount: BigNumber.from(data.selfStaked || 0),
    totalStakedAmount: BigNumber.from(data.totalStakedAmount || 0),
    downTime: data.downTime,
    lockedUntil: data.lockedUntil,
    lockDays: data.lockDays,
    votingPower: data.votingPower ? Number(data.votingPower) / 100 : 0,
    delegations: data.delegations && data.delegations.length > 0 ? data.delegations.map((d: any) => delegation(d)) : []
  }
}