import { TableLimit } from "../contants";
import { QueryAPRPayload } from "../types";
import { nowTime } from "../utils";
import { apolloClient, apolloStakingClient, apolloU2UNetworkClient } from "./client";
import { Schema } from "./schema";

const queryStakingStats = () => apolloClient.query({
  query: Schema().STAKING_STATS,
  fetchPolicy: "no-cache"
})
const queryValidators = () => apolloClient.query({
  query: Schema().VALIDATORS,
  fetchPolicy: "no-cache"
})

const queryValidatorDetail = (valId: number) => apolloClient.query({
  query: Schema().VALIDATOR_DETAIL,
  variables: {
    valId: valId
  },
  fetchPolicy: "no-cache"
})

const queryDelegatorDetail = (address: string) => apolloClient.query({
  query: Schema().DELEGATOR_DETAIL,
  variables: {
    delegatorAddress: address
  },
  fetchPolicy: "no-cache"
})

const queryWithdrawalRequest = (delegator: string) => apolloClient.query({
  query: Schema().WITHDRAWALREQUEST,
  variables: {
    delegatorAddress: delegator
  },
  fetchPolicy: "no-cache"
})

const queryLockedStake = (delegator: string) => apolloClient.query({
  query: Schema().LOCKE_STAKE,
  variables: {
    delegatorAddress: delegator,
    timeNow: Math.round(nowTime()/1000)
  },
  fetchPolicy: "no-cache"
})

const queryLockedStakeValidator = (delegator: string, validator: string) => apolloClient.query({
  query: Schema().LOCKE_STAKE_VAL,
  variables: {
    delegatorAddress: delegator,
    validator: validator
  },
  fetchPolicy: "no-cache"
})

const queryDelegationsPagination = (valId: number, skip: number) => apolloClient.query({
  query: Schema().DELEGATIONS_PAGINATION,
  variables: {
    validatorId: valId,
    skip: skip*TableLimit,
    limit: TableLimit
  },
  fetchPolicy: "no-cache"
})

const queryValidatorApr = (valId: number, stakingAmount: string) => apolloStakingClient.query({
  query: Schema().STAKING_APR,
  variables: {
    validatorId: valId,
    stakingAmount: stakingAmount
  },
  fetchPolicy: "no-cache"
})


const queryValidatorsApr = (vals: QueryAPRPayload[]) => apolloStakingClient.query({
  query: Schema().VALIDATORS_APR(vals),
  fetchPolicy: "no-cache"
})

const queryEpochOfValidator = (valId: number, valIdHex: string, skip: number) => apolloU2UNetworkClient.query({
  query: Schema().EPOCH_OF_VALIDATOR,
  variables: {
    validatorId: valId,
    validatorIdHexString: valIdHex,
    skip: skip*TableLimit,
    limit: TableLimit
  },
  fetchPolicy: "no-cache"
})

const queryLastEpoch = () => apolloU2UNetworkClient.query({
  query: Schema().LAST_EPOCH,
  fetchPolicy: "no-cache"
})

const queryStakingTxs = (from: string, skip: number) => apolloClient.query({
  query: Schema().STAKING_TXS,
  variables: {
    from: from,
    skip: skip*TableLimit,
    limit: TableLimit
  },
  fetchPolicy: "no-cache"
})

const queryEpochsRewards = () => apolloU2UNetworkClient.query({
  query: Schema().GET_EPOCHS_REWARDS,
  fetchPolicy: "no-cache"
})

const queryValidatorEpochsRewards = (valId: number) => apolloU2UNetworkClient.query({
  query: Schema().GET_VALIDATOR_EPOCHS_REWARDS,
  variables: {
    validator: valId
  },
  fetchPolicy: "no-cache"
})

export const QueryService = {
  queryValidators,
  queryStakingStats,
  queryValidatorDetail,
  queryDelegatorDetail,
  queryWithdrawalRequest,
  queryLockedStake,
  queryDelegationsPagination,
  queryValidatorApr,
  queryValidatorsApr,
  queryEpochOfValidator,
  queryLastEpoch,
  queryStakingTxs,
  queryLockedStakeValidator,
  queryEpochsRewards,
  queryValidatorEpochsRewards
}