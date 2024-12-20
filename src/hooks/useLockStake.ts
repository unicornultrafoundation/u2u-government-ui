import {LockStakeParams} from "../types";
import { ethers } from "ethers";
import {contracts, GAS_LIMIT_HARD} from "../contants";
import {useWriteContract} from "wagmi";
import {useWaitForTransaction} from "./useWaitForTransaction";


export const useLockStake = () => {
  const method = useWriteContract();
  const { waitForTransaction } = useWaitForTransaction();

  const lockStake = async (params: LockStakeParams) => {
    const amountDec = ethers.utils.parseEther(params.amount);
    const txhash = await method.writeContractAsync({
      ...contracts.staking,
      functionName: 'lockStake',
      args: [params.toValidatorID, params.lockupDuration, amountDec.toString()],
      gas: BigInt(GAS_LIMIT_HARD),
    });
    return waitForTransaction(txhash);
  };
  return { ...method, lockStake };
}