import { useWeb3React } from "@web3-react/core"
import { useEffect, useState } from "react"
import { useRefresh } from "./useRefresh"
import { simpleRpcProvider } from "../utils"
import { ethers } from "ethers"

export const useBalance = () => {
  const { account } = useWeb3React()
  const [balance, setBalance] = useState("")
  const {mediumRefresh} = useRefresh()
  useEffect(() => {
      (async() => {
          if (!account) return;
          const _balance = await simpleRpcProvider.getBalance(account)
          setBalance(ethers.utils.formatEther(_balance))
      })()
  }, [account, mediumRefresh]);
  return {
    balance
  }
}