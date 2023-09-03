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
          votingPower
          totalClaimedRewards
          delegations {${DELEGATIONS_GQL}}
`

const VALIDATIONS_GQL = `
        id
        validatorId {${VALIDATOR_GQL}}
        stakedAmount
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
      }
    `,
    WITHDRAWALREQUEST: gql`
      query WithdrawalRequest($delegatorAddress: String!, $validatorId: Int!) {
        withdrawalRequests (where:{
          delegatorAddress: $delegatorAddress
          validatorId: $validatorId
        }) {
          id
          delegatorAddress
          validatorId
          wrID
          time
          unbondingAmount
        }
      }
    `
  }
}