import { useEffect, useState } from "react"
import { Validator } from "../../types"
import { useRefresh } from "../useRefresh"
import { QueryService } from "../../thegraph"
import { DataProcessor } from "./dataProccesser"
import { BigNumber } from "ethers"

export const useFetchValidator = (valId: number) => {
  const [validator, setValidator] = useState<Validator>({} as Validator)
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (!valId) return
    (async () => {
      const { data } = await QueryService.queryValidatorDetail(valId)
      const {data: stakingStats} = await QueryService.queryStakingStats()
      const totalNetworkStaked = stakingStats && stakingStats.stakings ? BigNumber.from(stakingStats.stakings[0].totalStaked || 0) : BigNumber.from(0)
      if (data && data.validators.length > 0) {
        setValidator(DataProcessor.validator(data.validators[0], totalNetworkStaked))
      }
    })()
  }, [fastRefresh, valId])
  return {
    validator
  }
}