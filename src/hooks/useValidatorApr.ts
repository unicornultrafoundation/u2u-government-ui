import { useEffect, useState } from "react"
import { useRefresh } from "./useRefresh"
import { QueryService } from "../thegraph"

export const useValidatorApr = (validatorId: number) => {
  const [apr, setApr] = useState<number>(0)
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (validatorId) {
      (async () => {
        const { data } = await QueryService.queryValidatorApr(validatorId)
        if (data && data.apr0) {
          setApr(Number(data.apr0) / 100)
        }
      })()
    }
  }, [fastRefresh, validatorId])
  return {
    apr
  }
}