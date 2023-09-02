import { useTranslation } from "react-i18next"
import { Validator } from "../../types"
import { Box } from "../box"
import { Button, buttonType } from "../button"
import { useMemo } from "react"
import { bigFormatEther } from "../../utils"
import { RenderNumberFormat } from "../text"
import ArrowIcon from "../../images/icons/arrow-left.png"
import { useNavigate } from "react-router-dom"

interface ValidatorItemProps {
  validator: Validator
}

export const ValidatorItem = ({
  validator
}: ValidatorItemProps) => {
  const { t } = useTranslation()
  const {
    valId,
    totalStakedAmount,
    votingPower,
    delegations
  } = useMemo(() => validator, [validator])

  const navigate = useNavigate()

  return (
    <Box className="max-w-[400px]">
      <div className="grid grid-cols-2 gap-2 text-left p-4">
        <div className="mt-4">
          <div className="text-sm font-medium text-gray">{t('Validator Name')}</div>
          <div className="text-sm font-bold text-black">{`Validator ${valId}`}</div>
        </div>
        <div className="mt-4">
          <div className="text-sm font-medium text-gray">{t('Staked Amount (U2U)')}</div>
          <div className="text-sm font-bold text-black">
            <RenderNumberFormat amount={bigFormatEther(totalStakedAmount)} className="mr-2" fractionDigits={2} />
          </div>
        </div>
        <div className="mt-4">
          <div className="text-sm font-medium text-gray">{t('Voting Power (%)')}</div>
          <div className="text-sm font-bold text-black">
            <RenderNumberFormat amount={(votingPower)} className="mr-2" fractionDigits={2} />
          </div>
        </div>
        <div className="mt-4">
          <div className="text-sm font-medium text-gray">{t('Delegators')}</div>
          <div className="text-sm font-bold text-black">{delegations?.length}</div>
        </div>
        <div className="mt-4">
          <Button 
          onClick={() => navigate(`/validator/${valId}`)}
          variant={buttonType.secondary} 
          className="rounded-lg flex items-center gap-2">
            <span>View Detail</span>
            <img src={ArrowIcon} alt="u2u" />
          </Button>
        </div>
      </div>
    </Box>
  )
}