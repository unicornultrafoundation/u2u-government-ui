import { useCallback, useMemo, useState } from "react"
import { Modal } from "../../modal"
import { useTranslation } from "react-i18next"
import { Input, Select, SelectOption } from "../../form"
import { Button, buttonScale, buttonType } from "../../button"
import { LockStakeParams, Validation } from "../../../types"
import { RenderNumberFormat } from "../../text"
import { useLockStake } from "../../../hooks"
import { toastDanger, toastSuccess } from "../../toast"
import { BigNumber } from "ethers"
import { bigFormatEther } from "../../../utils"
import { appConfig } from "../../../contants"

interface LockStakeModalProps {
  validation: Validation
  isOpenModal: boolean
  setIsOpenModal: (open: boolean) => void
  delegator: string
  actualStakedAmount: BigNumber
}

export const LockStakeModal = ({
  validation,
  isOpenModal,
  setIsOpenModal,
  delegator,
  actualStakedAmount
}: LockStakeModalProps) => {
  const { t } = useTranslation()
  const [amount, setAmount] = useState('')
  const [amountErr, setAmountErr] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selected, setSelected] = useState<SelectOption>(appConfig.lockStakeDuration[0])
  const { lockStake } = useLockStake()
  const {
    validator
  } = useMemo(() => validation, [validation])

  const { valId } = useMemo(() => validator, [validator])

  const validateAmount = useCallback((value: any) => {
    if (!value) {
      setAmountErr(t('This field is required'));
      return false;
    }
    if (Number(value) > Number(bigFormatEther(actualStakedAmount))) {
      setAmountErr(t('Your U2U staked not enough'));
      return false;
    }
    setAmountErr("")
    return true;
  }, [actualStakedAmount, t])

  const onLockStake = useCallback(async () => {
    if (!validateAmount(amount) || !valId || !selected) return;
    setIsLoading(true)
    const params: LockStakeParams = {
      toValidatorID: Number(valId),
      lockupDuration: selected.value,
      amount: Number(amount)
    }
    try {
      const { status, transactionHash } = await lockStake(params)
      if (status === 1) {
        const msg = `Congratulation! Your staked amount has been locked.`
        toastSuccess(msg, t('Success'))
        setIsOpenModal(false)
        setAmount('')
      } else {
        toastDanger('Sorry! Lock stake failed', t('Error'))
      }
      console.log("Lock tx: ", transactionHash)
    } catch (error) {
      console.log("error: ", error);
      toastDanger('Sorry! Lock stake failed', t('Error'))
    }
    setIsLoading(false)
    // eslint-disable-next-line
  }, [amount, valId, selected])

  return (
    <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
      <div className="text-2xl text-black-2 mb-2">{t('Lock Stake')}</div>
      <div className="text-base text-gray">Available lock amount:</div>
      <div className="text-base text-green">
        <RenderNumberFormat amount={actualStakedAmount && bigFormatEther(actualStakedAmount)} className="mr-2" fractionDigits={2} />
        U2U
      </div>

      <div className="text-base text-gray mb-3 mt-6">Validator</div>
      <Select
        options={appConfig.lockStakeDuration}
        placeholder="Select validator"
        onChange={(option: any) => setSelected(option)}
        selected={selected} />
      <div className="mt-4">
        <Input
          className="w-full"
          value={amount}
          type="number"
          label="Lock amount"
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
          className="w-full">{t('Lock Stake')}</Button>
        <Button
          scale={buttonScale.lg}
          variant={buttonType.secondary}
          onClick={() => setIsOpenModal(false)}
          className="w-full mt-4">{t('Cancel')}</Button>
      </div>
    </Modal>
  )
}