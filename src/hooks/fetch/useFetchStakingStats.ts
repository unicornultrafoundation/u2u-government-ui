import { useEffect, useState } from "react"
import { StakingStats } from "../../types"
import { QueryService } from "../../thegraph"
import { DataProcessor, defaultStakingStats } from "./dataProccesser"
import { useRefresh } from "../useRefresh"

export const useFetchStakingStats = () => {
    const [stakingStats, setStakingStats] = useState<StakingStats>(defaultStakingStats)
    const { slowRefresh } = useRefresh()
    useEffect(() => {
      (async() => {
        const {data} = await QueryService.queryStakingStats()
        if (data && data?.stakings) {
          setStakingStats(DataProcessor.stakingStats(data?.stakings[0]));
        }
      })()
    }, [slowRefresh])
    return {
      stakingStats
    }
}