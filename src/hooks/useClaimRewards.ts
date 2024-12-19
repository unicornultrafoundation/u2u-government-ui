import {contracts, GAS_LIMIT_HARD} from "../contants";
import {ClaimRewardsParams} from "../types";
import {useWriteContract} from "wagmi";
import {useWaitForTransaction} from "./useWaitForTransaction";


export const useClaimRewards = () => {
  const method = useWriteContract();
  const { waitForTransaction } = useWaitForTransaction();

  const claimRewards = async (params: ClaimRewardsParams) => {
    const txhash = await method.writeContractAsync({
      ...contracts.staking,
      functionName: 'claimRewards',
      args: [params.toValidatorID],
      gas: BigInt(GAS_LIMIT_HARD),
    });
    return waitForTransaction(txhash);
  };
  return { ...method, claimRewards };
}