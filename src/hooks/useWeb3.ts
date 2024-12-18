import { useEffect, useMemo } from 'react'
import { useAccount, useBalance, useBlockNumber } from "wagmi";
import {ACTIVE_CHAINID} from "../contants/chain";
import {useQueryClient} from "@tanstack/react-query";


export const useWeb3 = () => {
  const queryClient = useQueryClient()
  const { data: blockNumber } = useBlockNumber({ watch: true })
  const account = useAccount();
  const { data, queryKey } = useBalance({
      address: account.address,
  });


    const correctedChain = useMemo(() => {
    return account && account.chain && account.chain.id === ACTIVE_CHAINID
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
