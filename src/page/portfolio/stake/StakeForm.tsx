import { useTranslation } from "react-i18next"
import { APRCalculator, AmountSelection, Button, ConnectWalletButton, RenderNumberFormat, SuggestionOptions, ValidatorStakeModal, buttonScale } from "../../../components"
import { useBalance, useDelegate } from "../../../hooks"
import { Input } from "../../../components/form"
import { useCallback, useState } from "react"
import { useValidatorStore } from "../../../store"
import { DelegateParams, Validator } from "../../../types"
import { Images } from "../../../images"
import { useWeb3React } from "@web3-react/core"
import { toastDanger, toastSuccess } from "../../../components/toast"

export const StakeForm = () => {

  const { t } = useTranslation()
  const { balance } = useBalance()
  const { account } = useWeb3React()
  const [amount, setAmount] = useState("")
  const [amountErr, setAmountErr] = useState("")
  const [suggestOp, setSuggestOp] = useState<SuggestionOptions>(SuggestionOptions.NONE)
  const adjustedFeeU2U = 0.1 // 0.1 U2U
  const [allValidators] = useValidatorStore(state => [
    state.allValidators
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedValidator, setSelectedValidator] = useState<Validator>(allValidators.length > 0 ? allValidators[0] : {} as Validator)
  const [isShow, setIsShow] = useState(false)
  const { degegate } = useDelegate()

  const handleOnclickSuggest = useCallback((option: SuggestionOptions) => {
    try {
      if (option === suggestOp || Number(balance) < adjustedFeeU2U) {
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
            amountCalculated = Number(balance) - adjustedFeeU2U
            break
        }
        setAmount(amountCalculated.toString());
        validateAmount(amountCalculated)
      }
    } catch (error) {
      console.error(error)
    }
    // eslint-disable-next-line
  }, [balance, suggestOp])

  const validateAmount = useCallback((value: any) => {
    if (!value) {
      setAmountErr(t('This field is required'));
      return false;
    }
    if (Number(value) > Number(balance)) {
      setAmountErr(t('Insufficient balance'));
      return false;
    }
    setAmountErr("")
    return true
  }, [balance, t])

  const onDelegate = useCallback(async () => {
    if (!validateAmount(amount) || !selectedValidator) return;
    setIsLoading(true)
    const params: DelegateParams = {
      toValidatorID: Number(selectedValidator.valId),
      amount: Number(amount)
    }
    try {
      const { status, transactionHash } = await degegate(params)
      if (status === 1) {
        const msg = `Congratulation! Your amount has been delegated.`
        toastSuccess(msg, t('Success'))
      } else {
        toastDanger('Sorry! Delegate failed', t('Error'))
      }
      console.log("Delegate tx: ", transactionHash)
    } catch (error) {
      console.log("error: ", error);
      toastDanger('Sorry! Delegate failed', t('Error'))
    }
    setAmount('')
    setIsLoading(false)
    // eslint-disable-next-line
  }, [amount, selectedValidator])

  return (
    <div className="w-full">
      <div className="w-full flex justify-between mt-6 mb-2 flex-wrap">
        <div className="text-base text-text whitespace-nowrap">{t("Staking amount")}</div>
        <div className="flex gap-1 flex-wrap">
          <div className="text-base text-text-secondary mr-1 whitespace-nowrap">{t("U2U available")}</div>
          <div className="text-base font-semibold text-primary">
            <RenderNumberFormat amount={balance} />
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
          onInput={() => {
            setSuggestOp(SuggestionOptions.NONE)
          }}
          onChange={(e) => {
            const value = e.target.value
            validateAmount(value)
            setAmount(value)
          }}
        />
      </div>
      <AmountSelection handleOnclickSuggest={handleOnclickSuggest} suggestOp={suggestOp} />
      <div className="text-base text-text mb-2 mt-4 text-left">{t("Validator")}</div>
      <div className="border border-border-outline rounded-[8px] py-3 px-4 flex items-center gap-[10px] cursor-pointer" onClick={() => setIsShow(true)}>
        <img src={Images.U2ULogoPNG} alt="u2u" className="w-[24px] h-[24px]" />
        <div className="text-base font-semibold text-text text-left">{selectedValidator.name}</div>
      </div>
      <div className="mt-6">
        <APRCalculator amount={Number(amount)} validator={selectedValidator} />
      </div>
      <div className="flex justify-center">
        {
          account ? (
            <Button loading={isLoading} className="w-full" scale={buttonScale.lg} onClick={onDelegate}>{t("Delegate")}</Button>
          ) : (
            <ConnectWalletButton />
          )
        }
      </div>

      <ValidatorStakeModal
        isOpenModal={isShow}
        setIsOpenModal={setIsShow}
        validators={allValidators}
        selected={selectedValidator}
        setSelected={setSelectedValidator}
      />
    </div>
  )
}

