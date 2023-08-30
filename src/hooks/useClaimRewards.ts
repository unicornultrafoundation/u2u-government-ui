import { useCallback } from "react";
import { useStakingContract } from "./useContract";
import { GAS_LIMIT_HARD } from "../contants";
import { ClaimRewardsParams } from "../types";

export const useClaimRewards = () => {
  const stakingContract = useStakingContract()
  const claimRewards = useCallback(async (params: ClaimRewardsParams) => {
    const tx = await stakingContract.claimRewards(params.toValidatorID, { gasLimit: GAS_LIMIT_HARD });
    const receipt = await tx.wait();
    return receipt
  }, [stakingContract])
  return {
    claimRewards
  }
}