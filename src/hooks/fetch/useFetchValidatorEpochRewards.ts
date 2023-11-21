import { useEffect, useState } from "react"
import { QueryService } from "../../thegraph"
import { DataProcessor } from "./dataProccesser"
import { EpochReward } from "../../types"

export const useFetchValidatorEpochRewards = (valId: number) => {
  const [rewards, setRewards] = useState<EpochReward[]>([])
  useEffect(() => {
    if (!valId) return
    (async () => {
      const { data } = await QueryService.queryValidatorEpochsRewards(valId)
      if (data && data.validators.length > 0) {
        setRewards(data.validators.map((i: any) => DataProcessor.validatorEpochRewards(i)))
      }
    })()
  }, [valId])
  return {
    rewards
  }
}