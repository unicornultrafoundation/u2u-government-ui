
import { ethers } from "ethers";
import {contracts, GAS_LIMIT_HARD} from "../contants";
import { simulateContract } from '@wagmi/core'
import {wagmiConfig} from "../contants/wagmi";

export const useCalcPenalty = () => {
  const calcPen = async (validator: number, unLockAmount: string) => {
    try {
      const delAmountDec = ethers.utils.parseEther(unLockAmount);
      console.log(delAmountDec.toString())
      const result = await simulateContract(wagmiConfig,{
        ...contracts.staking,
        functionName: 'unlockStake',
        args: [validator, delAmountDec.toString()],
        gas: BigInt(GAS_LIMIT_HARD),
      });
      return result?.result;
    } catch (error) {
      return "0"
    }
  };
  return { calcPen };
}