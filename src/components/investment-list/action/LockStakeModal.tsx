import { useCallback, useMemo, useState } from "react"
import { Modal } from "../../modal"
import { useTranslation } from "react-i18next"
import { Input } from "../../form"
import { Button, buttonScale, buttonType } from "../../button"
import { LockStakeParams, Validation } from "../../../types"
import { RenderNumberFormat } from "../../text"
import { useLockStake, useLockupInfo } from "../../../hooks"
import { toastDanger, toastSuccess } from "../../toast"
import { BigNumber } from "ethers"
import { bigFormatEther } from "../../../utils"
import { Slider } from "@material-tailwind/react"
import { MIN_LOCKUP_DURATION } from "../../../contants"

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
  const [duration, setDuration] = useState(0)
  const [durationErr, setDurationErr] = useState("")
  const { lockStake } = useLockStake()
  const {
    validator
  } = useMemo(() => validation, [validation])
  const { valId, auth } = useMemo(() => validator, [validator])
  const { lockStakeInfo } = useLockupInfo(auth, Number(valId))

  let maxDuration = useMemo(() => {
    if (!lockStakeInfo || !lockStakeInfo.endTime) return 0
    const { endTime } = lockStakeInfo
    let now = Math.ceil((new Date()).getTime() / 1000)
    if (endTime < now) return 0
    let duration = Math.ceil((endTime - now) / 86400) - 1
    if (duration < MIN_LOCKUP_DURATION) return 0
    return duration
  }, [lockStakeInfo])

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

  const validateDuration = useCallback((value: any) => {
    if (Number(value) === 0) {
      setDurationErr(t('Lockup duration wrong'));
      return false;
    }
    setDurationErr("")
    return true
  }, [t])

  const onLockStake = useCallback(async () => {
    if (!validateDuration(duration) || !validateAmount(amount) || !valId) return;
    setIsLoading(true)
    const params: LockStakeParams = {
      toValidatorID: Number(valId),
      lockupDuration: duration * 86400,
      amount: Number(amount)
    }
    try {
      const { status, transactionHash } = await lockStake(params)
      if (status === 1) {
        const msg = `Congratulation! Your staked amount has been locked.`
        toastSuccess(msg, t('Success'))
        setIsOpenModal(false)
      } else {
        toastDanger('Sorry! Lock stake failed', t('Error'))
      }
      console.log("Lock tx: ", transactionHash)
    } catch (error) {
      console.log("error: ", error);
      toastDanger('Sorry! Lock stake failed', t('Error'))
    }
    setAmount('')
    setIsLoading(false)
    // eslint-disable-next-line
  }, [amount, valId, duration])

  return (
    <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
      <div className="text-2xl text-black-2 mb-2">{t('Lock Stake')}</div>
      <div className="text-base text-gray">Available lock amount:
        <span className="text-base text-green"><RenderNumberFormat amount={actualStakedAmount && bigFormatEther(actualStakedAmount)} className="mr-1 ml-2" fractionDigits={5} />U2U</span>
      </div>
      <div className="text-base text-gray">Max lockup duration: <span className="text-green">{maxDuration} {maxDuration <= 1 ? "day" : "days"}</span></div>
      <div className="text-base text-gray mb-3 mt-6">Lock duration: <span className="text-green">{duration} {duration <= 1 ? "day" : "days"}</span></div>
      <div>
        <Slider
          defaultValue={0}
          min={maxDuration > 0 ? MIN_LOCKUP_DURATION : 0}
          max={maxDuration}
          barClassName="bg-transparent"
          value={duration}
          onChange={(e) => {
            setDuration(Math.ceil(Number(e.target.value)))
            validateDuration(Math.ceil(Number(e.target.value)))
          }}
        />
      </div>{durationErr && <div className="text-sm text-error italic mt-2">{durationErr}</div>}
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