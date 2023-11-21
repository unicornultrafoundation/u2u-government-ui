import { create } from "zustand"
import { devtools, persist } from "zustand/middleware";
import { StakingStats } from "../../types";
import { StakingStoreAction, StakingStoreType } from "./type";
import { defaultStakingStats } from "../../hooks/fetch/dataProccesser";

const defaultState: StakingStoreType = {
  stakingStats: defaultStakingStats,
  totalSupply: 0
}

export const useStakingStore = create<StakingStoreType & StakingStoreAction>()(
  devtools(
    persist((set) => ({
      ...defaultState,
      updateStakingStats: (s: StakingStats) => set((state) => ({
        ...state,
        stakingStats: s
      })),
      updateTotalSupply: (b: number | string) => set((state) => ({
        ...state,
        totalSupply: b
      }))
    }), {
      name: 'staking-storage'
    }
    )
  )
)