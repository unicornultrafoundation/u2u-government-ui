import { useEffect, useState } from "react"
import { StakingTransaction } from "../../types"
import { useRefresh } from "../useRefresh"
import { QueryService } from "../../thegraph"
import { DataProcessor } from "./dataProccesser"

export const useFetchStakingTxs = (from: string, skip: number = 0) => {
  const [txs, setTxs] = useState<StakingTransaction[]>([])
  const [total, setTotal] = useState(0)
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (!from) return
    (async () => {
      try {
        const { data } = await QueryService.queryStakingTxs(from.toLowerCase(), skip)  
        if (data && data.transations.length > 0) {
          setTxs(data.transations.map((i: any) => DataProcessor.transaction(i)))
          setTotal(Number(data.transactionCounts[0].count))
        }
      } catch (error) {}
    })()
  }, [fastRefresh, from, skip])
  return {
    txs,
    total
  }
}