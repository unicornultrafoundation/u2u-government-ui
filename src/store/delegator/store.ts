import { create } from "zustand"
import { DelegatorStoreAction, DelegatorStoreType } from "./type"
import { devtools, persist } from "zustand/middleware";
import { Delegator, WithdrawalRequest } from "../../types";

const defaultState: DelegatorStoreType = {
  delegator: undefined,
  withdrawalRequests: []
}

export const useDelegatorStore = create<DelegatorStoreType & DelegatorStoreAction>()(
  devtools(
    persist((set) => ({
      ...defaultState,
      updateDelegator: (del: Delegator | undefined) => set((state) => ({
        ...state,
        delegator: del
      })),
      updateWr: (wr: WithdrawalRequest[]) => set((state) => ({
        ...state,
        withdrawalRequests: wr
      }))
    }),
      {
        name: 'delegator-storage'
      }
    )
  )
)