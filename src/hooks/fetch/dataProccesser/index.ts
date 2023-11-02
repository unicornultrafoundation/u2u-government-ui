import { delegation } from "./delegation"
import { delegator } from "./delegator"
import { epoch, epochRewards, validatorEpochRewards } from "./epoch"
import { epochOfvalidator } from "./epochOfvalidator"
import { lockedStake } from "./lockedStake"
import { stakingStats } from "./stats"
import { transaction } from "./transaction"
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
  epoch,
  transaction,
  epochRewards,
  validatorEpochRewards
}
