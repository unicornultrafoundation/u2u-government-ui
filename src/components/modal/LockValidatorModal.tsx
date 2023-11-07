import { Modal, modalScale } from "."
import { useTranslation } from "react-i18next"
import { Validation } from "../../types"
import { bigFormatEther, classNames, truncate } from "../../utils"
import { RenderNumberFormat } from "../text"
import { MIN_LOCKUP_DURATION } from "../../contants"

interface LockValidatorModallProps {
  isOpenModal: boolean
  setIsOpenModal: (open: boolean) => void
  validations: Validation[]
  selected: Validation
  setSelected: (val: Validation) => void
}

export const LockValidatorModal = ({
  isOpenModal,
  setIsOpenModal,
  validations,
  selected,
  setSelected
}: LockValidatorModallProps) => {

  const { t } = useTranslation()

  return (
    <Modal isOpen={isOpenModal} scale={modalScale.md} setIsOpen={setIsOpenModal}>
      <div className="text-[24px] font-bold text-text text-center whitespace-nowrap">{t("Choose a Staked Validator")}</div>
      <div className="w-full mt-6 min-w-[500px]">
        {
          validations && validations.length > 0 && validations.map((row: Validation, index: number) => {

            let maxDuration = () => {
              if (!row.validator || !row.validator.authLockInfo) return 0
              const _endTime  = row.validator.authLockInfo.endTime
              let now = Math.ceil((new Date()).getTime())
              if (_endTime < now) return 0
              let duration = Math.ceil((_endTime - now) / 86400000) - 1
              if (duration < MIN_LOCKUP_DURATION) return 0
              return duration
            }
            return (
              <div className={classNames(
                "flex px-4 py-2 items-center justify-between border border-border-outline rounded-[8px] mb-2 cursor-pointer hover:bg-neutral-surface-hover",
                selected.id === row.id ? "bg-neutral-surface-hover" : "")}
                key={index}
                onClick={() => {
                  setSelected(row)
                  setIsOpenModal(false)
                }}>
                <div className="flex gap-4 items-center whitespace-nowrap">
                  <img src={row.validator.avatar} className="w-[40px] h-[40px]" alt="u2u" />
                  <div className="text-left">
                    <div className="text-base font-semibold text-text whitespace-nowrap">{row.validator.name}</div>
                    <div className="flex gap-1 items-center text-text-secondary">
                      <span>{truncate({ str: row.validator.auth, headCount: 5, tailCount: 3 })}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-8">
                <div>
                    <div className="text-[14px] text-text-secondary whitespace-nowrap">{t("Max lock (Days)")}</div>
                    <div className="text-base text-text">
                      {maxDuration()}
                    </div>
                  </div>
                  <div>
                    <div className="text-[14px] text-text-secondary whitespace-nowrap">{t("Your Staked (U2U)")}</div>
                    <div className="text-base text-text text-right">
                      <RenderNumberFormat amount={bigFormatEther(row.actualStakedAmount || 0) || 0} fractionDigits={4} />
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