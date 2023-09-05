import { useCallback, useMemo, useState } from "react"
import { Modal } from "../../modal"
import { useTranslation } from "react-i18next"
import { Input } from "../../form"
import { Button, buttonScale, buttonType } from "../../button"
import { UnDelegateParams, Validation } from "../../../types"
import { RenderNumberFormat } from "../../text"
import { bigFormatEther } from "../../../utils"
import { useUndelegate } from "../../../hooks"
import { toastDanger, toastSuccess } from "../../toast"

interface UndelegateModalProps {
  validation: Validation
  isOpenModal: boolean
  setIsOpenModal: (open: boolean) => void
}

export const UndelegateModal = ({
  validation,
  isOpenModal,
  setIsOpenModal
}: UndelegateModalProps) => {
  const { t } = useTranslation()
  const [amount, setAmount] = useState('')
  const [amountErr, setAmountErr] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { undegegate } = useUndelegate()

  const {
    stakedAmount,
    validator
  } = useMemo(() => validation, [validation])

  const { valId } = useMemo(() => validator, [validator])

  const validateAmount = useCallback((value: any) => {
    if (!value) {
      setAmountErr(t('This field is required'));
      return false;
    } 
    if (Number(value) > Number(bigFormatEther(stakedAmount))) {
      setAmountErr(t('Your U2U staked not enough'));
      return false;
    }
    setAmountErr("")
    return true;
  }, [stakedAmount, t])

  const onUnDelegate = useCallback(async () => {
    if (!validateAmount(amount) || !valId) return; 
    setIsLoading(true)
    const params: UnDelegateParams = {
      toValidatorID: Number(valId),
      amount: Number(amount)
    }
    try {
      const {status, transactionHash} = await undegegate(params)
      if (status === 1) {
        const msg = `Congratulation! Your staked amount has been undelegated.`
        toastSuccess(msg, t('Success'))
        setIsOpenModal(false)
        setAmount('')
      } else {
        toastDanger('Sorry! Undelegate failed', t('Error'))
      }
      console.log("UnDelegate tx: ", transactionHash)
    } catch (error) {
      console.log("error: ", error);
    }
    setIsLoading(false)
    // eslint-disable-next-line
  }, [amount, valId])

  return (
    <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
      <div className="text-2xl text-black-2 mb-2">{t('Undelegate')}</div>
      <div className="text-base text-gray">Your staked:</div>
      <div className="text-base text-green">
        <RenderNumberFormat amount={bigFormatEther(stakedAmount)} className="mr-2" fractionDigits={2} />
        U2U
      </div>
      <div className="mt-6">
        <Input
          className="w-full"
          value={amount}
          type="number"
          label="Undelegate amount"
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
          onClick={() => onUnDelegate()}
          loading={isLoading}
          className="w-full">{t('Undelegate')}</Button>
        <Button
          scale={buttonScale.lg}
          variant={buttonType.secondary}
          onClick={() => setIsOpenModal(false)}
          className="w-full mt-4">{t('Cancel')}</Button>
      </div>
    </Modal>
  )
}