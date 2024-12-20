import { useTranslation } from "react-i18next"
import { Delegator, Validation } from "../../../types"
import { Images } from "../../../images"
import { bigFormatEther, truncate } from "../../../utils"
import { ChangePageParams, EmptyComponent, Pagination, RenderNumberFormat } from "../../../components"
import { useEffect, useMemo, useState } from "react"
import { TableLimit } from "../../../contants"
import { useDelegator } from "../../../hooks"
import { useLockedStakeStore } from "../../../store"
import { useNavigate } from "react-router-dom"
import { BigNumber } from "ethers"

export const Staked = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

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

  const validationsFilter = useMemo(() => {
    if (!validations || validations.length === 0) return [] 
    return validations.filter(i => (BigNumber.from(0)).lt(i.stakedAmount))
  }, [validations])


  useEffect(() => {
    if (validationsFilter && validationsFilter.length > 0) {
      if (validationsFilter.length > TableLimit) {
        setClientRecord(validationsFilter.slice(skip, skip + TableLimit))
      } else {
        setClientRecord(validationsFilter)
      }
    } else {
      setClientRecord([])
    }
  }, [validationsFilter, skip])

  

  if (!clientRecords || clientRecords.length === 0) return <EmptyComponent />
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
                    <div className="flex gap-4 items-center whitespace-nowrap cursor-pointer" onClick={() => navigate(`${row.validator ? `/validator/${row.validator.valId}` : ""}`)}>
                      <img src={row.validator ? row.validator.avatar : Images.U2ULogoPNG} alt="u2u" className="w-[40px] h-[40px]" />
                      <div className="text-left">
                        {`${row.validator.name}`}
                        <div className="flex gap-1 items-center text-text-secondary text-sm">
                          <span>{truncate({ str: row.validator.auth, headCount: 5, tailCount: 3 })}</span>
                        </div>
                      </div>
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