import { useEffect, useState } from "react"
import { Delegator } from "../../types"
import { useRefresh } from "../useRefresh"
import { QueryService } from "../../thegraph"
import { DataProcessor } from "./dataProccesser"

export const useFetchDelegator = (delAddress: string) => {
  const [delegator, setDelegator] = useState<Delegator>({} as Delegator)
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    if(!delAddress) return
    (async() => {
      const {data} = await QueryService.queryDelegatorDetail(delAddress.toLowerCase())
      if (data && data?.delegators) {
        setDelegator(DataProcessor.delegator(data?.delegators[0]));
      }
    })()
  }, [slowRefresh, delAddress])
  return {
    delegator
  }
}