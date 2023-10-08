import { useFetchAllValidator, useFetchLastEpoch, useFetchStakingStats, useTotalSupply } from "./hooks"

export const Updater = () => {
  useFetchAllValidator()
  useFetchStakingStats()
  useFetchLastEpoch()
  useTotalSupply()
  return <></>
}