import { useEffect } from "react";
import { useStakingContract } from "./useContract";
import { useRefresh } from "./useRefresh";
import { BigNumber, ethers } from "ethers";
import { simpleRpcProvider } from "../utils";
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
        const _supply = await stakingContract.totalSupply()
        const _sys1 = await simpleRpcProvider.getBalance("0xDa86486EA632c5A3b43c166c8799ca1Ca942Fe30")
        const _sys2 = await simpleRpcProvider.getBalance("0x131Bf53E6eCd05d46D418E970488Fc3DeA295D34")
        const _calSupply = BigNumber.from(_supply).sub(_sys1).sub(_sys2)
        updateTotalSupply(ethers.utils.formatEther(_calSupply))
      } catch (error) { }
    })()
    // eslint-disable-next-line
  }, [stakingContract, mediumRefresh]);
}