import { useWeb3React } from "@web3-react/core"
import { useEffect, useState } from "react"
import { useRefresh } from "./useRefresh"
import { simpleRpcProvider } from "../utils"
import { ethers } from "ethers"
import {useWeb3} from "./useWeb3";

export const useBalance = () => {
  // const { account } = useWeb3React()
    const { address } = useWeb3();
  const [balance, setBalance] = useState("")
  const {mediumRefresh} = useRefresh()
  useEffect(() => {
      (async() => {
          if (!address) return;
          const _balance = await simpleRpcProvider.getBalance(address)
          setBalance(ethers.utils.formatEther(_balance))
      })()
  }, [address, mediumRefresh]);
  return {
    balance
  }
}