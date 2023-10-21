import { useTranslation } from "react-i18next"
import { LineChart, RenderNumberFormat, ValidatorList } from "../../components"
import { useMemo } from "react"
import { bigFormatEther, shortenDisplayNumber } from "../../utils"
import { useStakingStore, useValidatorStore } from "../../store"
import { Images } from "../../images"

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
    <div className="px-8 py-6">
      <div className="text-[32px] font-semibold text-left mb-2 text-text">{`${t('Validators')}`}</div>
      <div className="w-full grid grid-cols-12 gap-4">
        <div className="col-span-2 border border-border-ountline rounded-2xl p-4 pl-6 bg-neutral-surface shadow-2">
          <div className="text-left">
            <div className="text-sm text-text">{t('Avg.APR')}</div>
            <div className="text-primary font-semibold text-lg">
              <RenderNumberFormat amount={allValidators && allValidators[0] ? allValidators[0].apr : 0} className="mr-2" fractionDigits={2} />
            </div>
          </div>
          <div className="flex justify-end">
            <img src={Images.Staking4PNG} alt="u2u" className="w-[80px] height-[105px]" />
          </div>
        </div>
        <div className="col-span-2 border border-border-ountline rounded-2xl p-4 pl-6 bg-neutral-surface shadow-2">
          <div className="text-left">
            <div className="text-sm text-text">{t('Validators')}</div>
            <div className="text-primary font-semibold text-lg">
              {totalValidator}
            </div>
          </div>
          <div className="flex justify-end">
            <img src={Images.Staking4PNG} alt="u2u" className="w-[80px] height-[105px]" />
          </div>
        </div>
        <div className="col-span-2 border border-border-ountline rounded-2xl p-4 pl-6 bg-neutral-surface shadow-2">
          <div className="text-left">
            <div className="text-sm text-text">{t('Delegators')}</div>
            <div className="text-primary font-semibold text-lg">
              {totalDelegator}
            </div>
          </div>
          <div className="flex justify-end">
            <img src={Images.Staking4PNG} alt="u2u" className="w-[80px] height-[105px]" />
          </div>
        </div>
        <div className="col-span-3 border border-border-ountline rounded-2xl p-4 pb-0 bg-neutral-surface shadow-2">
          <div className="text-left">
            <div className="text-sm text-text">{t('Total U2U Staked')}</div>
            <div className="text-primary font-semibold text-lg">{shortenDisplayNumber(bigFormatEther(totalStaked))}</div>
          </div>
          <LineChart />
        </div>
        <div className="col-span-3 border border-border-ountline rounded-2xl p-4 pb-0 bg-neutral-surface shadow-2">
          <div className="text-left">
            <div className="text-sm text-text">{t('Avg.APR')}</div>
            <div className="text-primary font-semibold text-lg">
              <RenderNumberFormat amount={allValidators && allValidators[0] ? allValidators[0].apr : 0} className="mr-2" fractionDigits={2} />
            </div>
          </div>
          <LineChart />
        </div>
      </div>
      <div className="mt-10">
        <ValidatorList validators={allValidators} />
      </div>
    </div>

  )
}