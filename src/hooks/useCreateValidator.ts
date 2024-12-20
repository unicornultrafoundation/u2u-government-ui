
import {CreateValidatorParams} from "../types";
import { ethers } from "ethers";
import {contracts, GAS_LIMIT_HARD} from "../contants";
import {useWriteContract} from "wagmi";
import {useWaitForTransaction} from "./useWaitForTransaction";



export const useCreateValidator = () => {
  const method = useWriteContract();
  const { waitForTransaction } = useWaitForTransaction();

  const create = async (params: CreateValidatorParams) => {
    const delAmountDec = ethers.utils.parseEther(params.amount.toString());
    const pubkeyBytes: Uint8Array = ethers.utils.arrayify(params.pubkey);
    const txhash = await method.writeContractAsync({
      ...contracts.staking,
      functionName: 'createValidator',
      args: [pubkeyBytes as any],
      gas: BigInt(GAS_LIMIT_HARD),
      value: delAmountDec.toBigInt(),
    });
    return waitForTransaction(txhash);
  };
  return { ...method, create };
}