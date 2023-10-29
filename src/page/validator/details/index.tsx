import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom"
import { useBalance, useFetchValidator, useFetchValidatorEpochRewards } from "../../../hooks";
import { useMemo } from "react";
import { bigFormatEther, exploreAddress, shortenDisplayNumber, truncate } from "../../../utils";
import { LineChart, RenderNumberFormat, StakingCalculator } from "../../../components";
import { VALIDATOR_COMMISSION } from "../../../contants"
import { ListOfValidator } from "./list";
import { Images } from "../../../images";
import { isMobile } from 'mobile-device-detect';
import { EpochReward } from "../../../types";

export const ValidatorDetails = () => {

  const { t } = useTranslation()
  const { validatorId } = useParams()
  const { balance } = useBalance()
  const { validator } = useFetchValidator(Number(validatorId))

  const {
    name,
    valId,
    auth,
    totalStakedAmount,
    active,
    votingPower,
    totalDelegator,
    apr
  } = useMemo(() => validator, [validator])

  const { rewards } = useFetchValidatorEpochRewards(valId ? Number(valId) : 0)

  const validatorRewards = useMemo(() => {
    if (rewards && rewards.length > 0) {
      let lastRewards = rewards[0]
      return lastRewards.totalRewards
    }
    return 0
  }, [rewards])

  const validatorRewardsChart = useMemo(() => {
    if (rewards && rewards.length > 0) {
      return rewards.map((i: EpochReward) => {
        return Number(bigFormatEther(i.totalRewards))
      }).reverse()
    }
    return [0, 10, 15, 20, 10, 15, 20, 15, 10]
  }, [rewards])

  console.log("rewards", validatorRewardsChart);
  

  if (!validator) return <></>

  if (isMobile) {
    return (
      <div className="p-4">
        <div className="flex gap-4">
          <img src={Images.U2ULogoPNG} alt="u2u" className="w-[48px] h-[48px]" />
          <div className="text-left">
            <div className="text-text-secondary text-sm">{t("Validator")}</div>
            <div className="flex gap-4">
              <div className="text-lg text-text font-semibold">{name}</div>
              <div>
                {!!active ? <div className="text-xs text-neutral px-3 text-center bg-success rounded-[40px] h-[20px] leading-5">{t("Active")}</div> :
                  <div className="text-xs text-neutral px-3 text-center bg-neutral-surface-disabled rounded-[40px] h-[20px] leading-5">{t("Deactive")}</div>}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex gap-2 items-center">
            <div className="text-base text-text-secondary">{t("Validator Auth")}</div>
            <div className="text-base font-semibold text-primary">
              <a href={exploreAddress(auth)} target="_blank" rel="noopener noreferrer">{truncate({ str: auth, headCount: 5, tailCount: 3 })}</a>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="text-base text-text-secondary">{t("Validator ID")}</div>
            <div className="text-base font-semibold text-primary">
              {valId}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center gap-10 mt-2">
          <div className="flex gap-1 items-center">
            <img src={Images.CoinsPNG} alt="u2u" className="w-[24px]" />
            <div className="text-base font-semibold text-text-secondary">{t("Total Staked Amount")}</div>
          </div>
          <div className="flex gap-1 items-center">
            <div className="font-semibold text-lg text-text">
              <RenderNumberFormat amount={bigFormatEther(totalStakedAmount || 0) || 0} fractionDigits={0} />
            </div>
            <img src={Images.U2ULogoPNG} alt="u2u" className="w-[24px] h-[24px]" />
          </div>
        </div>
        <div className="w-full grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-6 border border-border-ountline rounded-2xl p-4 pl-6 bg-neutral-surface shadow-2">
            <div className="text-left">
              <div className="text-sm text-text">{t('Commission')}</div>
              <div className="text-primary font-semibold text-lg">{VALIDATOR_COMMISSION}<span className="ml-1">%</span></div>
            </div>
            <div className="flex justify-end">
              <img src={Images.Staking7PNG} alt="u2u" className="w-[80px] height-[105px]" />
            </div>
          </div>
          <div className="col-span-6 border border-border-ountline rounded-2xl p-4 pl-6 bg-neutral-surface shadow-2">
            <div className="text-left">
              <div className="text-sm text-text">{t('APR')}</div>
              <div className="text-primary font-semibold text-lg">
                <RenderNumberFormat amount={apr} fractionDigits={2} /><span className="ml-1">%</span>
              </div>
            </div>
            <div className="flex justify-end">
              <img src={Images.Staking4PNG} alt="u2u" className="w-[80px] height-[105px]" />
            </div>
          </div>
          <div className="col-span-6 border border-border-ountline rounded-2xl p-4 pl-6 bg-neutral-surface shadow-2">
            <div className="text-left">
              <div className="text-sm text-text">{t('Voting Power')}</div>
              <div className="text-primary font-semibold text-lg">
                <RenderNumberFormat amount={(Number(votingPower) / 10000)} fractionDigits={2} /><span className="ml-1">%</span>
              </div>
            </div>
            <div className="flex justify-end">
              <img src={Images.Staking5PNG} alt="u2u" className="w-[80px] height-[105px]" />
            </div>
          </div>
          <div className="col-span-6 border border-border-ountline rounded-2xl p-4 pl-6 bg-neutral-surface shadow-2">
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
          <div className="col-span-12 border border-border-ountline rounded-2xl p-4 pb-0 bg-neutral-surface shadow-2">
            <div className="text-left">
              <div className="text-sm text-text">{t('Validator Rewards')}</div>
              <div className="text-primary font-semibold text-lg">
              <div className="text-primary font-semibold text-lg">{shortenDisplayNumber(bigFormatEther(validatorRewards))}</div>
              </div>
            </div>
            <LineChart data={validatorRewardsChart} />
          </div>
        </div>

        <div className="w-full grid grid-cols-12 gap-8 mt-4 mb-8">
          <div className="col-span-12">
            <div className="w-full flex justify-end">
              <StakingCalculator balance={balance} validators={[validator]} />
            </div>
          </div>
          <div className="col-span-12">
            <ListOfValidator
              valId={Number(valId)}
              totalDelegator={totalDelegator}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-6">
      <div className="w-full bg-gradient-3 py-4 px-[74px] flex justify-between">
        <div className="flex gap-4">
          <img src={Images.U2ULogoPNG} alt="u2u" className="w-[48px] h-[48px]" />
          <div className="text-left">
            <div className="text-text-secondary text-sm">{t("Validator")}</div>
            <div className="flex gap-4">
              <div className="text-lg text-text font-semibold">{name}</div>
              <div>
                {!!active ? <div className="text-xs text-neutral px-3 text-center bg-success rounded-[40px] h-[20px] leading-5">{t("Active")}</div> :
                  <div className="text-xs text-neutral px-3 text-center bg-neutral-surface-disabled rounded-[40px] h-[20px] leading-5">{t("Deactive")}</div>}
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-neutral-surface rounded-[16px]">
          <div className="flex justify-between items-center gap-10 mb-2">
            <div className="flex gap-1 items-center">
              <img src={Images.CoinsPNG} alt="u2u" className="w-[24px]" />
              <div className="text-base font-semibold text-text-secondary">{t("Total Staked Amount")}</div>
            </div>
            <div className="flex gap-1 items-center">
              <div className="font-semibold text-lg text-text">
                <RenderNumberFormat amount={bigFormatEther(totalStakedAmount || 0) || 0} fractionDigits={0} />
              </div>
              <img src={Images.U2ULogoPNG} alt="u2u" className="w-[24px] h-[24px]" />
            </div>
          </div>
          <div className="flex justify-between items-center gap-10">
            <div className="flex gap-2 items-center">
              <div className="text-base text-text-secondary">{t("Validator Auth")}</div>
              <div className="text-base font-semibold text-primary">
                <a href={exploreAddress(auth)} target="_blank" rel="noopener noreferrer">{truncate({ str: auth, headCount: 5, tailCount: 3 })}</a>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="text-base text-text-secondary">{t("Validator ID")}</div>
              <div className="text-base font-semibold text-primary">
                {valId}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-8 mt-8">
        <div className="w-full grid grid-cols-12 gap-4">
          <div className="col-span-2 border border-border-ountline rounded-2xl p-4 pl-6 bg-neutral-surface shadow-2">
            <div className="text-left">
              <div className="text-sm text-text">{t('Commission')}</div>
              <div className="text-primary font-semibold text-lg">{VALIDATOR_COMMISSION}<span className="ml-1">%</span></div>
            </div>
            <div className="flex justify-end">
              <img src={Images.Staking7PNG} alt="u2u" className="w-[80px] height-[105px]" />
            </div>
          </div>
          <div className="col-span-2 border border-border-ountline rounded-2xl p-4 pl-6 bg-neutral-surface shadow-2">
            <div className="text-left">
              <div className="text-sm text-text">{t('APR')}</div>
              <div className="text-primary font-semibold text-lg">
                <RenderNumberFormat amount={apr} fractionDigits={2} /><span className="ml-1">%</span>
              </div>
            </div>
            <div className="flex justify-end">
              <img src={Images.Staking4PNG} alt="u2u" className="w-[80px] height-[105px]" />
            </div>
          </div>
          <div className="col-span-2 border border-border-ountline rounded-2xl p-4 pl-6 bg-neutral-surface shadow-2">
            <div className="text-left">
              <div className="text-sm text-text">{t('Voting Power')}</div>
              <div className="text-primary font-semibold text-lg">
                <RenderNumberFormat amount={(Number(votingPower) / 10000)} fractionDigits={2} /><span className="ml-1">%</span>
              </div>
            </div>
            <div className="flex justify-end">
              <img src={Images.Staking5PNG} alt="u2u" className="w-[80px] height-[105px]" />
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
              <img src={Images.Staking6PNG} alt="u2u" className="w-[80px] height-[105px]" />
            </div>
          </div>
          <div className="col-span-4 border border-border-ountline rounded-2xl p-4 pb-0 bg-neutral-surface shadow-2">
            <div className="text-left">
              <div className="text-sm text-text">{t('Validator Rewards')}</div>
              <div className="text-primary font-semibold text-lg">
              <div className="text-primary font-semibold text-lg">{shortenDisplayNumber(bigFormatEther(validatorRewards))}</div>
              </div>
            </div>
            <LineChart data={validatorRewardsChart} />
          </div>
        </div>
        <div className="w-full grid grid-cols-12 gap-8 mt-8">
          <div className="col-span-6 2xl:col-span-5">
            <div className="w-full flex justify-end">
              <StakingCalculator balance={balance} validators={[validator]} />
            </div>
          </div>
          <div className="col-span-6 2xl:col-span-7">
            <ListOfValidator
              valId={Number(valId)}
              totalDelegator={totalDelegator}
            />
          </div>
        </div>
      </div>
    </div>
  )
}