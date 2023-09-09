import { StakingStats, Validator } from "../../types"
import { ValidatorItem } from "./ValidatorItem"

interface ValidatorListProps {
  validators: Validator[]
  stakingStats: StakingStats
}
export const ValidatorList = ({
  validators,
  stakingStats
}: ValidatorListProps) => {
  if (validators.length=== 0) return <></>
  return (
    <div className="flex gap-6 flex-wrap">
      {
        validators.map((v: Validator, index: number) => {
          return (
            <ValidatorItem validator={v} key={index} stakingStats={stakingStats}/>
          )
        })
      }
    </div>
  )
}