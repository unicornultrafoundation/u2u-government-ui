import { useTranslation } from "react-i18next"
import { Images } from "../../../images"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Delegator, Validation } from "../../../types"
import { useDelegator, useLockStake, useRelockStake } from "../../../hooks"
import { AmountSelection, Button, ConnectWalletButton, LockValidatorModal, RenderNumberFormat, SliderComponent, SuggestionOptions, buttonScale } from "../../../components"
import { bigFormatEther } from "../../../utils"
import { MIN_LOCKUP_DURATION } from "../../../contants"
import { useWeb3React } from "@web3-react/core"
import { toastDanger, toastSuccess } from "../../../components/toast"
import { ethers } from "ethers"
import { QueryService } from "../../../thegraph"
import { Input } from "../../../components/form"

export const LockForm = () => {

  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { delegatorState } = useDelegator()
  const { validations } = useMemo(() => delegatorState ? delegatorState : {} as Delegator, [delegatorState])
  const [selectedValidator, setSelectedValidator] = useState<Validation>(validations && validations.length > 0 ? validations[0] : {} as Validation)
  const [isShow, setIsShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [amountErr, setAmountErr] = useState('')
  const [durationErr, setDurationErr] = useState("")
  const { relockStake } = useRelockStake()
  const { lockStake } = useLockStake()
  const [suggestOp, setSuggestOp] = useState<SuggestionOptions>(SuggestionOptions.NONE)
  const adjustedFeeU2U = 0.0000001


  let maxDuration = useMemo(() => {
    if (!selectedValidator || !selectedValidator.validator || !selectedValidator.validator.authLockInfo) return 0
    const endTime = selectedValidator.validator.authLockInfo.endTime
    let now = Math.ceil((new Date()).getTime())
    if (endTime < now) return 0
    let duration = Math.ceil((endTime - now) / 86400000)
    if (duration < MIN_LOCKUP_DURATION) return 0
    return duration
  }, [selectedValidator])

  const [durationSlideValue, setDurationSlideValue] = useState(0)

  const [stakeAmount, setstakeAmount] = useState("")
  const stakeDuration = useMemo(() => {
    return Math.round(durationSlideValue * maxDuration / 100)
  }, [durationSlideValue, maxDuration])

  const [apr, setApr] = useState(0)


  useEffect(() => {    
    (async () => {
      if (selectedValidator && selectedValidator.validator) {
        try {
          const valIds: number[] = [Number(selectedValidator.validator.valId)]
          const amountDec = ethers.utils.parseEther(stakeAmount.toString()).toString();
          const duration = stakeDuration * 24 * 60 * 60
          let total = 0;
          if (valIds && amountDec) {
            const { data: dataApr } = await QueryService.queryValidatorsApr(valIds, amountDec, duration)
            for (let i = 0; i < valIds.length; ++i) {
              total += Number(dataApr[`apr${valIds[i]}`])
            }
            const _apr = total / valIds.length
            setApr(_apr)
          } else {
            setApr(0)
          }
        } catch (error) { }
      }
    })()
  }, [selectedValidator, stakeAmount, stakeDuration])

  const validateDuration = useCallback((value: any) => {
    if (Number(value) === 0) {
      setDurationErr(t('Lockup duration wrong'));
      return false;
    }
    setDurationErr("")
    return true
  }, [t])

  const validateAmount = useCallback((value: any) => {
    if (!value) {
      setAmountErr(t('This field is required'));
      return false;
    }
    setAmountErr("")
    return true;
  }, [t])


  const onLockStake = useCallback(async () => {
    if (!validateDuration(stakeDuration) || !validateAmount(stakeAmount) || !selectedValidator || !selectedValidator.validator.valId) return;
    setIsLoading(true)
    const params: any = {
      toValidatorID: Number(selectedValidator.validator.valId),
      lockupDuration: stakeDuration * 86400,
      amount: Number(stakeAmount)
    }
    try {
      const _isLocked = selectedValidator.validator && selectedValidator.validator.authLockInfo && selectedValidator.validator.authLockInfo.isLockedUp
      const { status, transactionHash } = _isLocked ? await relockStake(params) : await lockStake(params)
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
    setIsLoading(false)
    setstakeAmount('')
    setDurationSlideValue(0)
    // eslint-disable-next-line
  }, [stakeAmount, selectedValidator, stakeDuration])

  const handleOnclickSuggest = useCallback((option: SuggestionOptions) => {
    try {
      const balance = Number(bigFormatEther(selectedValidator.actualStakedAmount || 0))
      if (option === suggestOp || Number(balance) < adjustedFeeU2U) {
        setSuggestOp(SuggestionOptions.NONE)
        setstakeAmount('')
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
            amountCalculated = Number(balance) - adjustedFeeU2U
            break
        }
        setstakeAmount(amountCalculated.toString());
        validateAmount(amountCalculated)
      }
    } catch (error) {
      console.error(error)
    }
    // eslint-disable-next-line
  }, [selectedValidator, suggestOp])

  return (
    <div className="w-full">
      <div className="w-full flex justify-between mt-6 mb-2">
        <div className="text-base text-text">{t("Validator Staked")}</div>
      </div>
      <div className="border border-border-outline rounded-[8px] py-3 px-4 flex items-center gap-[10px] cursor-pointer" onClick={() => setIsShow(true)}>
        <img src={Images.U2ULogoPNG} alt="u2u" className="w-[24px] h-[24px]" />
        <div className="text-base font-semibold text-text text-left">{selectedValidator.validator && selectedValidator.validator.name ? selectedValidator.validator.name : "No validator"}</div>
      </div>
      <div className="w-full flex justify-between mt-6 mb-2 flex-wrap">
        <div className="text-base text-text whitespace-nowrap">{t("Lock amount")}</div>
        <div className="flex gap-1 flex-wrap">
          <div className="text-base text-text-secondary mr-1 whitespace-nowrap">{t("U2U available")}</div>
          <div className="text-base font-semibold text-primary">
          <RenderNumberFormat amount={Number(bigFormatEther(selectedValidator.actualStakedAmount || 0))} fractionDigits={6} /><span className="ml-1">U2U</span>
          </div>
        </div>
      </div>
      <div>
        <Input
          className="w-full"
          value={stakeAmount}
          type="number"
          placeholder={"Ex: 10000"}
          error={!!amountErr}
          errorMessage={amountErr}
          onInput={() => {
            setSuggestOp(SuggestionOptions.NONE)
          }}
          onChange={(e) => {
            const value = e.target.value
            validateAmount(value)
            setstakeAmount(value)
          }}
        />
      </div>
      <AmountSelection handleOnclickSuggest={handleOnclickSuggest} suggestOp={suggestOp} />
      <div className="w-full flex justify-between mt-4 mb-4">
        <div className="text-base text-text">{t("Lock duration")}</div>
        <div className="flex gap-1">
          <div className="text-base font-semibold text-primary">
            <RenderNumberFormat amount={stakeDuration} fractionDigits={0} />
          </div>
          <div className="text-base text-text">Days</div>
        </div>
      </div>
      {amountErr && <div className="text-sm text-error italic mt-2 text-left mb-4">{amountErr}</div>}
      <SliderComponent
        value={durationSlideValue}
        defaultValue={0}
        onChange={(e) => {
          setDurationSlideValue(Number(e.target.value))
        }} />
      <div className="flex justify-between mt-4">
        <div className="text-sm text-text-secondary">0</div>
        <div className="text-sm text-text-secondary">
          {maxDuration}<span className="ml-1">Days</span>
        </div>
      </div>
      {durationErr && <div className="text-sm text-error italic mt-2 text-left">{durationErr}</div>}
      <div className="flex justify-between mt-4">
        <div className="text-sm text-text-secondary">{t("Estimated APR(%)")}</div>
        <div className="text-sm text-text-secondary">
        <RenderNumberFormat amount={apr} fractionDigits={2} />
        </div>
      </div>
      <div className="flex justify-center mt-10">
        {
          account ? (
            <Button loading={isLoading} className="w-full" scale={buttonScale.lg} onClick={onLockStake}>{t("Lock")}</Button>
          ) : (
            <ConnectWalletButton />
          )
        }
      </div>
      <LockValidatorModal
        isOpenModal={isShow}
        setIsOpenModal={setIsShow}
        validations={validations || []}
        selected={selectedValidator}
        setSelected={setSelectedValidator} />
    </div>
  )
}

function setIsOpenModal(arg0: boolean) {
  throw new Error("Function not implemented.")
}
