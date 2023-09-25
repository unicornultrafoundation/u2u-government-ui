import { useEffect, useState } from "react"
import { EpochInfo } from "../../types"
import { useRefresh } from "../useRefresh"
import { QueryService } from "../../thegraph"
import { DataProcessor } from "./dataProccesser"

export const useFetchEpochOfValidator = (valId: number, skip: number = 0) => {
  const [epoches, setEpoches] = useState<EpochInfo[]>([])
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    if (!valId) return
    (async () => {
      const { data } = await QueryService.queryEpochOfValidator(valId)
      if (data && data.validators.length > 0) {
        setEpoches(data.validators.map((i: any) => DataProcessor.epoch(i)))
      }
    })()
  }, [slowRefresh, valId, skip])
  return {
    epoches
  }
}