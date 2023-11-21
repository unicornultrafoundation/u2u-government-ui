import { useEffect, useState } from "react"
import { ValidatorEpochInfo } from "../../types"
import { useRefresh } from "../useRefresh"
import { QueryService } from "../../thegraph"
import { DataProcessor } from "./dataProccesser"

export const useFetchEpochOfValidator = (valId: number, skip: number = 0) => {
  const [epoches, setEpoches] = useState<ValidatorEpochInfo[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const { mediumRefresh } = useRefresh()
  useEffect(() => {
    if (!valId) return
    (async () => {
      const vaIdlHex = `0x${valId.toString(16)}`
      const { data } = await QueryService.queryEpochOfValidator(valId, vaIdlHex, skip)
      if (data && data.validators.length > 0) {
        setEpoches(data.validators.map((i: any) => DataProcessor.epochOfvalidator(i)))
        setTotalCount(data.validatorCounters[0] ? Number(data.validatorCounters[0].total) : 0)
      }
    })()
  }, [mediumRefresh, valId, skip])
  return {
    epoches,
    totalCount
  }
}