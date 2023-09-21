import { useEffect, useState } from "react"
import { useRefresh } from "./useRefresh"
import { BigNumber } from "ethers"
import { useStakingContract } from "./useContract"
import { LockupInfo } from "../types"

export const useLockupInfo = (delegatorAddress: string, validatorId: number) => {
  const stakingContract = useStakingContract()
  const [lockStakeInfo, setLockStakeInfo] = useState<LockupInfo>({} as LockupInfo)
  const {fastRefresh} = useRefresh()
  useEffect(() => {
      (async() => {
          if (!delegatorAddress || !validatorId) return;
          try {
            const info = await stakingContract.getLockupInfo(delegatorAddress, validatorId)
            setLockStakeInfo({
              lockedStake: BigNumber.from(info[0]),
              fromEpoch: Number(info[1]),
              endTime: Number(info[2]),
              duration: Number(info[3])
            })
          } catch (error) {   
          }
      })()
  }, [delegatorAddress, stakingContract, validatorId, fastRefresh]);
  return {
    lockStakeInfo
  }
}