import { useTranslation } from "react-i18next"
import { LockedStake } from "../../../types"
import { Images } from "../../../images"
import { bigFormatEther, millisecondToDay, nowTime } from "../../../utils"
import { Button, ChangePageParams, Pagination, RenderNumberFormat, UnlockStakeModal, buttonScale, buttonType } from "../../../components"
import { useCallback, useEffect, useMemo, useState } from "react"
import { TableLimit } from "../../../contants"
import { useLockedStakeStore } from "../../../store"

export const Locked = () => {
  const { t } = useTranslation()
  const [lockedStake] = useLockedStakeStore(state => [
    state.lockedStake
  ])

  const [skip, setSkip] = useState(0)
  const total = useMemo(() => { return lockedStake.length || 0 }, [lockedStake])
  const [clientRecords, setClientRecord] = useState<LockedStake[]>([])
  const onChangePage = async (params: ChangePageParams) => {
    let _skip = params.page ? params.page - 1 : 0
    setSkip(_skip)
  }

  useEffect(() => {
    if (lockedStake && lockedStake.length > 0) {
      if (lockedStake.length > TableLimit) {
        setClientRecord(lockedStake.slice(skip, skip + TableLimit))
      } else {
        setClientRecord(lockedStake)
      }
    }
  }, [lockedStake, skip])


  if (!clientRecords) return <></>
  return (
    <div className="w-full overflow-x-auto mt-4">
      <table className="w-full">
        <thead>
          <tr className="border-y border-border-outline text-text-secondary font-medium">
            <th className="py-6 text-left px-6 font-medium whitespace-nowrap">{t("Validator")}</th>
            <th className="py-6 text-left font-medium whitespace-nowrap">{t("Locked Amount (U2U)")}</th>
            <th className="py-6 text-right font-medium px-6 whitespace-nowrap">{t("Duration (Days)")}</th>
            <th className="py-6 text-right font-medium px-6 whitespace-nowrap">{t("End in")}</th>
            <th className="py-6 text-right font-medium px-6 whitespace-nowrap">{t("Action")}</th>
          </tr>
        </thead>
        <tbody>
          {
            clientRecords.map((row: LockedStake, index: number) => {
              return (
                <tr key={index} className="border-y border-border-outline font-semibold hover:bg-neutral-surface-hover">
                  <td className="text-base font-bold text-primary py-3 text-left px-6">
                    <div className="flex gap-4 items-center whitespace-nowrap">
                      <img src={Images.U2ULogoPNG} alt="u2u" />
                      <div>{`Validator ${Number(row.validatorId)}`}</div>
                    </div>
                  </td>
                  <td className="text-base font-semibold text-text py-3 text-right ">
                    <RenderNumberFormat amount={bigFormatEther(row.lockedAmount)} />
                  </td>
                  <td className="text-base font-semibold text-text py-3 text-right px-6 whitespace-nowrap">
                    {row.duration / 86400000}
                  </td>
                  <td className="text-base font-semibold text-text py-3 text-right px-6 whitespace-nowrap">
                    {nowTime() < row.endTime ? millisecondToDay(row.endTime - nowTime()) : ''}
                  </td>
                  <td className="text-base font-semibold text-text-secondary py-3 text-right px-6 whitespace-nowrap flex gap-1 items-center justify-end">
                    <RenderUnlockButton lockStake={row} />
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

const RenderUnlockButton = ({ lockStake }: {
  lockStake: LockedStake
}) => {

  const { t } = useTranslation()
  const [isShow, setIsShow] = useState(false)
  const onUnlock = useCallback(() => {
    setIsShow(true)
  }, [])

  return (
    <div>
      <Button
        scale={buttonScale.sm}
        variant={buttonType.secondary}
        onClick={onUnlock}>{t("Un-lock")}</Button>
      <UnlockStakeModal
        isOpenModal={isShow}
        setIsOpenModal={setIsShow}
        lockStake={lockStake} />
    </div>
  )
}