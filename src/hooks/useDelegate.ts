import { useCallback } from "react"
import { useStakingContract } from "./useContract"
import { DelegateParams } from "../types"
import { ethers } from "ethers"
import {contracts, GAS_LIMIT_HARD} from "../contants"
import {useAccount, useWriteContract} from "wagmi";
import {useWaitForTransaction} from "./useWaitForTransaction";

// export const useDelegate = () => {
//   const stakingContract = useStakingContract()
//   const degegate = useCallback(async (params: DelegateParams) => {
//     const delAmountDec = ethers.utils.parseEther(params.amount).toString();
//     const tx = await stakingContract.delegate(params.toValidatorID, { value: delAmountDec, gasLimit: GAS_LIMIT_HARD });
//     const receipt = await tx.wait();
//     return receipt
//   }, [stakingContract])
//   return {
//     degegate
//   }
// }

export const useDelegate = () => {
  const method = useWriteContract();
  const { waitForTransaction } = useWaitForTransaction();
  // const { address } = useAccount();

  const degegate = async (params: DelegateParams) => {
    const delAmountDec = ethers.utils.parseEther(params.amount);
    const txhash = await method.writeContractAsync({
      ...contracts.staking,
      functionName: 'delegate',
      args: [params.toValidatorID],
      gas: BigInt(GAS_LIMIT_HARD),
      value: delAmountDec.toBigInt(),
    });
    return waitForTransaction(txhash);
  };
  return { ...method, degegate };
}
