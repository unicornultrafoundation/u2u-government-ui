import {RestakeRewardsParams} from "../types";
import {contracts, GAS_LIMIT_HARD} from "../contants";
import {useWriteContract} from "wagmi";
import {useWaitForTransaction} from "./useWaitForTransaction";

export const useRestakeRewards = () => {
  const method = useWriteContract();
  const { waitForTransaction } = useWaitForTransaction();

  const restake = async (params: RestakeRewardsParams) => {
    const txhash = await method.writeContractAsync({
      ...contracts.staking,
      functionName: 'restakeRewards',
      args: [params.toValidatorID],
      gas: BigInt(GAS_LIMIT_HARD),
    });
    return waitForTransaction(txhash);
  };
  return { ...method, restake };
}