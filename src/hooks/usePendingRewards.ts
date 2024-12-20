import {useAccount, useReadContract} from "wagmi";
import {contracts} from "../contants";
import {formatUnits} from "viem";

export const usePendingReward = (delegatorAddress: string, validatorId: number) => {
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
  return {
      pendingRewards: formatUnits(BigInt(pendingRewards?.toString() || 0),18)
  }
}