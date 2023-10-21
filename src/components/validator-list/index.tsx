import { useTranslation } from "react-i18next";
import { Images } from "../../images";
import { Validator } from "../../types"
import { bigFormatEther } from "../../utils";
import { RenderNumberFormat } from "../text";
import { useNavigate } from "react-router-dom";

interface ValidatorListProps {
  validators: Validator[]
}
export const ValidatorList = ({
  validators
}: ValidatorListProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  if (validators.length === 0) return <></>
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-y border-border-outline text-text-secondary font-medium">
            <th className="py-6 text-left px-6 font-medium">{"#"}</th>
            <th className="py-6 text-left font-medium">{t("Validator")}</th>
            <th className="py-6 text-right font-medium">{t("Staked Amount (U2U)")}</th>
            <th className="py-6 text-right font-medium">{t("APR (%)")}</th>
            <th className="py-6 text-right font-medium">{t("Voting Power (%)")}</th>
            <th className="py-6 text-right font-medium">{t("Delegators")}</th>
            <th className="py-6 text-right font-medium px-6">{t("Status")}</th>
          </tr>
        </thead>
        <tbody>
          {
            validators.length > 0 && validators.map((row: Validator, index: number) => {
              return (
                <tr key={index} className="border-y border-border-outline font-semibold hover:bg-neutral-surface-hover cursor-pointer" onClick={() => navigate(`/validator/${row.valId}`)}>
                  <td className="py-4 px-6 text-left">{index + 1}</td>
                  <td className="text-base font-semibold text-text py-4">
                    <div className="flex gap-4 items-center">
                      <img src={Images.U2ULogoPNG} alt="u2u" />
                      <div>{row.name}</div>
                    </div>
                  </td>
                  <td className="text-base font-semibold text-text py-4 text-right">
                    <RenderNumberFormat amount={bigFormatEther(row.totalStakedAmount || 0) || 0} fractionDigits={0} />
                  </td>
                  <td className={`text-right font-medium`}>
                    <RenderNumberFormat amount={row.apr} fractionDigits={2} />
                  </td>
                  <td className={`text-right font-medium`}>
                    <RenderNumberFormat amount={Number(row.votingPower) / 10000} fractionDigits={2} />
                  </td>
                  <td className={`text-right font-medium`}>
                    {row.totalDelegator}
                  </td>
                  <td className={`text-right font-medium px-6`}>
                    <div className="text-white flex justify-end items-center">
                      {!!row.active ? <div className="text-xs text-neutral px-3 text-center bg-success rounded-[40px] h-[20px] leading-5">{t("Active")}</div> :
                        <div className="text-xs text-neutral px-3 text-center bg-neutral-surface-disabled rounded-[40px] h-[20px] leading-5">{t("Deactive")}</div>}
                    </div>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}