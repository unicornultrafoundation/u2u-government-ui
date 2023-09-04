import { useEffect, useState } from "react";
import { useStakingContract } from "./useContract";
import { useRefresh } from "./useRefresh";
import { ethers } from "ethers";

export const useTotalSupply = () => {
  const stakingContract = useStakingContract()
  const [supply, setSupply] = useState("")
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    (async () => {
      try {
        const _rewards = await stakingContract.totalSupply()
        setSupply(ethers.utils.formatEther(_rewards))
      } catch (error) { }
    })()
  }, [stakingContract, slowRefresh]);
  return {
    supply
  }
}