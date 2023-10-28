import { useEffect, useState } from "react"
import { useDelegatorStore, useLockedStakeStore } from "../store"
import { Delegator, LockedStake, Validation } from "../types"
import { BigNumber } from "ethers"

export const useDelegator = () => {

  const [delegatorState, setDelegatorState] = useState<Delegator | undefined>(undefined)
  const [delegator] = useDelegatorStore(state => [
    state.delegator
  ])
  const [lockedStake, valAuthLockStake] = useLockedStakeStore(state => [
    state.lockedStake,
    state.valAuthLockStake
  ])

  useEffect(() => {
    if (!delegator) return
    let _validations = delegator.validations
    if (_validations && _validations.length > 0) {
      _validations = _validations.map((item: Validation) => {
        const valId = item.validator.valId
        let _actualStakedAmount = BigNumber.from(item.actualStakedAmount)
        const _lockIndex = lockedStake.findIndex((lock: LockedStake) => Number(lock.validatorId) === Number(valId))
        if (_lockIndex > -1) {
          const _lock = lockedStake[_lockIndex]
          if (_actualStakedAmount && !_actualStakedAmount.isZero()) {
            _actualStakedAmount = _actualStakedAmount.sub(BigNumber.from(_lock.lockedAmount || 0))
            if (_lock.penalty) {
              _actualStakedAmount = _actualStakedAmount.sub(_lock.penalty)
            }
          }
        }
        const _authLock = valAuthLockStake.findIndex((lock: LockedStake) => Number(lock.validatorId) === Number(valId))
        return {
          ...item,
          actualStakedAmount: _actualStakedAmount,
          validator: {
            ...item.validator,
          authLockInfo: _authLock > - 1 ? valAuthLockStake[_authLock] : undefined
          }
        }
      })
    }
    setDelegatorState({...delegator, validations: _validations})
  }, [delegator, lockedStake, valAuthLockStake])

  return {
    delegatorState
  }
}