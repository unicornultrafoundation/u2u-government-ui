import { useEffect } from "react"
import { useRefresh } from "../useRefresh"
import { QueryService } from "../../thegraph"
import { DataProcessor } from "./dataProccesser"
import { BigNumber } from "ethers"
import { useDelegatorStore } from "../../store"
import { useWeb3React } from "@web3-react/core"

export const useFetchDelegator = () => {
  const { fastRefresh } = useRefresh()
  const { account } = useWeb3React()
  const [updateDelegator] = useDelegatorStore(state => [
    state.updateDelegator
  ])
  useEffect(() => {
    if(!account) return
    (async() => {
      const {data} = await QueryService.queryDelegatorDetail(account.toLowerCase())      
      const totalNetworkStaked = data && data.stakings ? BigNumber.from(data.stakings[0].totalStaked || 0) : BigNumber.from(0)
      if (data && data?.delegators) {
        updateDelegator(await DataProcessor.delegator(data?.delegators[0], totalNetworkStaked));
      }
    })()
    // eslint-disable-next-line 
  }, [fastRefresh, account])
}