import { useEffect } from "react"
import { QueryService } from "../../thegraph"
import { useRefresh } from "../useRefresh"
import { DataProcessor } from "./dataProccesser"
import { BigNumber } from "ethers"
import { useLockedStakeStore, useValidatorStore } from "../../store"
import { LockedStake, Validator } from "../../types"

export const useFetchAllValidator = () => {
  const [updateAllValidator, allValidators] = useValidatorStore(state => [
    state.updateAllValidator,
    state.allValidators
  ])

  const [updateValAuthLockStake] = useLockedStakeStore(state => [
    state.updateValAuthLockStake
  ])

  const { fastRefresh } = useRefresh()
  useEffect(() => {
    (async () => {
      const { data } = await QueryService.queryValidators()
      const { data: stakingStats } = await QueryService.queryStakingStats()
      const totalNetworkStaked = stakingStats && stakingStats.stakings ? BigNumber.from(stakingStats.stakings[0].totalStaked || 0) : BigNumber.from(0)
      if (data && data.validators.length > 0) {
        let valIds: number[] = data.validators.map((v: any) => Number(v.validatorId))
        const { data: dataApr } = await QueryService.queryValidatorsApr(valIds)
        const valPromises = data.validators.map((v: any) => {
          let apr = dataApr[`apr${v.validatorId}`]
          return DataProcessor.validator(v, totalNetworkStaked, Number(apr))
        })
        const vals = await Promise.all(valPromises)        
        updateAllValidator(vals)
      }
    })()
    // eslint-disable-next-line
  }, [fastRefresh])

  useEffect(() => {
    if (allValidators && allValidators.length > 0) {
      (async () => {
        try {
          const locks = await Promise.all(allValidators.map((val: Validator) => {
            return QueryService.queryLockedStakeValidator(val.auth.toLowerCase(), val.id)
          }))
          if (locks && locks.length > 0) {
            updateValAuthLockStake(locks.map((item: any) => {
              if (item && item.data && item.data.lockedUps) {
                return DataProcessor.lockedStake(item.data.lockedUps[0])
              }
              return {} as LockedStake
            }).filter(ii => !!ii));
          }
        } catch (error) {

        }
      })()

    }
    // eslint-disable-next-line
  }, [allValidators])

}