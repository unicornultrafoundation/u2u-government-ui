import { create } from "zustand"
import { ValidatorStoreAction, ValidatorStoreType } from "./type"
import { devtools, persist } from "zustand/middleware";
import { Validator } from "../../types";

const defaultState: ValidatorStoreType = {
  allValidators: []
}

export const useValidatorStore = create<ValidatorStoreType & ValidatorStoreAction>()(
  devtools(
    persist((set) => ({
      ...defaultState,
      updateAllValidator: (vals: Validator[]) => set((state) => ({
        ...state,
        allValidators: vals
      }))
    }), {
      name: 'validators-storage'
    }
    )
  )
)