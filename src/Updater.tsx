import {
  useChangeLanguage,
  useFetchAllValidator,
  useFetchLastEpoch,
  useFetchStakingStats,
  useTotalSupply
} from "./hooks"

export const Updater = () => {
  useFetchAllValidator()
  useFetchStakingStats()
  useFetchLastEpoch()
  useTotalSupply()
  useChangeLanguage()
  return <></>
}