import { LockedStake } from "../../types";

export interface LockedStakeStoreType {
  lockedStake: LockedStake[]
  valAuthLockStake: LockedStake[]
}

export interface LockedStakeStoreAction {
  updateLockedStake: (lock: LockedStake[]) => void;
  updateValAuthLockStake: (lock: LockedStake[]) => void;
}