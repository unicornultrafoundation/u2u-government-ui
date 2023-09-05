import { useEffect, useState } from "react"
import { useRefresh } from "./useRefresh"
import { useStakingContract } from "./useContract"

export const useIsLockedUp = (delegatorAddress: string, validatorId: number) => {
  const stakingContract = useStakingContract()
  const [isLockedUp, setIsLockedUp] = useState(false)
  const {slowRefresh} = useRefresh()
  useEffect(() => {
      (async() => {
          if (!delegatorAddress || !validatorId) return;
          try {
            const _isTrue = await stakingContract.isLockedUp(delegatorAddress, validatorId)
            console.log("_isTrue", _isTrue);
            setIsLockedUp(_isTrue)
          } catch (error) {
            console.log(error);
           }
      })()
  }, [delegatorAddress, stakingContract, validatorId, slowRefresh]);
  return {
    isLockedUp
  }
}