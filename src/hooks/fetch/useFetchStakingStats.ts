import { useEffect } from "react"
import { QueryService } from "../../thegraph"
import { DataProcessor } from "./dataProccesser"
import { useRefresh } from "../useRefresh"
import { useStakingStore } from "../../store"

export const useFetchStakingStats = () => {
  const [updateStakingStats] = useStakingStore(state => [
    state.updateStakingStats
  ])
  const { mediumRefresh } = useRefresh()
  useEffect(() => {
    (async () => {
      const { data } = await QueryService.queryStakingStats()
      if (data && data?.stakings) {
        updateStakingStats(DataProcessor.stakingStats(data?.stakings[0]));
      }
    })()
    // eslint-disable-next-line
  }, [mediumRefresh])
}