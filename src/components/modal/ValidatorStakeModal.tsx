import { Modal, modalScale } from "."
import { useTranslation } from "react-i18next"
import { Validator } from "../../types"
import { Images } from "../../images"
import { bigFormatEther, classNames, exploreAddress, truncate } from "../../utils"
import { RenderNumberFormat } from "../text"

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
    <Modal isOpen={isOpenModal} scale={modalScale.md} setIsOpen={setIsOpenModal}>
      <div className="text-[24px] font-bold text-text text-center whitespace-nowrap">{t("Choose a Validator")}</div>
      <div className="w-full mt-6 min-w-[500px]">
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
                  <img src={Images.U2ULogoPNG} className="w-[40px] h-[40px]" alt="u2u" />
                  <div>
                    <div className="text-base font-semibold text-text">{row.name}</div>
                    <a href={exploreAddress(row.auth)} target="_blank" rel="noopener noreferrer" className="flex gap-1 items-center justify-end text-primary">
                      <span>{truncate({ str: row.auth, headCount: 5, tailCount: 3 })}</span>
                    </a>
                  </div>
                </div>
                <div className="flex gap-8">
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