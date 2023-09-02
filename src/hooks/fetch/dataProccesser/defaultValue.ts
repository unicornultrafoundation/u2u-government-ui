import { StakingStats } from "../../../types";
import { Zero_Bi } from "../../../utils";

export const defaultStakingStats: StakingStats = {
  totalSelfStaked: Zero_Bi,
  totalDelegated: Zero_Bi,
  totalStaked: Zero_Bi,
  totalValidator: 0,
  totalDelegator: 0
}