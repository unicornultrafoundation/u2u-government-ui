import { useCallback } from "react";
import { useStakingContract } from "./useContract";
import { CreateValidatorParams } from "../types";
import { ethers } from "ethers";
import { GAS_LIMIT_HARD } from "../contants";

export const useCreateValidator = () => {
  const stakingContract = useStakingContract()
  const create = useCallback(async (params: CreateValidatorParams) => {
    const delAmountDec = ethers.utils.parseEther(params.amount.toString()).toString();
    const pubkeyBytes = ethers.utils.arrayify(params.pubkey)    
    const tx = await stakingContract.createValidator(pubkeyBytes, { value: delAmountDec, gasLimit: GAS_LIMIT_HARD });
    const receipt = await tx.wait();
    return receipt
  }, [stakingContract])
  return {
    create
  }
}