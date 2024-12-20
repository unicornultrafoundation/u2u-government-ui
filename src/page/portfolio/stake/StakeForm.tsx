import { useTranslation } from "react-i18next"
import { APRCalculator, AmountSelection, Button, ConnectWalletButton, RenderNumberFormat, SuggestionOptions, ValidatorStakeModal, buttonScale } from "../../../components"
import { useDelegate } from "../../../hooks"
import { Input } from "../../../components/form"
import {useCallback, useEffect, useState} from "react"
import { useValidatorStore } from "../../../store"
import { DelegateParams, Validator } from "../../../types"
import { toastDanger, toastSuccess } from "../../../components/toast"
import { ArrowDownIcon } from "../../../images"
import { BigNumber, ethers } from "ethers"
import { bigFormatEther } from "../../../utils"
import {useWeb3} from "../../../hooks/useWeb3";
import {SwitchNetworkButton} from "../../../components/switchNetwork";

export const StakeForm = () => {

  const { t } = useTranslation()
  const { address, balance, correctedChain } = useWeb3();
  const [amount, setAmount] = useState("")
  const [amountErr, setAmountErr] = useState("")
  const [suggestOp, setSuggestOp] = useState<SuggestionOptions>(SuggestionOptions.NONE)
  const adjustedFeeU2U = ethers.utils.parseEther("0.1") // 0.1 U2U
  const [allValidators] = useValidatorStore(state => [
    state.allValidators
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedValidator, setSelectedValidator] = useState<Validator>(allValidators.length > 0 ? allValidators[0] : {} as Validator)
  const [isShow, setIsShow] = useState(false)
  const { delegate, isSuccess, isError } = useDelegate()

  const handleOnclickSuggest = useCallback((option: SuggestionOptions) => {
    try {
      const _balance = ethers.utils.parseEther(String(balance));
      if (option === suggestOp || adjustedFeeU2U.gt(_balance)) {
        setSuggestOp(SuggestionOptions.NONE)
        setAmount('')
        validateAmount('')
      } else {
        setSuggestOp(option)
        let amountCalculated: any = 0;
        switch (option) {
          case SuggestionOptions.TWENTY_FIVE:
            amountCalculated = _balance.div(BigNumber.from(4));
            break
          case SuggestionOptions.FIFTY:
            amountCalculated = _balance.div(BigNumber.from(2));
            break
          case SuggestionOptions.SEVENTY_FIVE:
            amountCalculated = _balance.mul(BigNumber.from(3)).div(BigNumber.from(4));
            break
          case SuggestionOptions.MAX:
            amountCalculated = _balance.sub(adjustedFeeU2U)
            break
        }
        setAmount(bigFormatEther(amountCalculated));
        validateAmount(bigFormatEther(amountCalculated))
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
      amount: amount
    }
    try {
      await delegate(params)
    } catch (error) {
      console.log("error: ", error);
      toastDanger('Sorry! Delegate failed', t('Error'))
    } finally {
      setAmount('')
      setIsLoading(false)
    }
    // eslint-disable-next-line
  }, [amount, selectedValidator])

  useEffect(() => {
      if(isSuccess) {
        const msg = `Congratulation! Your amount has been delegated.`
        toastSuccess(msg, t('Success'))
      }
    if(isError) {
      toastDanger('Sorry! Delegate failed', t('Error'))
    }
  }, [isSuccess, isError, t]);


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
      <div className="border border-border-outline rounded-[8px] py-3 px-4 flex items-center gap-[10px] cursor-pointer justify-between" onClick={() => setIsShow(true)}>
        <div className="flex gap-[10px]">
          <img src={selectedValidator.avatar} alt="u2u" className="w-[24px] h-[24px]" />
          <div className="text-base font-semibold text-text text-left">{selectedValidator.name}</div>
        </div>
        <ArrowDownIcon />
      </div>
      <div className="mt-6">
        <APRCalculator amount={amount} validator={selectedValidator} />
      </div>
      <div className="flex justify-center">
        {
          address ? (
            <>
              {!correctedChain ? (
                  <SwitchNetworkButton />
              ) : (
                  <Button loading={isLoading} className="w-full" scale={buttonScale.lg} onClick={onDelegate}>{t("Stake")}</Button>
              )}
            </>
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

