import { useCallback } from "react";
import { useStakingContract } from "./useContract";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import {useWeb3} from "./useWeb3";

export const useCalcPenalty = () => {

  const stakingContract = useStakingContract()
  // const {account} = useWeb3React()
  const { address } = useWeb3();
  const calcPen = useCallback(async (validator: number, unLockAmount: string) => {
    try {
      if (validator && address) {
        const amountDec = ethers.utils.parseEther(unLockAmount).toString();
        return await stakingContract.callStatic.unlockStake(validator, amountDec)
      }
    } catch (error) { 
      return "0"
    }
  }, [stakingContract, address])

  return {
    calcPen
  }
}