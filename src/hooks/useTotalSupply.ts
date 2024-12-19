import { useEffect } from "react";
import { useRefresh } from "./useRefresh";
import { useStakingStore } from "../store";

export const useTotalSupply = () => {
  const { mediumRefresh } = useRefresh()
  const [updateTotalSupply] = useStakingStore(state => [
    state.updateTotalSupply
  ])
  useEffect(() => {
    (async () => {
      try {
        const rs = await fetch('https://report.u2u.xyz/api/circulating')
        const {supply} = await rs.json()
        updateTotalSupply(supply)
      } catch (error) { }
    })()
    // eslint-disable-next-line
  }, [mediumRefresh]);
}