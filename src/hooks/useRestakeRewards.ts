import { useCallback } from "react";
import { useStakingContract } from "./useContract";
import { RestakeRewardsParams } from "../types";
import { GAS_LIMIT_HARD } from "../contants";

export const useRestakeRewards = () => {
  const stakingContract = useStakingContract()
  const restake = useCallback(async (params: RestakeRewardsParams) => {
    const tx = await stakingContract.restakeRewards(params.toValidatorID, { gasLimit: GAS_LIMIT_HARD });
    const receipt = await tx.wait();
    return receipt
  }, [stakingContract])
  return {
    restake
  }
}