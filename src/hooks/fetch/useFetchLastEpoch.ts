import { useEffect } from "react"
import { useRefresh } from "../useRefresh"
import { QueryService } from "../../thegraph"
import { DataProcessor } from "./dataProccesser"
import { useEpochStore } from "../../store"

export const useFetchLastEpoch = () => {
  const [updateLastEpoch] = useEpochStore(state => [
    state.updateLastEpoch
  ])
  const { mediumRefresh } = useRefresh()
  useEffect(() => {
    (async () => {
      const { data } = await QueryService.queryLastEpoch()
      if (data && data.epoches.length > 0) {
        updateLastEpoch(DataProcessor.epoch(data.epoches[0]))
      }
    })()
  // eslint-disable-next-line
  }, [mediumRefresh])
}