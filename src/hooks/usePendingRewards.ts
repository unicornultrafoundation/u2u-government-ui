// import { useEffect, useState } from "react"
// import { useRefresh } from "./useRefresh"
// import { ethers } from "ethers"
// import { useStakingContract } from "./useContract"
import {useAccount, useReadContract} from "wagmi";
import {contracts} from "../contants";
import {formatUnits} from "viem";

export const usePendingReward = (delegatorAddress: string, validatorId: number) => {
  // const stakingContract = useStakingContract()
  // const [pendingRewards, setPendingRewards] = useState("")
  // const {fastRefresh} = useRefresh()
    const { address } = useAccount()

    const { data: pendingRewards } = useReadContract({
        ...contracts.staking,
        functionName: 'pendingRewards',
        args: [delegatorAddress, validatorId],
        query: {
            refetchInterval: 3000,
            enabled: !!address,
        },
    })
  // useEffect(() => {
  //     (async() => {
  //         if (!delegatorAddress || !validatorId) return;
  //         try {
  //           const _rewards = await stakingContract.pendingRewards(delegatorAddress, validatorId)
  //           setPendingRewards(ethers.utils.formatEther(_rewards))
  //         } catch (error) {
  //
  //         }
  //     })()
  // }, [delegatorAddress, stakingContract, validatorId, fastRefresh]);
  return {
      pendingRewards: formatUnits(BigInt(pendingRewards?.toString() || 0),18)
  }
}