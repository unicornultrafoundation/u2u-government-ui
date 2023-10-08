import { Validator } from "../../types";

export interface ValidatorStoreType {
  allValidators: Validator[]
}

export interface ValidatorStoreAction {
  updateAllValidator: (vals: Validator[]) => void;
}