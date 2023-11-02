import {
  useChangeLanguage,
  useFetchAllValidator,
  useFetchDelegator,
  useFetchEpochRewards,
  useFetchLastEpoch,
  useFetchLockedStake,
  useFetchStakingStats,
  useFetchWithdrawRequest,
  useTotalSupply
} from "./hooks"

export const Updater = () => {
  useFetchAllValidator()
  useFetchStakingStats()
  useFetchLastEpoch()
  useTotalSupply()
  useChangeLanguage()
  useFetchDelegator()
  useFetchWithdrawRequest()
  useFetchLockedStake()
  useFetchEpochRewards()
  return <></>
}