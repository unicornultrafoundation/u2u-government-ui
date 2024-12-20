import {WithdrawParams} from "../types";
import {contracts, GAS_LIMIT_HARD} from "../contants";
import {useWriteContract} from "wagmi";
import {useWaitForTransaction} from "./useWaitForTransaction";


export const useWidthdraw = () => {
  const method = useWriteContract();
  const { waitForTransaction } = useWaitForTransaction();

  const withdraw = async (params: WithdrawParams) => {
    const txhash = await method.writeContractAsync({
      ...contracts.staking,
      functionName: 'withdraw',
      args: [params.toValidatorID, params.wrID],
      gas: BigInt(GAS_LIMIT_HARD),
    });
    return waitForTransaction(txhash);
  };
  return { ...method, withdraw };
}