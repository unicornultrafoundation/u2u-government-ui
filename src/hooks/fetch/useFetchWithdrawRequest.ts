import { useEffect } from "react"
import { useRefresh } from "../useRefresh"
import { QueryService } from "../../thegraph"
import { DataProcessor } from "./dataProccesser"
import { useDelegatorStore } from "../../store"
import { useWeb3React } from "@web3-react/core"

export const useFetchWithdrawRequest = () => {
  const [updateWr] = useDelegatorStore(state => [
    state.updateWr
  ])
  const { fastRefresh } = useRefresh()
  const { account } = useWeb3React()
  useEffect(() => {
    if (!account) return
    (async () => {
      const { data } = await QueryService.queryWithdrawalRequest(account.toLowerCase())
      if (data && data.withdrawalRequests.length > 0) {
        updateWr(data.withdrawalRequests.map((i: any) => DataProcessor.withdrawalRequest(i)))
      } else {
        updateWr([])
      }
    })()
    // eslint-disable-next-line 
  }, [fastRefresh, account])
}