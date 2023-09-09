import { useCallback } from "react";
import { useStakingContract } from "./useContract";
import { BigNumber } from "ethers";
import { StakingFetch } from "./fetch/stakingFetch";

export const useAPR = () => {
  const stakingContract = useStakingContract()
  const accumulateRewardPerEpoch = useCallback(async (validatorID: number) => {
    if (!validatorID) return BigNumber.from(0);
    const _epoch = await StakingFetch.currentEpoch(stakingContract)
    const _epochNumber = BigNumber.from(_epoch).toNumber();
    const _fromEpoch = await StakingFetch.getEpochAccumulatedRewardPerToken(stakingContract, _epochNumber - 2, validatorID)
    const _toEpoch = await StakingFetch.getEpochAccumulatedRewardPerToken(stakingContract, _epochNumber - 1, validatorID)
      return BigNumber.from(_toEpoch).sub(BigNumber.from(_fromEpoch))
  }, [stakingContract])
  return {
    accumulateRewardPerEpoch
  }
}