import { useEffect, useState } from "react";
import { useStakingContract } from "./useContract";
import { useRefresh } from "./useRefresh";
import { BigNumber } from "ethers";
import { StakingFetch } from "./fetch/stakingFetch";

export const useCurrentEpoch = () => {
  const stakingContract = useStakingContract()
  const [epoch, setEpoch] = useState<number | null>(null)
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    (async () => {
      try {
        const _epoch = await StakingFetch.currentEpoch(stakingContract)
        setEpoch(BigNumber.from(_epoch).toNumber())
      } catch (error) {
      }
    })()
  }, [stakingContract, slowRefresh]);
  return {
    epoch
  }
}