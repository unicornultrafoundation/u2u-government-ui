import { useCallback } from "react";
import { useStakingContract } from "./useContract"
import { UnDelegateParams } from "../types";
import { ethers } from "ethers";
import { GAS_LIMIT_HARD } from "../contants";

export const useUndelegate = () => {
  const stakingContract = useStakingContract()
  const undegegate = useCallback(async (params: UnDelegateParams) => {
    const amountDec = ethers.utils.parseEther(params.amount.toString()).toString();
    // Random wrID
    const _wrID = Math.floor(Math.random() * 100000)
    console.log("Undelegate params: ", params, _wrID)
    const tx = await stakingContract.undelegate(params.toValidatorID, _wrID, amountDec, { gasLimit: GAS_LIMIT_HARD });
    const receipt = await tx.wait();
    return receipt
  }, [stakingContract])
  return {
    undegegate
  }
}