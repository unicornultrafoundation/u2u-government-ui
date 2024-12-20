import { useEffect, useState } from "react"
import { useRefresh } from "./useRefresh"
import { QueryService } from "../thegraph"
import { ethers } from "ethers"

export const useValidatorApr = (validatorId: number, amount: string = "1000") => {
  const [apr, setApr] = useState<number>(0)
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (validatorId && Number(amount) > 0) {
      (async () => {
        const amountDec = ethers.utils.parseEther(amount).toString();
        const { data } = await QueryService.queryValidatorApr(validatorId, amountDec)
        if (data && data.apr0) {
          setApr(Number(data.apr0) / 100)
        }
      })()
    } else {
      setApr(0)
    }
  }, [fastRefresh, validatorId, amount])
  return {
    apr
  }
}