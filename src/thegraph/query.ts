import { apolloClient } from "./client";
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

const queryLockedStake = (delegator: string) => apolloClient.query({
  query: Schema().LOCKE_STAKE,
  variables: {
    delegatorAddress: delegator
  },
  fetchPolicy: "no-cache"
})


export const QueryService = {
  queryValidators,
  queryStakingStats,
  queryValidatorDetail,
  queryDelegatorDetail,
  queryWithdrawalRequest,
  queryLockedStake
}