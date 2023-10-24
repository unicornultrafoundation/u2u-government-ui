import { useTranslation } from "react-i18next"
import { WithdrawalRequest } from "../../../types"
import { Images } from "../../../images"
import { bigFormatEther, millisecondToDay, nowTime } from "../../../utils"
import { ChangePageParams, Pagination, RenderNumberFormat } from "../../../components"
import { useEffect, useMemo, useState } from "react"
import { TableLimit } from "../../../contants"

interface WithdrawPendingProps {
  wr: WithdrawalRequest[]
}

export const WithdrawPending = ({wr}: WithdrawPendingProps) => {
  const { t } = useTranslation()
  const [skip, setSkip] = useState(0)
  const total = useMemo(() => {return wr.length || 0}, [wr])
  const [clientRecords, setClientRecord] = useState<WithdrawalRequest[]>([])
  const onChangePage = async (params: ChangePageParams) => {
    let _skip = params.page ? params.page - 1 : 0
    setSkip(_skip)
  }

  useEffect(() => {
    if (wr && wr.length > 0) {
      if (wr.length > TableLimit) {
        setClientRecord(wr.slice(skip, skip + TableLimit))
      } else {
        setClientRecord(wr)
      }
    }
  }, [wr, skip])

  if (!clientRecords) return <></>
  return (
    <div className="w-full overflow-x-auto mt-4">
        <table className="w-full">
          <thead>
            <tr className="border-y border-border-outline text-text-secondary font-medium">
              <th className="py-6 text-left px-6 font-medium whitespace-nowrap">{t("WrID")}</th>
              <th className="py-6 text-left font-medium whitespace-nowrap">{t("Validators")}</th>
              <th className="py-6 text-right font-medium px-6 whitespace-nowrap">{t("Unbonded amount (U2U)")}</th>
              <th className="py-6 text-right font-medium px-6 whitespace-nowrap">{t("Release in")}</th>
            </tr>
          </thead>
          <tbody>
            {
              clientRecords.map((row: WithdrawalRequest, index: number) => {
                return (
                  <tr key={index} className="border-y border-border-outline font-semibold hover:bg-neutral-surface-hover">
                    <td className="text-base font-bold text-primary py-3 text-left px-6">
                      {row.wrId}
                    </td>
                    <td className="text-base font-semibold text-text py-3 text-right ">
                      <div className="flex gap-4 items-center whitespace-nowrap">
                        <img src={Images.U2ULogoPNG} alt="u2u" />
                        <div>{`Validator ${row.validatorId}`}</div>
                      </div>
                    </td>
                    <td className="text-base font-semibold text-text py-3 text-right px-6">
                    <RenderNumberFormat amount={bigFormatEther(row.unbondingAmount)} />
                    </td>
                    <td className="text-base font-semibold text-text py-3 text-right px-6 whitespace-nowrap">
                      {nowTime() < row.withdrawalAbleTime ? millisecondToDay(row.withdrawalAbleTime - nowTime()) : ''}
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <Pagination
          limit={TableLimit}
          total={total}
          onChangePage={onChangePage}
        />
      </div>
  )
  
}