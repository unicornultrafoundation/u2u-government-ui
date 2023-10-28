import {
  useChangeLanguage,
  useFetchAllValidator,
  useFetchDelegator,
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
  return <></>
}