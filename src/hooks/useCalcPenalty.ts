import { useCallback } from "react";
import { useStakingContract } from "./useContract";
import { useWeb3React } from "@web3-react/core";
import { BigNumber, ethers } from "ethers";

export const useCalcPenalty = () => {

  const stakingContract = useStakingContract()
  const {account} = useWeb3React()
  const calcPen = useCallback(async (validator: number, unLockAmount: number, lockedAmount: BigNumber) => {
    try {
      if (validator && account && unLockAmount && lockedAmount) {
        const [lockupExtraReward, lockupBaseReward,] = await stakingContract.getStashedLockupRewards(account, validator)
        const unlockBigNum =  BigNumber.from(ethers.utils.parseEther(unLockAmount.toString()).toString())
        const lockupExtraRewardShare = BigNumber.from(lockupExtraReward).mul(unlockBigNum).div(lockedAmount)
        const lockupBaseRewardShare = BigNumber.from(lockupBaseReward).mul(unlockBigNum).div(lockedAmount).div(BigNumber.from(2))
        const penalty = lockupExtraRewardShare.add(lockupBaseRewardShare)        
        return penalty
      }
    } catch (error) { 
      return "0"
    }
  }, [stakingContract, account])

  return {
    calcPen
  }
}