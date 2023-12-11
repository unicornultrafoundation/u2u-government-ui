import { useCallback } from "react";
import { useStakingContract } from "./useContract"
import { LockStakeParams } from "../types";
import { ethers } from "ethers";
import { GAS_LIMIT_HARD } from "../contants";

export const useLockStake = () => {
  const stakingContract = useStakingContract()
  const lockStake = useCallback(async (params: LockStakeParams) => {
    const amountDec = ethers.utils.parseEther(params.amount).toString();
    console.log("LockStake params: ", params)
    const tx = await stakingContract.lockStake(params.toValidatorID, params.lockupDuration, amountDec, { gasLimit: GAS_LIMIT_HARD });
    const receipt = await tx.wait();
    return receipt
  }, [stakingContract])
  return {
    lockStake
  }
}