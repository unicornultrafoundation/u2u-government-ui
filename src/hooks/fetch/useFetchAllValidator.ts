import { useEffect } from "react"
import { QueryService } from "../../thegraph"
import { useRefresh } from "../useRefresh"
import { DataProcessor } from "./dataProccesser"
import { BigNumber } from "ethers"
import { useLockedStakeStore, useValidatorStore } from "../../store"
import { LockedStake, QueryAPRPayload, Validator } from "../../types"

export const useFetchAllValidator = () => {
  const [updateAllValidator, allValidators] = useValidatorStore(state => [
    state.updateAllValidator,
    state.allValidators
  ])

  const [updateValAuthLockStake] = useLockedStakeStore(state => [
    state.updateValAuthLockStake
  ])

  const { slowRefresh } = useRefresh()
  useEffect(() => {
    (async () => {
      
      const { data } = await QueryService.queryValidators()
      const { data: stakingStats } = await QueryService.queryStakingStats()
      const totalNetworkStaked = stakingStats && stakingStats.stakings ? BigNumber.from(stakingStats.stakings[0].totalStaked || 0) : BigNumber.from(0)
      if (data && data.validators.length > 0) {

        let vals = data.validators
        const locks = await Promise.all(allValidators.map((val: Validator) => {
          return QueryService.queryLockedStakeValidator(val.auth.toLowerCase(), val.id)
        }))

        if (locks && locks.length > 0) {
          const valAuthLock = locks.map((item: any) => {
            if (item && item.data && item.data.lockedUps) {
              return DataProcessor.lockedStake(item.data.lockedUps[0])
            }
            return {} as LockedStake
          }).filter(ii => !!ii)
          updateValAuthLockStake(valAuthLock)
          vals = vals.map((v: Validator, i: number) => {
            const _authLocks = valAuthLock.filter((lock: LockedStake) => Number(lock.validatorId) === Number(v.id))
            if (_authLocks && _authLocks.length > 0) {
              return {
                ...v,
                authLockInfo: _authLocks[0],
                maxDuration: maxDuration(_authLocks[0].endTime)
              }
            }
            return v
          })
        }
        
        const daySeconds = 24 * 60 * 60
        let valMaxApr: QueryAPRPayload[] = vals.map((v: Validator) => {
          return {
            validator: Number(v.id),
            amount: "1000000000000000000000",
            duration: v.maxDuration ? v.maxDuration * daySeconds : 0
          } as QueryAPRPayload
        })
        let valMinApr: QueryAPRPayload[] = vals.map((v: Validator) => {
          return {
            validator: Number(v.id),
            amount: "1000000000000000000000",
            duration: 0
          } as QueryAPRPayload
        })
        const { data: maxApr } = await QueryService.queryValidatorsApr(valMaxApr)
        const { data: minApr } = await QueryService.queryValidatorsApr(valMinApr)
        const valPromises = vals.map((v: any) => {
          let max = maxApr[`apr${v.validatorId}`]
          let min = minApr[`apr${v.validatorId}`]
          return DataProcessor.validator(v, totalNetworkStaked, Number(max), Number(min))
        })
        vals = await Promise.all(valPromises)        
        updateAllValidator(vals)
      }
    })()
    // eslint-disable-next-line
  }, [slowRefresh])

  const maxDuration = (_endTime: number) => {
    let now = Math.ceil((new Date()).getTime())
    if (_endTime < now) return 0
    let duration = Math.ceil((_endTime - now) / 86400000) - 1
    return duration
  }

  // useEffect(() => {
  //   if (allValidators && allValidators.length > 0) {
  //     (async () => {
  //       try {
  //         const locks = await Promise.all(allValidators.map((val: Validator) => {
  //           return QueryService.queryLockedStakeValidator(val.auth.toLowerCase(), val.id)
  //         }))
  //         if (locks && locks.length > 0) {
  //           const valAuthLock = locks.map((item: any) => {
  //             if (item && item.data && item.data.lockedUps) {
  //               return DataProcessor.lockedStake(item.data.lockedUps[0])
  //             }
  //             return {} as LockedStake
  //           }).filter(ii => !!ii)
  //           updateValAuthLockStake(valAuthLock)
  //           const _authLock = valAuthLock.findIndex((lock: LockedStake) => Number(lock.validatorId) === Number(valId))
  //           // _validations = _validations.map((item: Validation) => {
  //           //   const valId = item.validator.valId
  //           //   const _authLock = valAuthLockStake.findIndex((lock: LockedStake) => Number(lock.validatorId) === Number(valId))
  //           //   return {
  //           //     ...item,
  //           //     validator: {
  //           //       ...item.validator,
  //           //     authLockInfo: _authLock > - 1 ? valAuthLockStake[_authLock] : undefined
  //           //     }
  //           //   }
  //           // })
  //         }
  //       } catch (error) {
  //       }
  //     })()

  //   }
  //   // eslint-disable-next-line
  // }, [allValidators])

}