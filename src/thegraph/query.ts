import { apolloClient } from "./client";
import { Schema } from "./schema";

const queryStakingStats = () => apolloClient.query({query: Schema().STAKING_STATS})
const queryValidators = () => apolloClient.query({query: Schema().VALIDATORS})

export const QueryService = {
  queryValidators,
  queryStakingStats
}