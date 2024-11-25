import { useEffect, useMemo, useState } from "react"
import { RenderNumberFormat } from "../../components"
import { SliderComponent } from "../../components"
import { useTranslation } from "react-i18next"
import { Images } from "../../images"
import { useValidatorStore } from "../../store"
import { QueryService } from "../../thegraph"
import { ethers } from "ethers"
import { isMobile } from 'mobile-device-detect';
import { classNames } from "../../utils"
import { QueryAPRPayload } from "../../types"

export const EstimateRewards = () => {
  const { t } = useTranslation()
  const [stakeSlideValue, setStakeSlideValue] = useState(0)
  const [lockSlideValue, setLockSlideValue] = useState(0)
  const maxStake = 1000000
  const maxLockDays = 365

  const [allValidators] = useValidatorStore((state) => [
    state.allValidators
  ])

  const [apr, setApr] = useState(0)
  const [rewards, setRewards] = useState(0)

  const stakeAmount = useMemo(() => {
    return Math.round(stakeSlideValue * maxStake / 100)
  }, [stakeSlideValue])


  const lockDays = useMemo(() => {
    return Math.round(lockSlideValue * maxLockDays / 100)
  }, [lockSlideValue])


  useEffect(() => {
    (async () => {
      if (allValidators && allValidators.length > 0) {
        try {
          const amountDec = ethers.utils.parseEther(stakeAmount.toString()).toString();
          const duration = lockDays * 24 * 60 * 60
          let total = 0;
          const valsPayload: QueryAPRPayload[] = allValidators.map((v: any) => {
            return  {
              validator: Number(v.valId),
              amount: amountDec,
              duration: duration
            } as QueryAPRPayload
          })
          if (valsPayload && stakeAmount) {
            const { data: dataApr } = await QueryService.queryValidatorsApr(valsPayload)
            for (let i = 0; i < valsPayload.length; ++i) {
              total += Number(dataApr[`apr${valsPayload[i].validator}`])
            }
            const _apr = total / valsPayload.length
            setApr(_apr)
            setRewards(_apr/100*stakeAmount)
          } else {
            setApr(0)
          }
        } catch (error) { }
      }
    })()
  }, [allValidators, stakeAmount, lockDays])

  return (
    <div className={classNames("w-full flex", isMobile ? "justify-center" : "justify-end pr-16")}>
      <div className={classNames("relative", isMobile ? "w-full" : "w-[450px]")}>
        <div className="absolute z-0 top-[-291px] left-[-385px]">
          <img src={Images.Ellipse1PNG} alt="u2u" />
        </div>
        <div className="absolute z-0 top-[250px] left-[200px]">
          <img src={Images.Ellipse2PNG} alt="u2u" />
        </div>
        <div className={classNames(
          "z-20 w-[250px] text-center py-[10px] text-base font-semibold text-neutral rounded-[64px] bg-primary absolute top-[-22px] whitespace-nowrap",
          isMobile ? "left-[calc(50vw_-_140px)]" : "left-[100px]"
        )}>{t("Estimate your rewards")}</div>
        <div className="z-10 relative border border-border-outline shadow-1 px-10 pt-[54px] pb-8 rounded-[24px] bg-neutral-surface text-left">
          <div className="mb-4">
            <div className="flex gap-2 mb-4">
              <div className="text-lg text-text font-semibold">{t("You stake")}</div>
              <div className="text-lg text-primary font-semibold">
                <RenderNumberFormat amount={stakeAmount} fractionDigits={2} /><span className="ml-2">U2U</span>
              </div>
            </div>
            <SliderComponent
              value={stakeSlideValue}
              defaultValue={0}
              onChange={(e) => {
                setStakeSlideValue(Number(e.target.value))
              }} />
            <div className="flex justify-between mt-4">
              <div className="text-sm text-text-secondary">0 U2U</div>
              <div className="text-sm text-text-secondary">
                <RenderNumberFormat amount={maxStake} fractionDigits={2} /><span className="ml-1">U2U</span>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <div className="flex gap-2 mb-4">
              <div className="text-lg text-text font-semibold">{t("Lock it for")}</div>
              <div className="text-lg text-primary font-semibold">
                <span>{lockDays}</span><span className="ml-2">{lockDays < 2 ? "day" : "days"}</span>
              </div>
            </div>
            <SliderComponent
              value={lockSlideValue}
              defaultValue={0}
              onChange={(e) => {
                setLockSlideValue(Number(e.target.value))
              }} />
            <div className="flex justify-between mt-4">
              <div className="text-sm text-text-secondary">0 day</div>
              <div className="text-sm text-text-secondary">365 days</div>
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <div className="text-lg font-semibold text-text">{t("Estimated rewards")}</div>
              <div className="text-lg font-semibold text-primary">
                <RenderNumberFormat amount={rewards} fractionDigits={0} />
                <span className="ml-1">U2U</span></div>
            </div>
            <div>
              <div className="text-lg font-semibold text-text">{t("APR")}</div>
              <div className="text-lg font-semibold text-primary">
                <RenderNumberFormat amount={apr} fractionDigits={2} /> <span className="ml-1">%</span></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}