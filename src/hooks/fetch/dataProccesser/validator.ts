import { BigNumber } from "ethers"
import { Validator } from "../../../types"
import { delegation } from "./delegation"
import { fetchValidatorInfo } from "../../../utils"
import { Images } from "../../../images"

export const validator  = async (data: any, totalStaked: BigNumber, apr: number): Promise<Validator> => {  
  if (!data) return {} as Validator
  const valInfo = await fetchValidatorInfo(data.auth)
  let valAvartar = valInfo && data.auth ? `https://raw.githubusercontent.com/unicornultrafoundation/explorer-assets/master/validators_info/${data.auth.toLowerCase()}/logo.png` : Images.U2ULogoPNG
  return {
    id: data.id,
    valId: data.validatorId,
    avatar: valAvartar,
    name: valInfo && valInfo.moniker ? valInfo.moniker : `Validator ${data.validatorId}`,
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
    delegations: data.delegations && data.delegations.length > 0 ? data.delegations.map((d: any) => delegation(d)) : [],
    totalDelegator: Number(data.totalDelegator),
    apr: apr,
    website: valInfo && valInfo.website ?  valInfo.website : "",
    description: valInfo && valInfo.website ?  valInfo.website : ""
  }
}