import { useWeb3React } from "@web3-react/core"
import { useMemo } from "react"
import { getStakingContract } from "../utils"

export const useStakingContract = () => {
  const { provider } = useWeb3React()
  return useMemo(() => getStakingContract(provider?.getSigner()), [provider])
}