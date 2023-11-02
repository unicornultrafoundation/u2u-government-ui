import { Modal, modalScale } from "."
import { useTranslation } from "react-i18next"
import { Validation } from "../../types"
import { bigFormatEther, classNames, truncate } from "../../utils"
import { RenderNumberFormat } from "../text"

interface StakedValidatorModalProps {
  isOpenModal: boolean
  setIsOpenModal: (open: boolean) => void
  validations: Validation[]
  selected: Validation
  setSelected: (val: Validation) => void
}

export const StakedValidatorModal = ({
  isOpenModal,
  setIsOpenModal,
  validations,
  selected,
  setSelected
}: StakedValidatorModalProps) => {

  const { t } = useTranslation()
  

  return (
    <Modal isOpen={isOpenModal} scale={modalScale.md} setIsOpen={setIsOpenModal}>
      <div className="text-[24px] font-bold text-text text-center whitespace-nowrap">{t("Choose a Staked Validator")}</div>
      <div className="w-full mt-6 min-w-[400px]">
        {
          validations && validations.length > 0 && validations.map((row: Validation, index: number) => {
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
                  <div>
                    <div className="text-base font-semibold text-text whitespace-nowrap">{row.validator.name}</div>
                    <div className="flex gap-1 items-center text-text-secondary">
                      <span>{truncate({ str: row.validator.auth, headCount: 5, tailCount: 3 })}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-8">
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