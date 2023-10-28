import { useTranslation } from "react-i18next"
import { Delegator, Validation } from "../../../types"
import { Images } from "../../../images"
import { bigFormatEther } from "../../../utils"
import { ChangePageParams, Pagination, RenderNumberFormat } from "../../../components"
import { useEffect, useMemo, useState } from "react"
import { TableLimit } from "../../../contants"
import { useDelegator } from "../../../hooks"
import { useLockedStakeStore } from "../../../store"

export const Staked = () => {
  const { t } = useTranslation()
  const { delegatorState } = useDelegator()  
  const { validations } = useMemo(() => delegatorState ? delegatorState : {} as Delegator, [delegatorState])
  const [lockedStake] = useLockedStakeStore(state => [
    state.lockedStake
  ])

  const [skip, setSkip] = useState(0)
  const total = useMemo(() => { return lockedStake.length || 0 }, [lockedStake])
  const [clientRecords, setClientRecord] = useState<Validation[]>([])
  const onChangePage = async (params: ChangePageParams) => {
    let _skip = params.page ? params.page - 1 : 0
    setSkip(_skip)
  }

  useEffect(() => {
    if (validations && validations.length > 0) {
      if (validations.length > TableLimit) {
        setClientRecord(validations.slice(skip, skip + TableLimit))
      } else {
        setClientRecord(validations)
      }
    }
  }, [validations, skip])
  
  if (!clientRecords) return <></>
  return (
    <div className="w-full overflow-x-auto mt-4">
      <table className="w-full">
        <thead>
          <tr className="border-y border-border-outline text-text-secondary font-medium">
            <th className="py-6 text-left px-6 font-medium whitespace-nowrap">{t("Validator")}</th>
            <th className="py-6 text-right font-medium whitespace-nowrap">{t("Staked Amount (U2U)")}</th>
          </tr>
        </thead>
        <tbody>
          {
            clientRecords.map((row: Validation, index: number) => {
              return (
                <tr key={index} className="border-y border-border-outline font-semibold hover:bg-neutral-surface-hover">
                  <td className="text-base font-bold text-text py-3 text-left px-6">
                    <div className="flex gap-4 items-center whitespace-nowrap">
                      <img src={Images.U2ULogoPNG} alt="u2u" />
                      <div>{`${row.validator.name}`}</div>
                    </div>
                  </td>
                  <td className="text-base font-semibold text-text py-3 text-right ">
                    <RenderNumberFormat amount={bigFormatEther(row.actualStakedAmount)} />
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