import { useCallback } from "react";
import { useStakingContract } from "./useContract"
import { RelockStakeParams } from "../types";
import { ethers } from "ethers";
import { GAS_LIMIT_HARD } from "../contants";

export const useRelockStake = () => {
  const stakingContract = useStakingContract()
  const relockStake = useCallback(async (params: RelockStakeParams) => {
    const amountDec = ethers.utils.parseEther(params.amount).toString();
    console.log("RelockStake params: ", params)
    const tx = await stakingContract.relockStake(params.toValidatorID, params.lockupDuration, amountDec, { gasLimit: GAS_LIMIT_HARD });
    const receipt = await tx.wait();
    return receipt
  }, [stakingContract])
  return {
    relockStake
  }
}