import { create } from "zustand"
import { devtools, persist } from "zustand/middleware";
import { AppStoreAction, AppStoreType } from "./type";

const defaultState: AppStoreType = {
  lng: "en"
}

export const useAppStore = create<AppStoreType & AppStoreAction>()(
  devtools(
    persist((set) => ({
      ...defaultState,
      changeLng: (e: string) => set((state) => ({
        ...state,
        lng: e
      }))
    }),
      {
        name: 'app-storage'
      }
    )
  )
)