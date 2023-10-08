import { create } from "zustand"
import { devtools, persist } from "zustand/middleware";
import { EpochInfo } from "../../types";
import { EpochStoreAction, EpochStoreType } from "./type";

const defaultState: EpochStoreType = {
  lastEpoch: {} as EpochInfo
}

export const useEpochStore = create<EpochStoreType & EpochStoreAction>()(
  devtools(
    persist((set) => ({
      ...defaultState,
      updateLastEpoch: (e: EpochInfo) => set((state) => ({
        ...state,
        lastEpoch: e
      }))
    }), {
      name: 'epoch-storage'
    }
    )
  )
)