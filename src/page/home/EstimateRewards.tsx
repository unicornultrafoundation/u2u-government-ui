import { useMemo, useState } from "react"
import { RenderNumberFormat } from "../../components"
import { SliderComponent } from "../../components"
import { useTranslation } from "react-i18next"
import { Images } from "../../images"

export const EstimateRewards = () => {
  const { t } = useTranslation()
  const [stakeSlideValue, setStakeSlideValue] = useState(0)
  const [lockSlideValue, setLockSlideValue] = useState(0)
  const maxStake = 1000000
  const maxLockDays = 365

  const stakeAmount = useMemo(() => {
    return Math.round(stakeSlideValue * maxStake / 100)
  }, [stakeSlideValue])


  const lockDays = useMemo(() => {
    return Math.round(lockSlideValue * maxLockDays / 100)
  }, [lockSlideValue])

  return (
    <div className="w-full flex justify-end pr-16">
      <div className="relative w-[450px]">
        <div className="absolute z-0 top-[-291px] left-[-385px]">
          <img src={Images.Ellipse1PNG} alt="u2u" />
        </div>
        <div className="absolute z-0 top-[250px] left-[200px]">
          <img src={Images.Ellipse2PNG} alt="u2u" />
        </div>
        <div className="z-20 w-[250px] text-center py-[10px] text-base font-semibold text-neutral rounded-[64px] bg-primary absolute top-[-22px] left-[100px] whitespace-nowrap">{t("Estimate your rewards")}</div>
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
              <div className="text-lg font-semibold text-primary">0 U2U</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-text">{t("APR")}</div>
              <div className="text-lg font-semibold text-primary">0 %</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}