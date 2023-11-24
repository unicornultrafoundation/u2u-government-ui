import { Modal, modalScale } from "."
import { useTranslation } from "react-i18next"
import { LockedStake, Validator } from "../../types"
import { bigFormatEther, classNames, truncate } from "../../utils"
import { RenderNumberFormat } from "../text"
import { appConfig } from "../../contants"
import { useLockedStakeStore } from "../../store"
import { useMemo } from "react"

interface ValidatorStakeModalProps {
  isOpenModal: boolean
  setIsOpenModal: (open: boolean) => void
  validators: Validator[]
  selected: Validator
  setSelected: (val: Validator) => void
}

export const ValidatorStakeModal = ({
  isOpenModal,
  setIsOpenModal,
  validators,
  selected,
  setSelected
}: ValidatorStakeModalProps) => {

  const { t } = useTranslation()

  return (
    <Modal isOpen={isOpenModal} scale={modalScale.lg} setIsOpen={setIsOpenModal}>
      <div className="text-[24px] font-bold text-text text-center whitespace-nowrap">{t("Choose a Validator")}</div>
      <div className="w-full mt-6 min-w-[600px]">
        {
          validators.map((row: Validator, index: number) => {
            return (
              <div className={classNames(
                "w-full flex px-4 py-2 items-center justify-between border border-border-outline rounded-[8px] mb-2 cursor-pointer hover:bg-neutral-surface-hover",
                selected.valId === row.valId ? "bg-neutral-surface-hover" : "")}
                key={index}
                onClick={() => {
                  setSelected(row)
                  setIsOpenModal(false)
                }}>
                <div className="flex gap-4 items-center whitespace-nowrap">
                  <img src={row.avatar} className="w-[40px] h-[40px]" alt="u2u" />
                  <div className="text-left">
                    <div className="text-base font-semibold text-text">{row.name}</div>
                    <div className="flex gap-1 items-center text-text-secondary">
                      <span>{truncate({ str: row.auth, headCount: 5, tailCount: 3 })}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-8">
                  <RenderMaxLock validatorId={Number(row.valId)} />
                  <div>
                    <div className="text-[14px] text-text-secondary whitespace-nowrap">{t("APR (%)")}</div>
                    <div className="text-base text-text whitespace-nowrap">
                      <RenderNumberFormat amount={row.apr} fractionDigits={2} />
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] text-text-secondary whitespace-nowrap">{t("VP (%)")}</div>
                    <div className="text-base text-text whitespace-nowrap">
                      <RenderNumberFormat amount={Number(row.votingPower) / 10000} fractionDigits={2} />
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] text-text-secondary whitespace-nowrap">{t("Staked (U2U)")}</div>
                    <div className="text-base text-text whitespace-nowrap">
                      <RenderNumberFormat amount={bigFormatEther(row.totalStakedAmount || 0) || 0} fractionDigits={0} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </Modal>
  )
}

const RenderMaxLock = ({validatorId}: {
  validatorId: number
}) => {
  const { t } = useTranslation()
  const [valAuthLockStake] = useLockedStakeStore(state => [
    state.valAuthLockStake
  ])
  let maxDuration = useMemo(() => {
    const _authLock = valAuthLockStake.findIndex((lock: LockedStake) => Number(lock.validatorId) === Number(validatorId))
    if (_authLock > -1) {
      const authLockInfo = valAuthLockStake[_authLock]
      const _endTime = authLockInfo.endTime
      let now = Math.ceil((new Date()).getTime())
      if (_endTime < now) return 0
      let duration = Math.ceil((_endTime - now) / 86400000) - 1
      if (duration < appConfig.minLockupDuration) return 0
      return duration
    }
    return 0
  }, [valAuthLockStake, validatorId])

  return (
    <div>
    <div className="text-[14px] text-text-secondary whitespace-nowrap">{t("Max lock (Days)")}</div>
    <div className="text-base text-text whitespace-nowrap">
      {maxDuration}
    </div>
  </div>
  )
}