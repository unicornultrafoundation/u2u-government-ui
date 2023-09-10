import { useEffect, useState } from "react"
import { useRefresh } from "../useRefresh"
import { QueryService } from "../../thegraph"
import { DataProcessor } from "./dataProccesser"
import { LockedStake } from "../../types"

export const useFetchLockedStake = (delAddress: string, valId: number) => {
  const [lockedStake, setLockedStake] = useState<LockedStake>({} as LockedStake)
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if(!delAddress) return
    (async() => {
      const vaIdlHex = `0x${valId.toString(16)}`
      const {data} = await QueryService.queryLockedStake(delAddress.toLowerCase(), vaIdlHex)
      if (data && data?.lockedUps) {
        setLockedStake(DataProcessor.lockedStake(data?.lockedUps[0]));
      }
    })()
  }, [fastRefresh, delAddress])
  return {
    lockedStake
  }
}