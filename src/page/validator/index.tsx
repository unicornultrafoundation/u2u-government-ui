import { useTranslation } from "react-i18next"
import { LineChart, RenderNumberFormat, ValidatorList } from "../../components"
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
    <div className="px-8 py-6">
      <div className="text-[32px] font-semibold text-left mb-2 text-text">{`${t('Validators')}`}</div>
      <div className="w-full flex gap-4">
        <div className="w-3/12 border border-border-ountline rounded-2xl p-4 pb-0 bg-neutral-surface shadow-shadow-1">
          <div className="text-left">
            <div className="text-sm text-text">{t('Validators')}</div>
            <div className="text-primary font-semibold text-lg">{totalValidator}</div>
          </div>
          <LineChart />
        </div>
        <div className="w-3/12 border border-border-ountline rounded-2xl p-4 pb-0 bg-neutral-surface shadow-shadow-1">
          <div className="text-left">
            <div className="text-sm text-text">{t('Delegators')}</div>
            <div className="text-primary font-semibold text-lg">{totalDelegator}</div>
          </div>
          <LineChart />
        </div>
        <div className="w-3/12 border border-border-ountline rounded-2xl p-4 pb-0 bg-neutral-surface shadow-shadow-1">
          <div className="text-left">
            <div className="text-sm text-text">{t('Total U2U Staked')}</div>
            <div className="text-primary font-semibold text-lg">{shortenDisplayNumber(bigFormatEther(totalStaked))}</div>
          </div>
          <LineChart />
        </div>
        <div className="w-3/12 border border-border-ountline rounded-2xl p-4 pb-0 bg-neutral-surface shadow-shadow-1">
          <div className="text-left">
            <div className="text-sm text-text">{t('Avg.APR')}</div>
            <div className="text-primary font-semibold text-lg">
              <RenderNumberFormat amount={allValidators && allValidators[0] ? allValidators[0].apr : 0} className="mr-2" fractionDigits={2} />
            </div>
          </div>
          <LineChart />
        </div>
      </div>
      <div>
        <ValidatorList validators={allValidators} />
      </div>
    </div>

  )
}