import { useCallback } from "react";
import { useStakingContract } from "./useContract"
import { UnlockStakeParams } from "../types";
import { ethers } from "ethers";
import { GAS_LIMIT_HARD } from "../contants";

export const useUnlockStake = () => {
  const stakingContract = useStakingContract()
  const unlockStake = useCallback(async (params: UnlockStakeParams) => {
    const amountDec = ethers.utils.parseEther(params.amount.toString()).toString();
    console.log("unlockStake params: ", params)
    const tx = await stakingContract.unlockStake(params.toValidatorID, amountDec, { gasLimit: GAS_LIMIT_HARD });
    const receipt = await tx.wait();
    return receipt
  }, [stakingContract])
  return {
    unlockStake
  }
}