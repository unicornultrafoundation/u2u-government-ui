import { WithdrawParams } from "../types";
import { useStakingContract } from "./useContract";
import { useCallback } from "react";
import { GAS_LIMIT_HARD } from "../contants";

export const useWidthdraw = () => {
  const stakingContract = useStakingContract()
  const withdraw = useCallback(async (params: WithdrawParams) => {
    const tx = await stakingContract.withdraw(params.toValidatorID, params.wrID, { gasLimit: GAS_LIMIT_HARD });
    const receipt = await tx.wait();
    return receipt
  }, [stakingContract])
  return {
    withdraw
  }
}