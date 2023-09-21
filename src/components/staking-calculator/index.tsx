import { useCallback, useEffect, useState } from "react"
import { useDelegate } from "../../hooks"
import { Box } from "../box"
import { Button, ConnectWalletButton, buttonScale } from "../button"
import { Input, Select, SelectOption } from "../form"
import { RenderNumberFormat } from "../text"
import { DelegateParams, Validator } from "../../types"
import { useWeb3React } from "@web3-react/core"
import { toastDanger, toastSuccess } from "../toast"
import { useTranslation } from "react-i18next"
import { AmountSelection, SuggestionOptions } from "./AmountSelection"
import { APRCalculator } from "./APRCalculator"

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
  const [selection, setSelection] = useState<SelectOption[]>([])
  const [selected, setSelected] = useState<SelectOption | undefined>(undefined)
  const [amount, setAmount] = useState("")
  const [amountErr, setAmountErr] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [suggestOp, setSuggestOp] = useState<SuggestionOptions>(SuggestionOptions.NONE)

  const { account } = useWeb3React()
  const { degegate } = useDelegate()
  const adjustedFeeU2U = 0.1 // 0.1 U2U
  
  useEffect(() => {
    if (validators.length > 0) {
      let _options = validators.map((v: Validator, index: number) => {
        return {
          value: v,
          label: `Validator ${v.valId ? v.valId : ''}`,
          subLabel: `(${v.apr  ? `APR:${(v.apr).toFixed(2)}%` : ''} - ${v.votingPower  ? `Power:${(v.votingPower / 10000).toFixed(2)}%` : ''})`
        } as SelectOption
      })
      setSelection(_options)
      if (!selected || !selected.value || !selected.value.valId) {
        setSelected(_options[0])
      }
    }
    // eslint-disable-next-line
  }, [validators])

  const handleOnclickSuggest = useCallback((option: SuggestionOptions) => {
    try {
      if (option === suggestOp || Number(u2uBalance) < adjustedFeeU2U) {
        setSuggestOp(SuggestionOptions.NONE)
        setAmount('')
        validateAmount('')
      } else {
        setSuggestOp(option)
        let amountCalculated = 0;
        switch (option) {
          case SuggestionOptions.TWENTY_FIVE:
            amountCalculated = Number(u2uBalance) / 4;
            break
          case SuggestionOptions.FIFTY:
            amountCalculated = Number(u2uBalance) / 2;
            break
          case SuggestionOptions.SEVENTY_FIVE:
            amountCalculated = Number(u2uBalance) / 4 * 3;
            break
          case SuggestionOptions.MAX:
            amountCalculated = Number(u2uBalance) - adjustedFeeU2U
            break
        }
        setAmount(amountCalculated.toString());
        validateAmount(amountCalculated)
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
  }, [amount, selected])

  return (
    <div className="w-[550px]">
      <Box variant="gradient" className="pb-10">
        <div className="md:hidden w-[50px] h-[2px] bg-green mb-4 mt-6"></div>
        <div className="md:px-4 md:py-4 text-left">
          <div className="text-2xl text-black-2 font-medium mb-2">Staking Calculator</div>
          <div className="text-base text-gray">Your Balance:</div>
          <div className="text-base text-green">
            <RenderNumberFormat amount={u2uBalance} className="mr-2" />
            <span className="ml-2">U2U</span>
          </div>
          <div className="mt-6">
            <Input
              className="w-full"
              value={amount}
              type="number"
              label="Staking amount"
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
          <div className="text-base text-gray mb-3 mt-4">Validator</div>
          <Select
            options={selection}
            placeholder="Select validator"
            onChange={(option: any) =>{
              setSelected(option)
            }}
            selected={selected} />
          <div className="w-full h-[1px] bg-lightGray px-4 my-6"></div>
          <APRCalculator amount={Number(amount)} validator={selected && selected.value} />
          <div className="flex justify-center">
            {
              account ? (
                <Button loading={isLoading} className="w-full" scale={buttonScale.lg} onClick={onDelegate}>Delegate</Button>
              ) : (
                <ConnectWalletButton />
              )
            }
          </div>
        </div>
      </Box>
    </div>
  )
}