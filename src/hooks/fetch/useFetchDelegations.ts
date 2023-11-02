import { useEffect, useState } from "react"
import { Delegation } from "../../types"
import { useRefresh } from "../useRefresh"
import { QueryService } from "../../thegraph"
import { DataProcessor } from "./dataProccesser"

export const useFetchDelegations = (valId: number, skip: number = 0) => {
  const [delegations, setDelegations] = useState<Delegation[]>([])
  const { mediumRefresh } = useRefresh()
  useEffect(() => {
    if (!valId) return
    (async () => {
      const { data } = await QueryService.queryDelegationsPagination(valId, skip)
      if (data && data.delegations.length > 0) {
        setDelegations(data.delegations.map((i: any) => DataProcessor.delegation(i)))
      }
    })()
  }, [mediumRefresh, valId, skip])
  return {
    delegations
  }
}