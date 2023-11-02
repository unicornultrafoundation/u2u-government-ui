import { useEffect, useState } from "react"
import { useDelegatorStore, useLockedStakeStore } from "../store"
import { Delegator, LockedStake, Validation } from "../types"

export const useDelegator = () => {

  const [delegatorState, setDelegatorState] = useState<Delegator | undefined>(undefined)
  const [delegator] = useDelegatorStore(state => [
    state.delegator
  ])
  const [valAuthLockStake] = useLockedStakeStore(state => [
    state.valAuthLockStake
  ])

  useEffect(() => {
    if (!delegator) return
    let _validations = delegator.validations
    if (_validations && _validations.length > 0) {
      _validations = _validations.map((item: Validation) => {
        const valId = item.validator.valId
        const _authLock = valAuthLockStake.findIndex((lock: LockedStake) => Number(lock.validatorId) === Number(valId))
        return {
          ...item,
          validator: {
            ...item.validator,
          authLockInfo: _authLock > - 1 ? valAuthLockStake[_authLock] : undefined
          }
        }
      })
    }
    setDelegatorState({...delegator, validations: _validations})
  }, [delegator, valAuthLockStake])

  return {
    delegatorState
  }
}