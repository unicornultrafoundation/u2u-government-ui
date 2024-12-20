import { useCallback, useEffect, useState } from "react"
import { useDelegate } from "../../hooks"
import { Button, ConnectWalletButton, buttonScale } from "../button"
import { Input, SelectOption } from "../form"
import { RenderNumberFormat } from "../text"
import { DelegateParams, Validator } from "../../types"
import { toastDanger, toastSuccess } from "../toast"
import { useTranslation } from "react-i18next"
import { AmountSelection, SuggestionOptions } from "./AmountSelection"
import { APRCalculator } from "./APRCalculator"
import { Images } from "../../images"
import { BigNumber, ethers } from "ethers"
import { bigFormatEther } from "../../utils"
import {useWeb3} from "../../hooks/useWeb3";
import {SwitchNetworkButton} from "../switchNetwork";

interface StakingCalculatorProps {
  validators: Validator[]
  balance: string
}

export const StakingCalculator = ({
  validators,
  balance: u2uBalance
}: StakingCalculatorProps) => {

  const { t } = useTranslation()
  // Local state
  const [selected, setSelected] = useState<SelectOption | undefined>(undefined)
  const [amount, setAmount] = useState("")
  const [amountErr, setAmountErr] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [suggestOp, setSuggestOp] = useState<SuggestionOptions>(SuggestionOptions.NONE)

  // const { account } = useWeb3React()
  const { address, correctedChain } = useWeb3();
  const { delegate, isSuccess, isError } = useDelegate()
  const adjustedFeeU2U = ethers.utils.parseEther("0.1") // 0.1 U2U

  useEffect(() => {
    if (validators.length > 0) {
      let _options = validators.map((v: Validator, index: number) => {
        return {
          value: v,
          label: `Validator ${v.valId ? v.valId : ''}`,
        } as SelectOption
      })
      if (!selected || !selected.value || !selected.value.valId) {
        setSelected(_options[0])
      }
    }
    // eslint-disable-next-line
  }, [validators])

  const handleOnclickSuggest = useCallback((option: SuggestionOptions) => {
    try {
      const _balance = ethers.utils.parseEther(u2uBalance);      

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
  }, [u2uBalance, suggestOp])


  const validateAmount = useCallback((value: any) => {
    if (!value) {
      setAmountErr(t('This field is required'));
      return false;
    }
    if (Number(value) > Number(u2uBalance)) {
      setAmountErr(t('Insufficient balance'));
      return false;
    }
    setAmountErr("")
    return true
  }, [u2uBalance, t])


  const onDelegate = useCallback(async () => {
    if (!validateAmount(amount) || !selected) return;
    setIsLoading(true)
    const params: DelegateParams = {
      toValidatorID: selected.value.valId,
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
  }, [amount, selected])

  useEffect(() => {
    if(isSuccess) {
      const msg = `Congratulation! Your amount has been delegated.`
      toastSuccess(msg, t('Success'))
    }
  }, [isSuccess, t]);

  useEffect(() => {
    if(isError) {
      toastDanger('Sorry! Delegate failed', t('Error'))
    }
  }, [isError, t]);

  return (
    <div className="text-left w-full py-8 px-10 bg-neutral-surface shadow-1 border border-border-outline rounded-[24px]">
      <div className="text-2xl font-bold text-text">{t("Staking Calculator")}</div>
      <div className="flex justify-between mt-6 mb-2">
        <div className="text-base text-text">{t("Staking amount")}</div>
        <div className="flex gap-1">
          <div className="text-base text-text-secondary mr-1">{t("U2U available")}</div>
          <div className="text-base font-semibold text-primary">
            <RenderNumberFormat amount={u2uBalance} />
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
      <div className="text-base text-text mb-2 mt-4">{t("Validator")}</div>
        <div className="border border-border-outline rounded-[8px] py-3 px-4 flex items-center gap-[10px] cursor-pointer">
        <img src={selected && selected.value ? selected.value.avatar : Images.U2ULogoPNG} alt="u2u" className="w-[24px] h-[24px]" />
        <div className="text-base font-semibold text-text text-left">{selected && selected.value ? selected.value.name : ""}</div>
      </div>
      <div className="mt-6">
        <APRCalculator amount={amount} validator={selected && selected.value} />
      </div>
      <div className="flex justify-center">
        {
          address ? (
              <>
                {
                  !correctedChain ? (
                      <SwitchNetworkButton />
                      ) : (
                      <Button loading={isLoading} className="w-full" scale={buttonScale.lg} onClick={onDelegate}>{t("Delegate")}</Button>
                  )
                }
              </>
          ) : (
            <ConnectWalletButton />
          )
        }
      </div>
    </div>
  )
}