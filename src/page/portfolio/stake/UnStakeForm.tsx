import { useTranslation } from "react-i18next"
import { ArrowDownIcon, Images } from "../../../images"
import { Delegator, UnDelegateParams, Validation } from "../../../types"
import {useCallback, useEffect, useMemo, useState} from "react"
import { AmountSelection, Button, ConnectWalletButton, RenderNumberFormat, StakedValidatorModal, SuggestionOptions, buttonScale } from "../../../components"
import { bigFormatEther } from "../../../utils"
import { Input } from "../../../components/form"
import { useDelegator, useUndelegate } from "../../../hooks"
import { toastDanger, toastSuccess } from "../../../components/toast"
import { BigNumber, ethers } from "ethers"
import {useWeb3} from "../../../hooks/useWeb3";

export const UnStakeForm = () => {

  const { t } = useTranslation()
  const { address } = useWeb3();
  const { delegatorState } = useDelegator()
  const { validations } = useMemo(() => delegatorState ? delegatorState : {} as Delegator, [delegatorState])

  const validationsFilter = useMemo(() => {
    if (!validations || validations.length === 0) return [] 
    return validations.filter(i => (BigNumber.from(0)).lt(i.stakedAmount))
  }, [validations])

  const [isShow, setIsShow] = useState(false)
  const [selectedValidator, setSelectedValidator] = useState<Validation>(validationsFilter && validationsFilter.length > 0 ? validationsFilter[0] : {} as Validation)
  const [suggestOp, setSuggestOp] = useState<SuggestionOptions>(SuggestionOptions.NONE)
  const [isLoading, setIsLoading] = useState(false)
  const { undegegate, isError, isSuccess } = useUndelegate()

  const [amount, setAmount] = useState("")
  const [amountErr, setAmountErr] = useState("")

  const validateAmount = useCallback((value: any) => {
    if (!value) {
      setAmountErr(t('This field is required'));
      return false;
    }
    const parseValue =  ethers.utils.parseEther(value)
    if (parseValue.gt(selectedValidator.actualStakedAmount)) {
      setAmountErr(t('Insufficient balance'));
      return false;
    }
    setAmountErr("")
    return true
  }, [selectedValidator, t])

  const handleOnclickSuggest = useCallback((option: SuggestionOptions) => {
    try {
      const balance = selectedValidator.actualStakedAmount
      if (option === suggestOp) {
        setSuggestOp(SuggestionOptions.NONE)
        setAmount('')
        validateAmount('')
      } else {
        setSuggestOp(option)
        let amountCalculated: any = 0;
        switch (option) {
          case SuggestionOptions.TWENTY_FIVE:
            amountCalculated = balance.div(BigNumber.from(4));
            break
          case SuggestionOptions.FIFTY:
            amountCalculated = balance.div(BigNumber.from(2));
            break
          case SuggestionOptions.SEVENTY_FIVE:
            amountCalculated = balance.mul(BigNumber.from(3)).div(BigNumber.from(4));
            break
          case SuggestionOptions.MAX:
            amountCalculated = balance
            break
        }
        setAmount(bigFormatEther(amountCalculated));
        validateAmount(bigFormatEther(amountCalculated))
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
      amount: amount
    }
    try {
      await undegegate(params)
    } catch (error) {
      toastDanger('Sorry! Undelegate failed', t('Error'))
      console.log("error: ", error);
    } finally {
      setIsLoading(false)
      setAmount('')
      setSuggestOp(SuggestionOptions.NONE)
    }
    // eslint-disable-next-line
  }, [amount, selectedValidator])

  useEffect(() => {
    if (isError) {
      toastDanger('Sorry! Undelegate failed', t('Error'))
    }
    if (isSuccess) {
      toastSuccess('Congratulation! Your staked amount has been undelegated.', t('Success'))
    }
  }, [isError, isSuccess, t]);

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
          address ? (
            <Button loading={isLoading} className="w-full" scale={buttonScale.lg} onClick={onUnDelegate}>{t("Unstake")}</Button>
          ) : (
            <ConnectWalletButton />
          )
        }
      </div>
      <StakedValidatorModal
        isOpenModal={isShow}
        setIsOpenModal={setIsShow}
        validations={validationsFilter || []}
        selected={selectedValidator}
        setSelected={setSelectedValidator} />
    </div>
  )
}