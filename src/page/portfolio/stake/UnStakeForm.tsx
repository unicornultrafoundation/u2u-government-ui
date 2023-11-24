import { useTranslation } from "react-i18next"
import { ArrowDownIcon, Images } from "../../../images"
import { Delegator, UnDelegateParams, Validation } from "../../../types"
import { useCallback, useMemo, useState } from "react"
import { AmountSelection, Button, ConnectWalletButton, RenderNumberFormat, StakedValidatorModal, SuggestionOptions, buttonScale } from "../../../components"
import { bigFormatEther } from "../../../utils"
import { Input } from "../../../components/form"
import { ethers } from "ethers"
import { useWeb3React } from "@web3-react/core"
import { useDelegator, useUndelegate } from "../../../hooks"
import { toastDanger, toastSuccess } from "../../../components/toast"

export const UnStakeForm = () => {

  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { delegatorState } = useDelegator()
  const { validations } = useMemo(() => delegatorState ? delegatorState : {} as Delegator, [delegatorState])
  const [isShow, setIsShow] = useState(false)
  const [selectedValidator, setSelectedValidator] = useState<Validation>(validations && validations.length > 0 ? validations[0] : {} as Validation)
  const [suggestOp, setSuggestOp] = useState<SuggestionOptions>(SuggestionOptions.NONE)
  const [isLoading, setIsLoading] = useState(false)
  const { undegegate } = useUndelegate()


  const [amount, setAmount] = useState("")
  const [amountErr, setAmountErr] = useState("")

  const validateAmount = useCallback((value: any) => {
    if (!value) {
      setAmountErr(t('This field is required'));
      return false;
    }
    if (Number(value) > Number(ethers.utils.formatEther(selectedValidator.actualStakedAmount))) {
      setAmountErr(t('Insufficient balance'));
      return false;
    }
    setAmountErr("")
    return true
  }, [selectedValidator, t])

  const handleOnclickSuggest = useCallback((option: SuggestionOptions) => {
    try {
      if (option === suggestOp || !selectedValidator.actualStakedAmount) {
        setSuggestOp(SuggestionOptions.NONE)
        setAmount('')
        validateAmount('')
      } else {
        setSuggestOp(option)
        let amountCalculated = 0;
        const balance = Number(ethers.utils.formatEther(selectedValidator.actualStakedAmount))
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
  }, [selectedValidator, suggestOp])

  const onUnDelegate = useCallback(async () => {
    if (!validateAmount(amount) ||
      !selectedValidator ||
      !selectedValidator.validator ||
      !selectedValidator.validator.valId) return;
    setIsLoading(true)
    const params: UnDelegateParams = {
      toValidatorID: Number(selectedValidator.validator.valId),
      amount: Number(amount)
    }
    try {
      const { status, transactionHash } = await undegegate(params)
      if (status === 1) {
        const msg = `Congratulation! Your staked amount has been undelegated.`
        toastSuccess(msg, t('Success'))
      } else {
        toastDanger('Sorry! Undelegate failed', t('Error'))
      }
      console.log("UnDelegate tx: ", transactionHash)
    } catch (error) {
      toastDanger('Sorry! Undelegate failed', t('Error'))
      console.log("error: ", error);
    }
    setIsLoading(false)
    setAmount('')
    setSuggestOp(SuggestionOptions.NONE)
    // eslint-disable-next-line
  }, [amount, selectedValidator])

  return (
    <div className="w-full">
      <div className="w-full flex justify-between mt-6 mb-2 flex-wrap">
        <div className="text-base text-text whitespace-nowrap">{t("Validator Staked")}</div>
      </div>
      <div className="justify-between border border-border-outline rounded-[8px] py-3 px-4 flex items-center gap-[10px] cursor-pointer" onClick={() => setIsShow(true)}>
        <div className="flex gap-[10px]">
          <img src={selectedValidator.validator ? selectedValidator.validator.avatar : Images.U2ULogoPNG} alt="u2u" className="w-[24px] h-[24px]" />
          <div className="text-base font-semibold text-text text-left">{selectedValidator.validator && selectedValidator.validator.name ? selectedValidator.validator.name : "No validator"}</div>
        </div>
        <ArrowDownIcon />
      </div>
      <div className="w-full flex justify-between mt-6 mb-2 flex-wrap">
        <div className="text-base text-text whitespace-nowrap">{t("Undelegate amount")}</div>
        <div className="flex gap-1">
          <div className="text-base text-text-secondary mr-1 whitespace-nowrap">{t("U2U available")}</div>
          <div className="text-base font-semibold text-primary">
            <RenderNumberFormat amount={bigFormatEther(selectedValidator.actualStakedAmount || 0) || 0} fractionDigits={4} />
          </div>
          <div className="text-base text-text">U2U</div>
        </div>
      </div>
      <div className="text-left">
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

      <div className="flex justify-center mt-10">
        {
          account ? (
            <Button loading={isLoading} className="w-full" scale={buttonScale.lg} onClick={onUnDelegate}>{t("Unstake")}</Button>
          ) : (
            <ConnectWalletButton />
          )
        }
      </div>
      <StakedValidatorModal
        isOpenModal={isShow}
        setIsOpenModal={setIsShow}
        validations={validations || []}
        selected={selectedValidator}
        setSelected={setSelectedValidator} />
    </div>
  )
}