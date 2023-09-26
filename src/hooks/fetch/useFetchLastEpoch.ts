import { useEffect, useState } from "react"
import { EpochInfo } from "../../types"
import { useRefresh } from "../useRefresh"
import { QueryService } from "../../thegraph"
import { DataProcessor } from "./dataProccesser"

export const useFetchLastEpoch = () => {
  const [lastEpoch, setLastEpoch] = useState<EpochInfo>({} as EpochInfo)
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    (async () => {
      const { data } = await QueryService.queryLastEpoch()
      if (data && data.epoches.length > 0) {
        setLastEpoch(DataProcessor.epoch(data.epoches[0]))
      }
    })()
  }, [slowRefresh])
  return {
    lastEpoch
  }
}