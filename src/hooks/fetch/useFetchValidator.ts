import { useEffect, useState } from "react"
import { Validator } from "../../types"
import { useRefresh } from "../useRefresh"
import { QueryService } from "../../thegraph"
import { DataProcessor } from "./dataProccesser"
import { BigNumber } from "ethers"
import { useValidatorStore } from "../../store"

export const useFetchValidator = (valId: number) => {
  const [validator, setValidator] = useState<Validator>({} as Validator)
  const { mediumRefresh } = useRefresh()
  const [allValidators] = useValidatorStore(state => [
    state.allValidators
  ])

  useEffect(() => {
    if (!valId) return
    const _findIndex = allValidators.findIndex((val: Validator) => Number(val.valId) === valId);
    if (_findIndex > -1) {
      setValidator(allValidators[_findIndex])
      return
    }
    (async () => {
      const { data } = await QueryService.queryValidatorDetail(valId)
      const {data: stakingStats} = await QueryService.queryStakingStats()
      const totalNetworkStaked = stakingStats && stakingStats.stakings ? BigNumber.from(stakingStats.stakings[0].totalStaked || 0) : BigNumber.from(0)
      if (data && data.validators.length > 0) {
        const { data: dataApr } = await QueryService.queryValidatorsApr([valId])
        let apr = dataApr[`apr${valId}`]
        const _val = await DataProcessor.validator(data.validators[0], totalNetworkStaked, Number(apr))
        setValidator(_val)
      }
    })()
  }, [mediumRefresh, valId, allValidators])
  return {
    validator
  }
}