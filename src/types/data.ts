import { BigNumber } from "ethers"

export interface StakingStats {
  totalSelfStaked: BigNumber
  totalDelegated: BigNumber
  totalStaked: BigNumber
  totalValidator: BigNumber
  totalDelegator: BigNumber
}

export interface Validator {
  valId: string
  auth: string
  createdEpoch: string
  createdTime: string
  active?: boolean
  online?: boolean
  delegatedAmount: BigNumber
  selfStakedAmount: BigNumber
  totalStakedAmount: BigNumber
  downTime?: string
  lockedUntil?: string
  lockDays?: string
  delegations?: Delegation[]
  votingPower?: BigNumber
}

export interface Validation {
  id: string
  validatorId: string
  stakedAmount: number
}

export interface Delegation {
  id: string
  validatorId: string
  delegator: Delegator
  stakedAmount: BigNumber
} 

export interface Delegator {
  id: string
  address: string
  stakedAmount: number
  createdOn: number
  validations?: Validation[]
}