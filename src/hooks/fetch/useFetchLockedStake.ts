import { useEffect } from "react"
import { useRefresh } from "../useRefresh"
import { QueryService } from "../../thegraph"
import { DataProcessor } from "./dataProccesser"
import { useLockedStakeStore } from "../../store"
import {useWeb3} from "../useWeb3";

export const useFetchLockedStake = () => {
  const { fastRefresh } = useRefresh()
  // const { account } = useWeb3React()
  const { address } = useWeb3();
  const [updateLockedStake] = useLockedStakeStore(state => [
    state.updateLockedStake
  ])
  useEffect(() => {
    if(!address) return
    (async() => {
      const {data} = await QueryService.queryLockedStake(address.toLowerCase())
      if (data && data?.lockedUps) {
        updateLockedStake(data.lockedUps.map((item: any) => DataProcessor.lockedStake(item)));
      } else {
        updateLockedStake([])
      }
    })()
    // eslint-disable-next-line
  }, [fastRefresh, address])
}