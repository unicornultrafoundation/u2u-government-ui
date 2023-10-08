import { useTranslation } from "react-i18next"
import { Box, RenderNumberFormat, ValidatorList } from "../../components"
import { useMemo } from "react"
import { bigFormatEther, shortenDisplayNumber } from "../../utils"
import { useStakingStore, useValidatorStore } from "../../store"

export const Validator = () => {

  const { t } = useTranslation()

  const [stakingStats] = useStakingStore(state => [
    state.stakingStats
  ])

  const [allValidators] = useValidatorStore(state => [
    state.allValidators
  ])

  const {
    totalValidator,
    totalStaked,
    totalDelegator
  } = useMemo(() => stakingStats, [stakingStats])

  return (
    <div>
      <div className="text-[26px] text-left mb-6">{`${t('Validator')}`}</div>
      <div className="md:grid grid-cols-3 grid-flow-row gap-4">
        <div className="col-span-2 mb-6 md:mb-0">
          <Box className="flex flex-wrap items-center md:justify-between md:gap-4 gap-y-4 md:px-12 py-10 md:text-center text-left md:min-h-[140px]">
            <div className="w-6/12 md:w-fit">
              <div className="text-gray text-base mb-2">{t('Validatiors')}</div>
              <div className="text-2xl md:text-green font-medium md:font-bold">{totalValidator}</div>
            </div>
            <div className="w-6/12 md:w-fit">
              <div className="text-gray text-base mb-2">{t('Delegators')}</div>
              <div className="text-2xl md:text-green font-medium md:font-bold">{totalDelegator}</div>
            </div>
            <div className="w-6/12 md:w-fit">
              <div className="text-gray text-base mb-2">{t('Total U2U  Staked')}</div>
              <div className="text-2xl md:text-green font-medium md:font-bold">{shortenDisplayNumber(bigFormatEther(totalStaked))}</div>
            </div>
            {/* <div className="w-6/12 md:w-fit">
              <div className="text-gray text-base mb-2">{t('Stake Ratio')}</div>
              <div className="text-2xl md:text-green font-medium md:font-bold">NaN</div>
            </div> */}
            <div className="w-6/12 md:w-fit">
              <div className="text-gray text-base mb-2">{t('Avg.APR')}</div>
              <div className="text-2xl md:text-green font-medium md:font-bold">
              <RenderNumberFormat amount={allValidators && allValidators[0] ? allValidators[0].apr : 0} className="mr-2" fractionDigits={2} />
              </div>
            </div>
          </Box>
        </div>
        <Box className="col-span-1">
          <div className="w-full pl-6 bg-[url('/src/images/world-map.png')] bg-no-repeat bg-center bg-auto h-full w-full" >
            <div className="text-left">
              <div className="text-base text-black-3">{t('Countries')}</div>
              <div className="text-lg font-medium text-black">1</div>
            </div>
            <div className="text-left">
              <div className="text-base text-black-3">{t('Nodes')}</div>
              <div className="text-lg font-medium text-black">{totalValidator}</div>
            </div>
          </div>
        </Box>
      </div>
      <div className="flex justify-between items-center mb-6 mt-10">
        <div className="text-[26px]">{`${t('Validator List')} (${totalValidator})`}</div>
        {/* <div className="text-base inline text-green font-medium cursor-pointer flex items-center gap-2">
          See more
          <img src={ArrowIcon} alt="u2u" />
        </div> */}
      </div>
      <div>
        <ValidatorList validators={allValidators} />
      </div>
    </div>

  )
}