import { BigNumber } from "ethers"

export interface StakingStats {
  totalSelfStaked: BigNumber
  totalDelegated: BigNumber
  totalStaked: BigNumber
  totalValidator: number
  totalDelegator: number
}

export interface Validator {
  valId: string
  name: string
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
  votingPower?: number
}

export interface Validation {
  id: string
  validator: Validator
  stakedAmount: BigNumber
}

export interface Delegation {
  id: string
  validatorId: string
  delegatorAddress: string
  delegator: Delegator
  stakedAmount: BigNumber
} 

export interface Delegator {
  id: string
  address: string
  stakedAmount: BigNumber
  createdOn: number
  validations?: Validation[]
}