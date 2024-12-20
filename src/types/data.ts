import { BigNumber } from "ethers"

export interface StakingStats {
  totalSelfStaked: BigNumber
  totalDelegated: BigNumber
  totalStaked: BigNumber
  totalValidator: number
  totalDelegator: number
}

export interface Validator {
  id: string
  valId: string
  name: string
  avatar: any
  auth: string
  createdEpoch: string
  createdTime: string
  active?: boolean
  online?: boolean
  delegatedAmount: BigNumber
  selfStakedAmount: BigNumber
  totalStakedAmount: BigNumber
  totalClaimedRewards: BigNumber
  downTime?: string
  lockedUntil?: string
  lockDays?: string
  delegations?: Delegation[]
  votingPower?: number
  totalDelegator: number
  apr: number
  authLockInfo?: LockedStake,
  website?: string
  description?: string
  image?: string
  maxDuration?: number
  maxApr: number
  minApr: number
}

export interface Validation {
  id: string
  validator: Validator
  stakedAmount: BigNumber
  actualStakedAmount: BigNumber
}

export interface Delegation {
  id: string
  validatorId: string
  delegatorAddress: string
  delegator: Delegator
  stakedAmount: BigNumber
  totalClaimedRewards: BigNumber
} 

export interface Delegator {
  id: string
  address: string
  stakedAmount: BigNumber
  createdOn: number
  validations?: Validation[]
  totalClaimedRewards: BigNumber
}

export interface WithdrawalRequest {
  wrId: string
  delegatorAddress: string
  validatorId: string
  unbondTime: number
  unbondingAmount: BigNumber
  withdrawalAbleTime: number
  withdrawable: boolean
  withdrawalAmount: BigNumber
  undelegateHash: string
  withdrawalHash: string
  withdrawalTime: number
  withdrawal: boolean
}

export interface LockedStake {
  delegator: string
  validatorId: string
  duration: number
  endTime: number
  lockedAmount: BigNumber
  penalty: BigNumber
  isLockedUp: boolean
}

export interface LockupInfo {
  lockedStake: BigNumber
  duration: number
  fromEpoch: number
  endTime: number
}

export interface ValidatorEpochInfo {
  epochId: number
  validatorId: number
  epochRewards: BigNumber
  endTime: number
}

export interface EpochInfo {
  epochId: number
  endTime: number
  epochRewards: BigNumber
  totalRewards: BigNumber
}

export interface EpochReward {
  epochId: number
  totalRewards: BigNumber
  totalStake: BigNumber
}

export interface StakingTransaction {
  txHash: string
  validator: number
  from: string
  type: number
  createdAt: number
  age: number
}

export interface QueryAPRPayload {
  validator: any
  amount: string
  duration: any
}