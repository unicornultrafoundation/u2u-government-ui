import { useTranslation } from "react-i18next"
import { StakingStats, Validator } from "../../types"
import { Box } from "../box"
import { Button, buttonType } from "../button"
import { useMemo } from "react"
import { bigFormatEther } from "../../utils"
import { RenderNumberFormat } from "../text"
import ArrowIcon from "../../images/icons/arrow-left.png"
import { useNavigate } from "react-router-dom"
import { BigNumber } from "ethers"

interface ValidatorItemProps {
  validator: Validator
  stakingStats: StakingStats
}

export const ValidatorItem = ({
  validator,
  stakingStats
}: ValidatorItemProps) => {
  const { t } = useTranslation()
  const {
    valId,
    totalStakedAmount,
    delegations
  } = useMemo(() => validator, [validator])

  const navigate = useNavigate()
  const { totalStaked } = useMemo(() => stakingStats, [stakingStats])
  const votingPower = useMemo(() => !totalStakedAmount.isZero() && !totalStaked.isZero() && totalStakedAmount.mul(BigNumber.from(1000000)).div(totalStaked), [totalStakedAmount, totalStaked])  

  return (
    <Box className="max-w-[400px]">
      <div className="grid grid-cols-2 gap-2 text-left md:p-4">
        <div className="md:mt-4 mt-2">
          <div className="text-sm font-medium text-gray">{t('Validator Name')}</div>
          <div className="text-sm font-bold text-black">{`Validator ${valId}`}</div>
        </div>
        <div className="md:mt-4 mt-2">
          <div className="text-sm font-medium text-gray">{t('Staked Amount (U2U)')}</div>
          <div className="text-sm font-bold text-black">
            <RenderNumberFormat amount={bigFormatEther(totalStakedAmount)} className="mr-2" fractionDigits={2} />
          </div>
        </div>
        <div className="md:mt-4 mt-2">
          <div className="text-sm font-medium text-gray">{t('Voting Power (%)')}</div>
          <div className="text-sm font-bold text-black">
            <RenderNumberFormat amount={Number(votingPower) / 10000} className="mr-2" fractionDigits={2} />
          </div>
        </div>
        <div className="md:mt-4 mt-2">
          <div className="text-sm font-medium text-gray">{t('Delegators')}</div>
          <div className="text-sm font-bold text-black">{delegations?.length}</div>
        </div>
        <div className="md:mt-4 mt-2">
          <Button
            onClick={() => navigate(`/validator/${valId}`)}
            variant={buttonType.secondary}
            className="rounded-lg">
            <div className="flex items-center gap-2">
              <span>View Detail</span>
              <img src={ArrowIcon} alt="u2u" />
            </div>
          </Button>
        </div>
      </div>
    </Box>
  )
}