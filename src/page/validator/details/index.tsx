import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom"
import { useBalance, useFetchValidator } from "../../../hooks";
import { useMemo } from "react";
import { bigFormatEther, exploreAddress, truncate } from "../../../utils";
import { LineChart, RenderNumberFormat, StakingCalculator } from "../../../components";
import { VALIDATOR_COMMISSION } from "../../../contants"
import { ListOfValidator } from "./list";
import { Images } from "../../../images";

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

  if (!validator) return <></>

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
              <div className="text-primary font-semibold text-lg">{VALIDATOR_COMMISSION} %</div>
            </div>
            <div className="flex justify-end">
              <img src={Images.Staking4PNG} alt="u2u" className="w-[80px] height-[105px]" />
            </div>
          </div>
          <div className="col-span-2 border border-border-ountline rounded-2xl p-4 pl-6 bg-neutral-surface shadow-2">
            <div className="text-left">
              <div className="text-sm text-text">{t('APR')}</div>
              <div className="text-primary font-semibold text-lg">
                <RenderNumberFormat amount={apr} className="mr-2" fractionDigits={2} />
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
                <RenderNumberFormat amount={(Number(votingPower) / 10000)} fractionDigits={2} /><span className="ml-2">%</span>
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
              <div className="text-sm text-text">{t('Validators Rewards')}</div>
              <div className="text-primary font-semibold text-lg">
                {/* <RenderNumberFormat amount={allValidators && allValidators[0] ? allValidators[0].apr : 0} className="mr-2" fractionDigits={2} /> */}
              </div>
            </div>
            <LineChart />
          </div>
        </div>
        <div className="w-full grid grid-cols-12 gap-8 mt-8">
          <div className="col-span-4">
            <div className="w-full flex justify-end">
              <StakingCalculator balance={balance} validators={[validator]} />
            </div>
          </div>
          <div className="col-span-8">
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