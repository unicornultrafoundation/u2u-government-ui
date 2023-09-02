import { delegation } from "./delegation"
import { delegator } from "./delegator"
import { stakingStats } from "./stats"
import { validation } from "./validation"
import { validator } from "./validator"
export * from "./defaultValue"

export const DataProcessor = {
  stakingStats,
  validator,
  delegator,
  delegation,
  validation
}
