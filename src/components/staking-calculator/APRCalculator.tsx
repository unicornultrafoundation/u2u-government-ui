
import { useEffect, useState } from "react"
import { Validator } from "../../types"
import { RenderNumberFormat } from "../text"
import { useValidatorApr } from "../../hooks"
import { useTranslation } from "react-i18next"

interface APRCalculatorProp {
  amount: any
  validator: Validator
}

export interface AprResult {
  _30days: number;
  _90days: number;
  _180days: number;
  _365days: number;
  _apr: number;
}

export const APRCalculator = ({ amount, validator }: APRCalculatorProp) => {  
  const { t } = useTranslation()
  const { apr } = useValidatorApr(Number(validator ? validator.valId : 0), amount)
  const [aprResult, serAprResult] = useState<AprResult>({} as AprResult)

  useEffect(() => {
    (async () => {
      if (!amount || !apr) {
        serAprResult({} as AprResult)
        return;
      }
      serAprResult({
        _30days: apr * amount * 30 / 365,
        _90days: apr * amount * 90 / 365,
        _180days: apr * amount * 180 / 365,
        _365days: apr * amount,
        _apr: apr * 100
      })
    })()
  }, [apr, amount])

  return (
    <div className="mb-6">
      <div className="flex justify-between">
        <div className="text-base text-text-secondary">{t("Current estimated APR(%)")}</div>
        <div className="text-base text-text"><RenderNumberFormat amount={aprResult._apr} fractionDigits={2} /></div>
      </div>
      <div className="flex justify-between">
        <div className="text-base text-text-secondary">{t("30 days")}</div>
        <div className="text-base text-text"><RenderNumberFormat amount={aprResult._30days} fractionDigits={2} /><span className="ml-1">U2U</span></div>
      </div>
      <div className="flex justify-between">
        <div className="text-base text-text-secondary">{t("90 days")}</div>
        <div className="text-base text-text"><RenderNumberFormat amount={aprResult._90days} fractionDigits={2} /><span className="ml-1">U2U</span></div>
      </div>
      <div className="flex justify-between">
        <div className="text-base text-text-secondary">{t("180 days")}</div>
        <div className="text-base text-text"><RenderNumberFormat amount={aprResult._180days} fractionDigits={2} /><span className="ml-1">U2U</span></div>
      </div>
      <div className="flex justify-between">
        <div className="text-base text-text-secondary">{t("365 days")}</div>
        <div className="text-base text-text"><RenderNumberFormat amount={aprResult._365days} fractionDigits={2} /><span className="ml-1">U2U</span></div>
      </div>
    </div>
  )
}