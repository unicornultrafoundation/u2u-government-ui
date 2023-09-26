import { useEffect, useState } from "react"
import { QueryService } from "../../thegraph"
import { useRefresh } from "../useRefresh"
import { DataProcessor } from "./dataProccesser"
import { Validator } from "../../types"
import { BigNumber } from "ethers"

export const useFetchAllValidator = () => {
  const [validators, setValidators] = useState<Validator[]>([])
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    (async () => {
      const { data } = await QueryService.queryValidators()
      const { data: stakingStats } = await QueryService.queryStakingStats()
      const totalNetworkStaked = stakingStats && stakingStats.stakings ? BigNumber.from(stakingStats.stakings[0].totalStaked || 0) : BigNumber.from(0)
      if (data && data.validators.length > 0) {
        let valIds: number[] = data.validators.map((v: any) => Number(v.validatorId))
        const { data: dataApr } = await QueryService.queryValidatorsApr(valIds)
        setValidators(data.validators.map((v: any) => {
          let apr = dataApr[`apr${v.validatorId}`]
          return DataProcessor.validator(v, totalNetworkStaked, Number(apr))
        }))
      }
    })()
  }, [fastRefresh])
  return {
    validators
  }
}