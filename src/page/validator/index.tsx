import { useTranslation } from "react-i18next"
import { Box, ValidatorList } from "../../components"
import { useFetchAllValidator, useFetchStakingStats } from "../../hooks"
import { useMemo } from "react"
import { bigFormatEther, shortenDisplayNumber } from "../../utils"
import ArrowIcon from "../../images/icons/arrow-left.png"

export const Validator = () => {

  const { t } = useTranslation()
  const { stakingStats } = useFetchStakingStats()
  const { validators } = useFetchAllValidator()

  const {
    totalValidator,
    totalStaked
  } = useMemo(() => stakingStats, [stakingStats])


  return (
    <div>
      <div className="text-[26px] text-left mb-6">{`${t('Validator')}`}</div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <Box className="flex flex-wrap items-center justify-between gap-4 px-12 py-10">
            <div>
              <div className="text-gray text-base">{t('Validatiors')}</div>
              <div className="text-2xl text-green font-bold">{totalValidator}</div>
            </div>
            <div>
              <div className="text-gray text-base">{t('Total U2U  Staked')}</div>
              <div className="text-2xl text-green font-bold">{shortenDisplayNumber(bigFormatEther(totalStaked))}</div>
            </div>
            <div>
              <div className="text-gray text-base">{t('Stake Ratio')}</div>
              <div className="text-2xl text-green font-bold">NaN</div>
            </div>
            <div>
              <div className="text-gray text-base">{t('Avg.APR')}</div>
              <div className="text-2xl text-green font-bold">NaN</div>
            </div>
          </Box>
        </div>
        <Box>
        <div className="w-full pl-6 bg-[url('/src/images/world-map.png')] bg-no-repeat bg-center bg-auto h-full w-full" >
          <div className="text-left">
            <div className="text-base text-black-3">{t('Countries')}</div>
            <div className="text-lg font-medium text-black">1</div>
          </div>
          <div className="text-left">
            <div className="text-base text-black-3">{t('Nodes')}</div>
            <div className="text-lg font-medium text-black">3</div>
          </div>
        </div>
        </Box>
      </div>
      <div className="flex justify-between items-center mb-6 mt-10">
        <div className="text-[26px]">{`${t('Validator List')} (${totalValidator})`}</div>
        <div className="text-base inline text-green font-medium cursor-pointer flex items-center gap-2">
          See more
          <img src={ArrowIcon} alt="u2u" />
        </div>
      </div>
      <div>
        <ValidatorList validators={validators} />
      </div>
    </div>

  )
}