import { gql } from "@apollo/client"

const DELEGATIONS_GQL = `
          id
          validatorId
          delegator {
            id
            address
          }
          stakedAmount  
          totalClaimedRewards
      `;
const VALIDATOR_GQL = `
          id
          validatorId
          hash
          auth
          selfStaked
          delegatedAmount
          totalStakedAmount
          createdTime
          createdEpoch
          active
          online
          downTime
          lockedUntil
          lockDays
          totalClaimedRewards
          delegations {${DELEGATIONS_GQL}}
          totalDelegator
`

const VALIDATIONS_GQL = `
        id
        validator {${VALIDATOR_GQL}}
        stakedAmount
`

const EPOCH_OF_VAL_GQL = `
          id
          receivedStake
          accumulatedRewardPerToken
          epoch {
            id
            block
            endTime
            totalTxReward
            epochFee
            epochRewards
            totalRewards
          }
          validatorId
          epochRewards
          totalRewards
`


export const Schema = () => {
  return {
    STAKING_STATS: gql`
      query StakingStats {
        stakings {
          id
          totalStaked
          totalDelegated
          totalSelfStaked
          totalValidator
          totalDelegator
        }
      }
    `,
    VALIDATORS: gql`
      query Validators {
        validators {${VALIDATOR_GQL}}
      }
    `,
    VALIDATOR_DETAIL: gql`
      query ValidatorDetail($valId: Int!) {
        validators(where:{
          validatorId: $valId
        }) 
          {${VALIDATOR_GQL}}
      }
    `,
    DELEGATOR_DETAIL: gql`
      query DelegatorDetail($delegatorAddress: String!) {
            delegators(where:{
            address: $delegatorAddress
            }) {
              id
              address
              stakedAmount
              createdOn
              totalClaimedRewards
              validations {${VALIDATIONS_GQL}}
            }
          stakings {
            id
            totalStaked
            totalDelegated
            totalSelfStaked
            totalValidator
            totalDelegator
          }
      }
    `,
    WITHDRAWALREQUEST: gql`
      query WithdrawalRequest($delegatorAddress: String!) {
        withdrawalRequests (where:{
          delegatorAddress: $delegatorAddress
        }
        orderBy: time
        orderDirection: desc
        ) { 
          id
          hash
          delegatorAddress
          validatorId
          delegatorAddress
          wrID
          time
          unbondingAmount
          withdrawHash
          hash
          withdrawalAmount
          withdrawTime
        }
      }
    `,
    LOCKE_STAKE: gql`
      query LockedUp($delegatorAddress: String!) {
        lockedUps (where:{
            delegator: $delegatorAddress
          }) {
            delegator {
              id
            }
            validator {
              id
            }
            duration
            lockedAmount
            unlockedAmount
            penalty
            endTime
          }
      }
    `,
    LOCKE_STAKE_VAL: gql`
    query LockedUp($delegatorAddress: String!, $validator: String!) {
      lockedUps (where:{
          delegator: $delegatorAddress,
          validator: $validator
        }) {
          delegator {
            id
          }
          validator {
            id
          }
          duration
          lockedAmount
          unlockedAmount
          penalty
          endTime
        }
    }
  `,
    DELEGATIONS_PAGINATION: gql`
      query Delegations($validatorId: Int!, $skip: Int!, $limit: Int!) {
        delegations(where:{
            validatorId: $validatorId
        } orderBy: stakedAmount
          orderDirection: desc  
          first: $limit
          skip: $skip
        ) {${DELEGATIONS_GQL}}
      }
    `,
    STAKING_APR: gql`
      query stakingApr($validatorId: Int!, $stakingAmount: String!) {
        apr0: calculateApr(
          validatorId: $validatorId
          amount: $stakingAmount
          duration: 0
        )
      }
    `,
    VALIDATORS_APR(vals: any[], amount: string, duration: number) {
      let queryString = `query stakingApr {`;
      queryString += vals.map(
        (val) => `
          apr${val}: calculateApr(
            validatorId: ${val}
            amount: "${amount}"
            duration: ${duration}
          )
        `
      );
      queryString += "}";
      return gql(queryString);
    },
    EPOCH_OF_VALIDATOR: gql`
      query EpochOfValidator ($validatorId: Int!, $validatorIdHexString: String!, $skip: Int!, $limit: Int!) {
        validators(
        orderBy: epoch__block
        orderDirection: desc
        first: $limit
        skip: $skip
        where: {
          validatorId: $validatorId
        }
        ) {${EPOCH_OF_VAL_GQL}}
        validatorCounters (where:{
          id: $validatorIdHexString
        }) {
            total
            id
          }
      }
    `,
    LAST_EPOCH: gql`
      query LastEpoch {
        epoches (
        orderBy: epoch
        orderDirection: desc
        first: 1
        ) {
          epoch
          endTime
          epochRewards
          totalRewards
        }
      }
    `,
    STAKING_TXS: gql`
      query StakingTxs($from: String!, $skip: Int!, $limit: Int!) {
        transations (where:{
          from: $from
        }, 
        first: $limit
        skip: $skip
        orderBy:block 
        orderDirection: desc) {
          block
          txHash
          from
          type
          validatorId
          createdAt
        }
        transactionCounts (where:{
          id: $from
        }) {
          count
        }
      }
    `,
    GET_EPOCHS_REWARDS: gql`
        query EpochsRewards {
          epoches(orderBy: epoch, orderDirection: desc, first: 500) {
            epoch
            totalRewards
            totalStake
          }
        }
      `,
    GET_VALIDATOR_EPOCHS_REWARDS: gql`
      query EpochsRewards($validator: Int!) {
        validators(
          where: {validatorId: $validator}
          orderBy: epoch__epoch
          orderDirection: desc
        ) {
          totalRewards
          epoch {
            epoch
          }
        }
      }
    `,
  }
}