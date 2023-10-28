import { LockedStake } from "../../types";

export interface LockedStakeStoreType {
  lockedStake: LockedStake[]
}

export interface LockedStakeStoreAction {
  updateLockedStake: (lock: LockedStake[]) => void;
}