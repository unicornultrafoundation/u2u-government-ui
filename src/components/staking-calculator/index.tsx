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

interface StakingCalculatorProps {
  validators: Validator[]
  balance: string
}

export const StakingCalculator = ({
  validators,
  balance
}: StakingCalculatorProps) => {

  const { t } = useTranslation()
  const [selection, setSelection] = useState<SelectOption[]>([])
  const [selected, setSelected] = useState<SelectOption>({} as SelectOption)
  const [amount, setAmount] = useState("")
  const { account } = useWeb3React()

  const { degegate } = useDelegate()

  useEffect(() => {
    if (validators.length > 0) {
      let _options = validators.map((v: Validator, index: number) => {
        return {
          value: v,
          label: `Validator ${v.valId}`
        } as SelectOption
      })
      setSelection(_options)
      setSelected(_options[0])
    }
  }, [validators])



  const onDelegate = useCallback(async () => {
    if (!amount || !selected) return;
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
    // eslint-disable-next-line
  }, [amount, selected])

  return (
    <div className="w-[550px]">
      <Box variant="gradient">
        <div className="px-4 py-4 text-left">
          <div className="text-2xl text-black-2 font-medium mb-2">Staking Calculator</div>
          <div className="text-base text-gray">Your Balance:</div>
          <div className="text-base text-green">
            <RenderNumberFormat amount={balance} className="mr-2" />
            U2U
          </div>
          <div className="mt-6">
            <Input
              className="w-full"
              value={amount}
              type="number"
              label="Staking amount"
              placeholder={"Ex: 10000"}
              onChange={(e) => {
                const value = e.target.value
                setAmount(value)
              }}
            />
          </div>
          <div className="grid grid-cols-4 gap-4 mt-4">
            <button className="text-sm rounded-lg bg-silver py-2 cursor-pointer text-gray">25%</button>
            <button className="text-sm rounded-lg bg-silver py-2 cursor-pointer text-gray">50%</button>
            <button className="text-sm rounded-lg bg-silver py-2 cursor-pointer text-gray">75%</button>
            <button className="text-sm rounded-lg bg-silver py-2 cursor-pointer text-gray">100%</button>
          </div>
          <div className="text-base text-gray mb-3 mt-4">Validator</div>
          <Select
            options={selection}
            placeholder="Select validator"
            setSelected={setSelected}
            selected={selected} />
          <div className="w-full h-[1px] bg-lightGray px-4 my-6"></div>
          <div className="mb-6">
            <div className="flex justify-between">
              <div className="text-sm text-black">APR(%)</div>
              <div className="text-sm text-black">NaN U2U</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm text-black">30 days</div>
              <div className="text-sm text-black">NaN U2U</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm text-black">90 days</div>
              <div className="text-sm text-black">NaN U2U</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm text-black">180 days</div>
              <div className="text-sm text-black">NaN U2U</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm text-black">365 days</div>
              <div className="text-sm text-black">NaN U2U</div>
            </div>
          </div>
          <div className="flex justify-center">
            {
              account ? (
                <Button className="w-full" scale={buttonScale.lg} onClick={onDelegate}>Delegate</Button>
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