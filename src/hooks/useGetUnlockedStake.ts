import { useEffect, useState } from "react"
import { useRefresh } from "./useRefresh"
import { ethers } from "ethers"
import { useStakingContract } from "./useContract"

export const useGetUnlockedStake = (delegatorAddress: string, validatorId: number) => {
  const stakingContract = useStakingContract()
  const [unlockedStake, setUnlockedStake] = useState("")
  const {slowRefresh} = useRefresh()
  useEffect(() => {
      (async() => {
          if (!delegatorAddress || !validatorId) return;
          try {
            const _rewards = await stakingContract.getUnlockedStake(delegatorAddress, validatorId)
            setUnlockedStake(ethers.utils.formatEther(_rewards))
          } catch (error) {
            
          }
      })()
  }, [delegatorAddress, stakingContract, validatorId, slowRefresh]);
  return {
    unlockedStake
  }
}