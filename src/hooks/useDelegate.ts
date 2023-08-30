import { useCallback } from "react"
import { useStakingContract } from "./useContract"
import { DelegateParams } from "../types"
import { ethers } from "ethers"
import { GAS_LIMIT_HARD } from "../contants"

export const useDelegate = () => {
  const stakingContract = useStakingContract()
  const degegate = useCallback(async (params: DelegateParams) => {
    const delAmountDec = ethers.utils.parseEther(params.amount.toString()).toString();
    // const _estimateGas = await stakingContract.estimateGas.delegate(params.toValidatorID, { value: delAmountDec })
    // console.log("EstimateGas: ", _estimateGas)
    const tx = await stakingContract.delegate(params.toValidatorID, { value: delAmountDec, gasLimit: GAS_LIMIT_HARD });
    const receipt = await tx.wait();
    return receipt
  }, [stakingContract])
  return {
    degegate
  }
}
