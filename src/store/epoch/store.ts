import { create } from "zustand"
import { devtools, persist } from "zustand/middleware";
import { EpochInfo, EpochReward } from "../../types";
import { EpochStoreAction, EpochStoreType } from "./type";

const defaultState: EpochStoreType = {
  lastEpoch: {} as EpochInfo,
  epochRewards: []
}

export const useEpochStore = create<EpochStoreType & EpochStoreAction>()(
  devtools(
    persist((set) => ({
      ...defaultState,
      updateLastEpoch: (e: EpochInfo) => set((state) => ({
        ...state,
        lastEpoch: e
      })),
      updateEpochRewards: (e: EpochReward[]) => set((state) => ({
        ...state,
        epochRewards: e
      }))
    }), {
      name: 'epoch-storage'
    }
    )
  )
)