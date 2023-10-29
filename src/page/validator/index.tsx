import { useTranslation } from "react-i18next"
import { LineChart, RenderNumberFormat, ValidatorList } from "../../components"
import { useMemo } from "react"
import { bigFormatEther, classNames, shortenDisplayNumber } from "../../utils"
import { useEpochStore, useStakingStore, useValidatorStore } from "../../store"
import { Images } from "../../images"
import { isMobile } from 'mobile-device-detect';
import { EpochReward } from "../../types"

export const Validator = () => {

  const { t } = useTranslation()
  const [stakingStats] = useStakingStore(state => [
    state.stakingStats
  ])
  const [allValidators] = useValidatorStore(state => [
    state.allValidators
  ])

  const [epochRewards] = useEpochStore(state => [
    state.epochRewards
  ])

  const validatorRewards = useMemo(() => {
    if (epochRewards && epochRewards.length > 0) {
      let lastRewards = epochRewards[0]
      return lastRewards.totalRewards
    }
    return 0
  }, [epochRewards])

  const validatorRewardsChart = useMemo(() => {
    if (epochRewards && epochRewards.length > 0) {
      return epochRewards.map((i: EpochReward) => {
        return Number(bigFormatEther(i.totalRewards))
      }).reverse()
    }
    return [0, 10, 15, 20, 10, 15, 20, 15, 10]
  }, [epochRewards])

  const validatorStakeChart = useMemo(() => {
    if (epochRewards && epochRewards.length > 0) {
      return epochRewards.map((i: EpochReward) => {
        return Number(bigFormatEther(i.totalStake))
      }).reverse()
    }
    return [0, 10, 15, 20, 10, 15, 20, 15, 10]
  }, [epochRewards])
    
  const {
    totalValidator,
    totalStaked,
    totalDelegator
  } = useMemo(() => stakingStats, [stakingStats])
  return (
    <div className="px-8 py-6">
      <div className="text-[32px] font-semibold text-left mb-2 text-text">{`${t('Validators')}`}</div>
      <div className="w-full grid grid-cols-12 gap-4">
        <div className={classNames("border border-border-ountline rounded-2xl p-4 pl-6 bg-neutral-surface shadow-2", isMobile ? "col-span-6" : "col-span-2")}>
          <div className="text-left">
            <div className="text-sm text-text">{t('Avg.APR')}</div>
            <div className="text-primary font-semibold text-lg">
              <RenderNumberFormat amount={allValidators && allValidators[0] ? allValidators[0].apr : 0} fractionDigits={2} /><span className="ml-1">%</span>
            </div>
          </div>
          <div className="flex justify-end">
            <img src={Images.Staking4PNG} alt="u2u" className="w-[80px] height-[105px]" />
          </div>
        </div>
        <div className={classNames("border border-border-ountline rounded-2xl p-4 pl-6 bg-neutral-surface shadow-2", isMobile ? "col-span-6" : "col-span-2")}>
          <div className="text-left">
            <div className="text-sm text-text">{t('Validators')}</div>
            <div className="text-primary font-semibold text-lg">
              {totalValidator}
            </div>
          </div>
          <div className="flex justify-end">
            <img src={Images.Staking5PNG} alt="u2u" className="w-[80px] height-[105px]" />
          </div>
        </div>
        <div className={classNames("border border-border-ountline rounded-2xl p-4 pl-6 bg-neutral-surface shadow-2", isMobile ? "col-span-6" : "col-span-2")}>
          <div className="text-left">
            <div className="text-sm text-text">{t('Delegators')}</div>
            <div className="text-primary font-semibold text-lg">
              {totalDelegator}
            </div>
          </div>
          <div className="flex justify-end">
            <img src={Images.Staking6PNG} alt="u2u" className="w-[80px] height-[105px]" />
          </div>
        </div>
        <div className={classNames("border border-border-ountline rounded-2xl p-4 pl-6 bg-neutral-surface shadow-2", isMobile ? "col-span-12" : "col-span-3")}>
          <div className="text-left">
            <div className="text-sm text-text">{t('Validators Rewards')}</div>
            <div className="text-primary font-semibold text-lg">
              <div className="text-primary font-semibold text-lg">{shortenDisplayNumber(bigFormatEther(validatorRewards))}</div>
            </div>
          </div>
          <LineChart data={validatorRewardsChart} />
        </div>
        <div className={classNames("border border-border-ountline rounded-2xl p-4 pl-6 bg-neutral-surface shadow-2", isMobile ? "col-span-12" : "col-span-3")}>
          <div className="text-left">
            <div className="text-sm text-text">{t('Total U2U Staked')}</div>
            <div className="text-primary font-semibold text-lg">{shortenDisplayNumber(bigFormatEther(totalStaked))}</div>
          </div>
          <LineChart data={validatorStakeChart} />
        </div>
      </div>
      <div className="my-10">
        <ValidatorList validators={allValidators} />
      </div>
    </div>

  )
}