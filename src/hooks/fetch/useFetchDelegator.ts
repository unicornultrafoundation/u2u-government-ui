import { useEffect, useState } from "react"
import { Delegator } from "../../types"
import { useRefresh } from "../useRefresh"
import { QueryService } from "../../thegraph"
import { DataProcessor } from "./dataProccesser"
import { BigNumber } from "ethers"

export const useFetchDelegator = (delAddress: string) => {
  const [delegator, setDelegator] = useState<Delegator>({} as Delegator)
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if(!delAddress) return
    (async() => {
      const {data} = await QueryService.queryDelegatorDetail(delAddress.toLowerCase())
      const {data: stakingStats} = await QueryService.queryStakingStats()
      const totalNetworkStaked = stakingStats && stakingStats.stakings ? BigNumber.from(stakingStats.stakings[0].totalStaked || 0) : BigNumber.from(0)
      if (data && data?.delegators) {
        setDelegator(DataProcessor.delegator(data?.delegators[0], totalNetworkStaked));
      }
    })()
  }, [fastRefresh, delAddress])
  return {
    delegator
  }
}