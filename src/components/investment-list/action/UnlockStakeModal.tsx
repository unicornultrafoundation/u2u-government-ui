import { useCallback, useMemo, useState } from "react"
import { Modal } from "../../modal"
import { useTranslation } from "react-i18next"
import { Input } from "../../form"
import { Button, buttonScale, buttonType } from "../../button"
import { UnlockStakeParams, Validation } from "../../../types"
import { RenderNumberFormat } from "../../text"
import { useUnlockStake } from "../../../hooks"
import { toastDanger, toastSuccess } from "../../toast"

interface UnlockStakeModalProps {
  validation: Validation
  isOpenModal: boolean
  setIsOpenModal: (open: boolean) => void
  delegator: string
}

export const UnlockStakeModal = ({
  validation,
  isOpenModal,
  setIsOpenModal,
  delegator
}: UnlockStakeModalProps) => {
  const { t } = useTranslation()
  const [amount, setAmount] = useState('')
  const [amountErr, setAmountErr] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { unlockStake } = useUnlockStake()
  const {
    validator
  } = useMemo(() => validation, [validation])

  const { valId } = useMemo(() => validator, [validator])

  // TODO:
  const lockedStake = 0


  const validateAmount = useCallback((value: any) => {
    if (!value) {
      setAmountErr(t('This field is required'));
      return false;
    }
    if (Number(value) > Number(lockedStake)) {
      setAmountErr(t('Your U2U staked not enough'));
      return false;
    }
    setAmountErr("")
    return true;
  }, [lockedStake, t])

  const onLockStake = useCallback(async () => {
    if (!validateAmount(amount) || !valId) return;
    setIsLoading(true)
    const params: UnlockStakeParams = {
      toValidatorID: Number(valId),
      amount: Number(amount)
    }
    try {
      const { status, transactionHash } = await unlockStake(params)
      if (status === 1) {
        const msg = `Congratulation! Your locked amount has been unlocked.`
        toastSuccess(msg, t('Success'))
        setIsOpenModal(false)
        setAmount('')
      } else {
        toastDanger('Sorry! Unlock stake failed', t('Error'))
      }
      console.log("Lock tx: ", transactionHash)
    } catch (error) {
      console.log("error: ", error);
      toastDanger('Sorry! Unlock stake failed', t('Error'))
    }
    setIsLoading(false)
    // eslint-disable-next-line
  }, [amount, valId])

  return (
    <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
      <div className="text-2xl text-black-2 mb-2">{t('Unlock Stake')}</div>
      <div className="text-base text-gray">Locked amount:</div>
      <div className="text-base text-green">
        <RenderNumberFormat amount={lockedStake} className="mr-2" fractionDigits={2} />
        U2U
      </div>
      <div className="mt-4">
        <Input
          className="w-full"
          value={amount}
          type="number"
          label="Unlock amount"
          placeholder="Ex: 1000"
          error={!!amountErr}
          errorMessage={amountErr}
          onChange={(e) => {
            const value = e.target.value
            validateAmount(value)
            setAmount(value)
          }}
        />
      </div>
      <div className="mt-10">
        <Button
          scale={buttonScale.lg}
          onClick={() => onLockStake()}
          loading={isLoading}
          className="w-full">{t('Unlock Stake')}</Button>
        <Button
          scale={buttonScale.lg}
          variant={buttonType.secondary}
          onClick={() => setIsOpenModal(false)}
          className="w-full mt-4">{t('Cancel')}</Button>
      </div>
    </Modal>
  )
}