import {RestakeRewardsParams} from "../types";
import {contracts} from "../contants";
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

    });
    return waitForTransaction(txhash);
  };
  return { ...method, restake };
}