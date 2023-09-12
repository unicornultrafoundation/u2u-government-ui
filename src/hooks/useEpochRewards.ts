import { useEffect, useState } from "react"
import { useStakingContract } from "./useContract"
import { StakingFetch } from "./fetch/stakingFetch"
import { BigNumber } from "ethers"
import { bigFormatEther } from "../utils"


export const useEpochRewards = () => {
  const stakingContract = useStakingContract()
  const [rewardsPerEpoch, setRewardsPerEpoch] = useState<number>(0)
  useEffect(() => {
      (async () => {
        try {
          const _epoch = await StakingFetch.currentEpoch(stakingContract)
          const _epochNumber = BigNumber.from(_epoch).toNumber() - 1;

          const rs = await StakingFetch.currentEpochSnapShot(stakingContract, _epochNumber)
          const _u2uPerEpoch = BigNumber.from(rs[4]).mul(BigNumber.from(60*7)).add(BigNumber.from(rs[1]))
          setRewardsPerEpoch(Number(bigFormatEther(_u2uPerEpoch)))
        } catch (error) {   
        }
      })()
  }, [stakingContract])
  return {
    rewardsPerEpoch
  }
}