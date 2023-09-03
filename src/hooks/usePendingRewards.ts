import { useEffect, useState } from "react"
import { useRefresh } from "./useRefresh"
import { ethers } from "ethers"
import { useStakingContract } from "./useContract"

export const usePendingReward = (delegatorAddress: string, validatorId: number) => {
  const stakingContract = useStakingContract()
  const [pendingRewards, setPendingRewards] = useState("")
  const {mediumRefresh} = useRefresh()
  useEffect(() => {
      (async() => {
          if (!delegatorAddress || !validatorId) return;
          try {
            const _rewards = await stakingContract.pendingRewards(delegatorAddress, validatorId)
            setPendingRewards(ethers.utils.formatEther(_rewards))
          } catch (error) {
            
          }
      })()
  }, [delegatorAddress, stakingContract, validatorId, mediumRefresh]);
  return {
    pendingRewards
  }
}