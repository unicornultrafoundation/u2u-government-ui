import { useEffect } from "react"
import { useRefresh } from "../useRefresh"
import { QueryService } from "../../thegraph"
import { DataProcessor } from "./dataProccesser"
import { useLockedStakeStore } from "../../store"
import { useWeb3React } from "@web3-react/core"

export const useFetchLockedStake = () => {
  const { fastRefresh } = useRefresh()
  const { account } = useWeb3React()
  const [updateLockedStake] = useLockedStakeStore(state => [
    state.updateLockedStake
  ])

  useEffect(() => {
    if(!account) return
    (async() => {
      const {data} = await QueryService.queryLockedStake(account.toLowerCase())
      if (data && data?.lockedUps) {
        updateLockedStake(data.lockedUps.map((item: any) => DataProcessor.lockedStake(item)));
      }
    })()
    // eslint-disable-next-line
  }, [fastRefresh, account])
}