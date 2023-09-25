import { TableLimit } from "../contants";
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

const queryWithdrawalRequest = (delegator: string, validatorId: number) => apolloClient.query({
  query: Schema().WITHDRAWALREQUEST,
  variables: {
    delegatorAddress: delegator,
    validatorId: validatorId
  },
  fetchPolicy: "no-cache"
})

const queryLockedStake = (delegator: string, valIdHex: string) => apolloClient.query({
  query: Schema().LOCKE_STAKE,
  variables: {
    delegatorAddress: delegator,
    valId: valIdHex
  },
  fetchPolicy: "no-cache"
})

const queryDelegationsPagination = (valId: number, skip: number) => apolloClient.query({
  query: Schema().DELEGATIONS_PAGINATION,
  variables: {
    validatorId: valId,
    skip: skip,
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

const queryValidatorsApr = (vals: number[]) => apolloStakingClient.query({
  query: Schema().VALIDATORS_APR(vals),
  fetchPolicy: "no-cache"
})


const queryEpochOfValidator = (valId: number) => apolloU2UNetworkClient.query({
  query: Schema().EPOCH_OF_VALDIATOR,
  variables: {
    validatorId: valId
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
  queryEpochOfValidator
}