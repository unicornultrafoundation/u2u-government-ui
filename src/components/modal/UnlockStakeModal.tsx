import { Modal, modalScale } from "."
import { useTranslation } from "react-i18next"
import { LockedStake, UnlockStakeParams } from "../../types"
import { Images } from "../../images"
import { useCallback, useMemo, useState } from "react"
import { RenderNumberFormat } from "../text"
import { bigFormatEther, dateToUTCString } from "../../utils"
import { Input } from "../form"
import { Button, buttonScale } from "../button"
import { useCalcPenalty, useUnlockStake } from "../../hooks"
import { toastDanger, toastSuccess } from "../toast"

interface UnlockStakeModalProps {
  isOpenModal: boolean
  setIsOpenModal: (open: boolean) => void
  lockStake: LockedStake
}

export const UnlockStakeModal = ({
  isOpenModal,
  setIsOpenModal,
  lockStake
}: UnlockStakeModalProps) => {

  const { t } = useTranslation()

  const { lockedAmount, endTime, duration, validatorId } = useMemo(() => lockStake, [lockStake])
  const [amount, setAmount] = useState("")
  const [amountErr, setAmountErr] = useState("")
  const [loading, setLoading] = useState(false)
  const [penalty, setPennalty] = useState("0")

  const { unlockStake } = useUnlockStake()
  const { calcPen } = useCalcPenalty()

  const handleInput = useCallback(async (value: any) => {
    const _pen = await calcPen(validatorId ? Number(validatorId) : 0, Number(value), lockedAmount)
    setPennalty(bigFormatEther(_pen || 0))
     // eslint-disable-next-line
  }, [lockedAmount, validatorId])



  const validateAmount = useCallback((value: any) => {
    if (!value) {
      setAmountErr(t('This field is required'));
      return false;
    }
    if (Number(value) > Number(bigFormatEther(lockedAmount))) {
      setAmountErr(t('Insufficient balance'));
      return false;
    }
    setAmountErr("")
    return true
  }, [lockedAmount, t])

  const onUnLockStake = useCallback(async () => {
    if (!validateAmount(amount) || !validatorId) return;
    setLoading(true)
    const params: UnlockStakeParams = {
      toValidatorID: Number(validatorId),
      amount: Number(amount)
    }
    try {
      const { status, transactionHash } = await unlockStake(params)
      if (status === 1) {
        const msg = `Congratulation! Your locked amount has been unlocked.`
        toastSuccess(msg, t('Success'))
        setIsOpenModal(false)
      } else {
        toastDanger('Sorry! Unlock stake failed', t('Error'))
      }
      console.log("Lock tx: ", transactionHash)
    } catch (error) {
      console.log("error: ", error);
      toastDanger('Sorry! Unlock stake failed', t('Error'))
    }
    setLoading(false)
    setAmount('')
    // eslint-disable-next-line
  }, [amount, validatorId])


  return (
    <Modal isOpen={isOpenModal} scale={modalScale.md} setIsOpen={setIsOpenModal}>
      <div className="text-[24px] font-bold text-text whitespace-nowrap">{t("Unlock Stake")}</div>
      <div className="w-full mt-6">
        <div className="flex gap-4 items-center">
          <img src={Images.U2ULogoPNG} alt="u2u" />
          <div>{`Validator ${Number(lockStake.validatorId)}`}</div>
        </div>
      </div>
      <div className="w-full flex justify-between mt-6 mb-2 flex-wrap">
        <div className="text-base text-text">{t("Unlock amount")}</div>
        <div className="flex gap-1">
          <div className="text-base text-text-secondary mr-1">{t("U2U available")}</div>
          <div className="text-base font-semibold text-primary">
            <RenderNumberFormat amount={bigFormatEther(lockedAmount)} />
          </div>
          <div className="text-base text-text">U2U</div>
        </div>
      </div>
      <div>
        <Input
          className="w-full"
          value={amount}
          type="number"
          placeholder={"Ex: 10000"}
          error={!!amountErr}
          errorMessage={amountErr}
          onChange={(e) => {
            const value = e.target.value
            validateAmount(value)
            setAmount(value)
            handleInput(value)
          }}
        />
      </div>
      <div className="w-full flex justify-between mt-4 mb-2 flex-wrap">
        <div className="text-base text-text">{t("Penalty")}</div>
        <div className="flex gap-1">
          <div className="text-base font-semibold text-error">
          <RenderNumberFormat amount={penalty} fractionDigits={6} />
          </div>
          <div className="text-base text-text">U2U</div>
        </div>
      </div>
      <div className="w-full flex justify-between mt-4 mb-2 flex-wrap">
        <div className="text-base text-text whitespace-nowrap">{t("End time")}</div>
        <div className="flex gap-1">
          <div className="text-base font-semibold text-text whitespace-nowrap">
            {dateToUTCString(endTime)}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between mt-4 mb-2 flex-wrap">
        <div className="text-base text-text whitespace-nowrap">{t("Duration")}</div>
        <div className="flex gap-1">
          <div className="text-base font-semibold text-text">
            {duration / 86400000}
          </div>
          <div className="text-base text-text">days</div>
        </div>
      </div>
      <div className="flex justify-center mt-10">
      <Button loading={loading} className="w-full" scale={buttonScale.lg} onClick={onUnLockStake}>{t("UnLock")}</Button>
      </div>
    </Modal>
  )
}