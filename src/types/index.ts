export interface DelegateParams {
  toValidatorID: number
  amount: number
}

export interface UnDelegateParams {
  toValidatorID: number
  wrID: number
  amount: number
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
