import {UnlockStakeParams} from "../types";
import { ethers } from "ethers";
import {contracts, GAS_LIMIT_HARD} from "../contants";
import {useWriteContract} from "wagmi";
import {useWaitForTransaction} from "./useWaitForTransaction";


export const useUnlockStake = () => {
  const method = useWriteContract();
  const { waitForTransaction } = useWaitForTransaction();

  const unlockStake = async (params: UnlockStakeParams) => {
    const delAmountDec = ethers.utils.parseEther(params.amount);
    const txhash = await method.writeContractAsync({
      ...contracts.staking,
      functionName: 'unlockStake',
      args: [params.toValidatorID, delAmountDec.toString()],
      gas: BigInt(GAS_LIMIT_HARD),
    });
    return waitForTransaction(txhash);
  };
  return { ...method, unlockStake };
}