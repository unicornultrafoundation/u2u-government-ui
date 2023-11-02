import { useEffect } from "react"
import { QueryService } from "../../thegraph"
import { DataProcessor } from "./dataProccesser"
import { useEpochStore } from "../../store"

export const useFetchEpochRewards = () => {
  const [updateEpochRewards] = useEpochStore(state => [
    state.updateEpochRewards
  ])
  useEffect(() => {
    (async () => {
      const { data } = await QueryService.queryEpochsRewards()
      if (data && data.epoches.length > 0) {
        updateEpochRewards(data.epoches.map((i: any) => DataProcessor.epochRewards(i)))
      }
    })()
    // eslint-disable-next-line
  }, [])
}