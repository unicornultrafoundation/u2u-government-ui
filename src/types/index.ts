export * from "./data"
export interface DelegateParams {
  toValidatorID: number
  amount: string
}

export interface UnDelegateParams {
  toValidatorID: number
  amount: string
}

export interface WithdrawParams {
  toValidatorID: number
  wrID: number
}

export interface ClaimRewardsParams {
  toValidatorID: number
}

export interface RestakeRewardsParams {
  toValidatorID: number
}

export interface CreateValidatorParams {
  pubkey: string
  amount: number
}

export interface LockStakeParams {
  toValidatorID: number
  lockupDuration: number
  amount: string
}

export interface RelockStakeParams {
  toValidatorID: number
  lockupDuration: number
  amount: string
}

export interface UnlockStakeParams {
  toValidatorID: number
  amount: string
}