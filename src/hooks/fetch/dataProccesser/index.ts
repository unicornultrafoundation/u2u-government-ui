import { delegation } from "./delegation"
import { delegator } from "./delegator"
import { epoch } from "./epoch"
import { epochOfvalidator } from "./epochOfvalidator"
import { lockedStake } from "./lockedStake"
import { stakingStats } from "./stats"
import { validation } from "./validation"
import { validator } from "./validator"
import { withdrawalRequest } from "./withdrawalRequest"
export * from "./defaultValue"

export const DataProcessor = {
  stakingStats,
  validator,
  delegator,
  delegation,
  validation,
  withdrawalRequest,
  lockedStake,
  epochOfvalidator,
  epoch
}
