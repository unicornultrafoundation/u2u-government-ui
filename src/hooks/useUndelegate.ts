import {UnDelegateParams} from "../types";
import { ethers } from "ethers";
import {contracts, GAS_LIMIT_HARD} from "../contants";
import {useWriteContract} from "wagmi";
import {useWaitForTransaction} from "./useWaitForTransaction";


export const useUndelegate = () => {
  const method = useWriteContract();
  const { waitForTransaction } = useWaitForTransaction();

  const undegegate = async (params: UnDelegateParams) => {
    const delAmountDec = ethers.utils.parseEther(params.amount);
    const _wrID = Math.floor(Math.random() * 100000)
    const txhash = await method.writeContractAsync({
      ...contracts.staking,
      functionName: 'undelegate',
      args: [params.toValidatorID, _wrID, delAmountDec.toString()],
      gas: BigInt(GAS_LIMIT_HARD),
    });
    return waitForTransaction(txhash);
  };
  return { ...method, undegegate };
}