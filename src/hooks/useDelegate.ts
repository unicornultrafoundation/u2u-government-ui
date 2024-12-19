import { DelegateParams } from "../types"
import { ethers } from "ethers"
import {contracts, GAS_LIMIT_HARD} from "../contants"
import {useWriteContract} from "wagmi";
import {useWaitForTransaction} from "./useWaitForTransaction";

export const useDelegate = () => {
  const method = useWriteContract();
  const { waitForTransaction } = useWaitForTransaction();

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
