import { useFetchEpochOfValidator } from "../../hooks";
import { ValidatorEpochInfo } from "../../types";
import { RenderNumberFormat } from "../text";
import { bigFormatEther, dateToUTCString } from "../../utils";
import { ChangePageParams, Pagination } from "../pagination";
import { TableLimit } from "../../contants";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ValidatorEpochsProps {
  validationId: number
}


export const ValidatorEpochs = ({
  validationId
}: ValidatorEpochsProps) => {

  const {t} = useTranslation()

  const [skip, setSkip] = useState(0)
  const { epoches, totalCount } = useFetchEpochOfValidator(validationId, skip)

  const onChangePage = async (params: ChangePageParams) => {
    let _skip = params.page ? params.page - 1 : 0
    setSkip(_skip)
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
      <thead>
          <tr className="border-y border-border-outline text-text-secondary font-medium">
            <th className="py-6 text-left px-6 font-medium">{t("Epoch")}</th>
            <th className="py-6 text-right font-medium">{t("Rewards (U2U)")}</th>
            <th className="py-6 text-right font-medium px-6">{t("End Time")}</th>
          </tr>
        </thead>
        <tbody>
          {
            epoches && epoches.length > 0 ? epoches.map((row: ValidatorEpochInfo, index: number) => {
              return (
                <tr key={index} className="border-y border-border-outline font-semibold hover:bg-neutral-surface-hover cursor-pointer">
                  <td className="text-base font-semibold text-primary py-4 text-left px-6">
                  {row.epochId}                  
                  </td>
                  <td className="text-base font-semibold text-text py-4 text-right">
                    <RenderNumberFormat amount={bigFormatEther(row.epochRewards)} fractionDigits={2} />
                  </td>
                  <td className="text-base font-semibold text-text py-4 text-right px-6">
                    {dateToUTCString(row.endTime)}
                  </td>
                </tr>
              )
            }) : <></>
          }
        </tbody>
      </table>
      <Pagination
        limit={TableLimit}
        total={totalCount}
        onChangePage={onChangePage}
      />
    </div>
  )
}