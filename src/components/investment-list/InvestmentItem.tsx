import { useTranslation } from "react-i18next"
import { Validation } from "../../types"
import { Box } from "../box"
import { useMemo } from "react"
import { bigFormatEther, truncate } from "../../utils"
import ArrowIcon from "../../images/icons/arrow-left.png"
import { RenderNumberFormat } from "../text"
import { Button, buttonScale, buttonType } from "../button"

interface InvestmentItemProps {
  validation: Validation
}

export const InvestmentItem = ({
  validation
}: InvestmentItemProps) => {

  const { t } = useTranslation()

  const {
    validator,
    stakedAmount
  } = useMemo(() => validation, [validation])

  const {
    name,
    auth
  } = useMemo(() => validator, [validator])

  return (
    <div>
      <div className="flex gap-6 flex-wrap">
        <Box className="max-w-[400px] py-6 px-10">
          <div className="text-lg text-gray">{t('Validator')}</div>
          <div className="flex justify-between mt-4">
            <div>
              <div className="font-medium text-lg text-black">{name}</div>
              <div className="text-sm font-bold text-green">{truncate({ str: auth })}</div>
            </div>
            <div className="flex items-center cursor-pointer">
              <span className="text-green text-sm">{t('View Detail')}</span>
              <img src={ArrowIcon} alt="u2u" className="w-[20px] h-[20px]" />
            </div>
          </div>
        </Box>
        <Box className="max-w-[400px] py-6 px-10">
          <div className="text-lg text-gray">{t('Staked (U2U)')}</div>
          <div className="flex justify-between mt-4">
            <div className="text-lg text-black font-medium">
              <RenderNumberFormat amount={bigFormatEther(stakedAmount)} className="mr-2" fractionDigits={2} />
            </div>
            <div>
              <Button variant={buttonType.transparent}>{t('Undelegate')}</Button>
            </div>
          </div>
        </Box>
      </div>
      <div className="grid grid-cols-2 gap-6 mt-4 text-center">
        <Box className="py-6 px-10">
          <div className="text-gray text-xl">{t('Claimable (U2U)')}</div>
          <div className="text-black text-xl font-medium">NaN</div>
          <div className="grid grid-cols-2 mt-10 gap-4">
            <Button scale={buttonScale.lg} variant={buttonType.transparent}>{t('Claim')}</Button>
            <Button scale={buttonScale.lg}>{t('Re-Stake')}</Button>
          </div>
        </Box>
        <Box className="py-6 px-10">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-gray text-xl">{t('Unbonding (U2U)')}</div>
              <div className="text-black text-xl font-medium">NaN</div>
            </div>
            <div>
              <div className="text-gray text-xl">{t('Withdrawable (U2U)')}</div>
              <div className="text-black text-xl font-medium">NaN</div>
            </div>
          </div>
          <div className="mt-10">
            <Button scale={buttonScale.lg} variant={buttonType.transparent} className="w-full">{t('Claim')}</Button>
          </div>
        </Box>
      </div>
    </div>
  )
}