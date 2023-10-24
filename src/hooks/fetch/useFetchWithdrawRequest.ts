import { useEffect, useState } from "react"
import { WithdrawalRequest } from "../../types"
import { useRefresh } from "../useRefresh"
import { QueryService } from "../../thegraph"
import { DataProcessor } from "./dataProccesser"

export const useFetchWithdrawRequest = (delegatorAddr: string) => {
  const [wr, setWr] = useState<WithdrawalRequest[]>([])
  const { mediumRefresh } = useRefresh()
  useEffect(() => {
    if (!delegatorAddr) return
    (async () => {
      const { data } = await QueryService.queryWithdrawalRequest(delegatorAddr)
      if (data && data.withdrawalRequests.length > 0) {
        setWr(data.withdrawalRequests.map((i: any) => DataProcessor.withdrawalRequest(i)))
      }
    })()
  }, [mediumRefresh, delegatorAddr])
  return {
    wr
  }
}