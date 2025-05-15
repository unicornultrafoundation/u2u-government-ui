import {
  useChangeLanguage,
  useFetchAllValidator,
  useFetchDelegator,
  useFetchEpochRewards,
  useFetchLastEpoch,
  useFetchLockedStake,
  useFetchStakingStats,
  useFetchWithdrawRequest,
  useTotalSupply,
  usePriceU2U
} from "./hooks"

export const Updater = () => {
  useFetchAllValidator()
  useFetchStakingStats()
  useFetchLastEpoch()
  useTotalSupply()
  usePriceU2U()
  useChangeLanguage()
  useFetchDelegator()
  useFetchWithdrawRequest()
  useFetchLockedStake()
  useFetchEpochRewards()
  return <></>
}