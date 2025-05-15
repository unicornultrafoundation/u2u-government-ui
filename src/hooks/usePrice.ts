import { useEffect } from "react";
// import { useStakingContract } from "./useContract";
import { useRefresh } from "./useRefresh";
import { useStakingStore } from "../store";

export const usePriceU2U = () => {
  // const stakingContract = useStakingContract()
  const { mediumRefresh } = useRefresh()
  const [updatePriceU2u] = useStakingStore(state => [
    state.updatePriceU2u
  ])
  useEffect(() => {
    (async () => {
      try {
        const rs = await fetch('https://report.u2u.xyz/api/u2u_price')
        const {supply} = await rs.json()
        updatePriceU2u(supply)
      } catch (error) { }
    })()
    // eslint-disable-next-line
  }, [mediumRefresh]);
}