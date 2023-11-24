import { Modal, modalScale } from "."
import { useTranslation } from "react-i18next"
import { LockedStake, UnlockStakeParams, Validator } from "../../types"
import { Images } from "../../images"
import { useCallback, useEffect, useMemo, useState } from "react"
import { RenderNumberFormat } from "../text"
import { bigFormatEther, dateToUTCString, truncate } from "../../utils"
import { Input } from "../form"
import { Button, buttonScale } from "../button"
import { useCalcPenalty, useUnlockStake } from "../../hooks"
import { toastDanger, toastSuccess } from "../toast"
import { AmountSelection, SuggestionOptions } from "../staking-calculator/AmountSelection"
import { useNavigate } from "react-router-dom"
import { useValidatorStore } from "../../store"

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
  const [suggestOp, setSuggestOp] = useState<SuggestionOptions>(SuggestionOptions.NONE)


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

  const handleOnclickSuggest = useCallback((option: SuggestionOptions) => {
    try {
      const balance = bigFormatEther(lockedAmount)
      if (option === suggestOp) {
        setSuggestOp(SuggestionOptions.NONE)
        setAmount('')
        validateAmount('')
      } else {
        setSuggestOp(option)
        let amountCalculated = 0;
        switch (option) {
          case SuggestionOptions.TWENTY_FIVE:
            amountCalculated = Number(balance) / 4;
            break
          case SuggestionOptions.FIFTY:
            amountCalculated = Number(balance) / 2;
            break
          case SuggestionOptions.SEVENTY_FIVE:
            amountCalculated = Number(balance) / 4 * 3;
            break
          case SuggestionOptions.MAX:
            amountCalculated = Number(balance)
            break
        }
        setAmount(amountCalculated.toString());
        validateAmount(amountCalculated)
      }
    } catch (error) {
      console.error(error)
    }
    // eslint-disable-next-line
  }, [lockedAmount, suggestOp])


  return (
    <Modal isOpen={isOpenModal} scale={modalScale.md} setIsOpen={setIsOpenModal}>
      <div className="text-[24px] font-bold text-text whitespace-nowrap">{t("Unlock Stake")}</div>
      <div className="w-full mt-6">
        {/* <div className="flex gap-4 items-center">
          <img src={Images.U2ULogoPNG} alt="u2u" />
          <div>{`Validator ${Number(lockStake.validatorId)}`}</div>
        </div> */}
        <RenderValidator validatorId={Number(lockStake.validatorId)}/>
      </div>
      <div className="w-full flex justify-between mt-6 mb-2 flex-wrap">
        <div className="text-base text-text">{t("Unlock amount")}</div>
        <div className="flex gap-1">
          <div className="text-base text-text-secondary mr-1">{t("U2U available")}</div>
          <div className="text-base font-semibold text-primary">
            <RenderNumberFormat amount={bigFormatEther(lockedAmount)} fractionDigits={8} />
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
      <AmountSelection handleOnclickSuggest={handleOnclickSuggest} suggestOp={suggestOp} />
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