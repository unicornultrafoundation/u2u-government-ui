import { useTranslation } from "react-i18next"
import { LockedStake, Validator } from "../../../types"
import { Images } from "../../../images"
import { bigFormatEther, millisecondToDay, nowTime, truncate } from "../../../utils"
import { Button, ChangePageParams, Pagination, RenderNumberFormat, UnlockStakeModal, buttonScale, buttonType } from "../../../components"
import { useCallback, useEffect, useMemo, useState } from "react"
import { TableLimit } from "../../../contants"
import { useLockedStakeStore, useValidatorStore } from "../../../store"
import { useNavigate } from "react-router-dom"

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
                  <td className="text-base py-3 text-left px-6">
                    <RenderValidator validatorId={Number(row.validatorId)}/>
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

const RenderValidator = ({ validatorId }: {
  validatorId: number
}) => {
  const navigate = useNavigate()

  const [validator, setValidator] = useState<Validator | undefined>(undefined)
  const [allValidators] = useValidatorStore(state => [
    state.allValidators
  ])
  useEffect(() => {
    if (allValidators && !validator) {
      const _index = allValidators.findIndex((val: Validator) => Number(val.valId) === validatorId);
      if (_index > -1) {
        setValidator(allValidators[_index])
      }
    }
  }, [allValidators, validatorId, validator])

  return (
    <div className="flex gap-4 items-center whitespace-nowrap">
      <img src={validator ? validator.avatar : Images.U2ULogoPNG} alt="u2u" className="w-[40px] h-[40px]" />
      <div className="text-left cursor-pointer" onClick={() => navigate(`${validator ? `/validator/${validator.valId}` : ""}`)}>
        {validator ? validator.name : `Validator ${validatorId}`}
        {validator && validator.auth && 
        <div className="flex gap-1 items-center text-text-secondary text-sm">
          <span>{truncate({ str: validator.auth, headCount: 5, tailCount: 3 })}</span>
        </div>}
      </div>
    </div>
  )
}