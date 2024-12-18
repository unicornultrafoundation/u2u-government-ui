import { Address } from 'viem';
import { waitForTransactionReceipt } from '@wagmi/core';
import { useState } from 'react';
import {wagmiConfig} from "../contants/wagmi";


export const useWaitForTransaction = () => {
  const [isLoading, setIsLoading] = useState(false);

  const waitForTransaction = async (txHash: Address) => {
    try {
      setIsLoading(true);
      await waitForTransactionReceipt(wagmiConfig, {
        hash: txHash,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { waitForTransaction, isLoading };
};

// export const useWaitForTransaction = () => (hash: `0x${string}`) =>
//   waitForTransactionReceipt(config, { hash });
