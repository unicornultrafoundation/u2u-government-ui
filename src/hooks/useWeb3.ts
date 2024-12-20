import { useEffect, useMemo } from 'react'
import { useAccount, useBalance, useBlockNumber } from "wagmi";
import {useQueryClient} from "@tanstack/react-query";
import { U2U_CHAINID } from '../contants';


export const useWeb3 = () => {
  const queryClient = useQueryClient()
  const { data: blockNumber } = useBlockNumber({ watch: true })
  const account = useAccount();
  const { data, queryKey } = useBalance({
      address: account.address,
  });


    const correctedChain = useMemo(() => {
    return account && account.chain && account.chain.id === Number(U2U_CHAINID)
  }, [account]);

    const balance = useMemo(() => {
        return data?.formatted
    }, [data]);

    const balanceWallet = useMemo(() => {
        return (
            data?.formatted
        );
    }, [data]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey })
  }, [blockNumber, queryClient])


  return {...account, correctedChain,balance, balanceWallet}
}
