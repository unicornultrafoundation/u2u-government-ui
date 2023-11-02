import { create } from "zustand"
import { devtools, persist } from "zustand/middleware";
import { LockedStake } from "../../types";
import { LockedStakeStoreAction, LockedStakeStoreType } from "./type";

const defaultState: LockedStakeStoreType = {
  lockedStake: [],
  valAuthLockStake: []
}

export const useLockedStakeStore = create<LockedStakeStoreType & LockedStakeStoreAction>()(
  devtools(
    persist((set) => ({
      ...defaultState,
      updateLockedStake: (lock: LockedStake[]) => set((state) => ({
        ...state,
        lockedStake: lock
      })),
      updateValAuthLockStake: (lock: LockedStake[]) => set((state) => ({
        ...state,
        valAuthLockStake: lock
      }))
    }), {
      name: 'locked-stake-storage'
    }
    )
  )
)