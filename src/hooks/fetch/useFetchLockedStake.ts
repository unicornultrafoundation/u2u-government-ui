import { useEffect, useState } from "react"
import { useRefresh } from "../useRefresh"
import { QueryService } from "../../thegraph"
import { DataProcessor } from "./dataProccesser"
import { LockedStake } from "../../types"

export const useFetchLockedStake = (delAddress: string) => {
  const [lockedStake, setLockedStake] = useState<LockedStake>({} as LockedStake)
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if(!delAddress) return
    (async() => {
      const {data} = await QueryService.queryLockedStake(delAddress.toLowerCase())
      if (data && data?.lockedUps) {
        setLockedStake(DataProcessor.lockedStake(data?.lockedUps[0]));
      }
    })()
  }, [fastRefresh, delAddress])
  return {
    lockedStake
  }
}