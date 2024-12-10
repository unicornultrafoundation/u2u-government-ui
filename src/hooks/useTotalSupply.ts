import { useEffect } from "react";
import { useStakingContract } from "./useContract";
import { useRefresh } from "./useRefresh";
import { useStakingStore } from "../store";

export const useTotalSupply = () => {
  const stakingContract = useStakingContract()
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
  }, [stakingContract, mediumRefresh]);
}