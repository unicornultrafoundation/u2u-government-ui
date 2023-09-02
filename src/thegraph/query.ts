import { apolloClient } from "./client";
import { Schema } from "./schema";

const queryStakingStats = () => apolloClient.query({ query: Schema().STAKING_STATS })
const queryValidators = () => apolloClient.query({ query: Schema().VALIDATORS })

const queryValidatorDetail = (valId: number) => apolloClient.query({
  query: Schema().VALIDATOR_DETAIL,
  variables: {
    valId: valId
  }
})

const queryDelegatorDetail = (address: string) => apolloClient.query({
  query: Schema().DELEGATOR_DETAIL,
  variables: {
    delegatorAddress: address
  }
})

export const QueryService = {
  queryValidators,
  queryStakingStats,
  queryValidatorDetail,
  queryDelegatorDetail
}