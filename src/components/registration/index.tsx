import { useCallback, useState } from "react"
import { Input } from "../form"
import { Button, ConnectWalletButton, buttonScale } from "../index"
import { useWeb3React } from "@web3-react/core"
import { useTranslation } from "react-i18next"
import { CreateValidatorParams } from "../../types"
import { useCreateValidator } from "../../hooks"
import { isMobile } from 'mobile-device-detect';
import { classNames } from "../../utils"
import {useWeb3} from "../../hooks/useWeb3";

export const ValidatorRegistrationComponent = () => {
  const { t } = useTranslation()
  // const { account } = useWeb3React()
  const { address } = useWeb3();
  const [pubKey, setPubKey] = useState("")
  const [amount, setAmount] = useState("")

  const { create } = useCreateValidator()

  const onRegister = useCallback(async () => {
    if (!pubKey || !amount) return
    const params: CreateValidatorParams = {
      pubkey: pubKey,
      amount: Number(amount)
    }
    try {
      const tx = await create(params)
      console.log("tx: ", tx);
    } catch (error) {
      console.log("error: ", error);
    }
    // eslint-disable-next-line
  }, [amount, pubKey])


  return (
    <div className="w-full px-4 flex justify-center">
    <div className={classNames(isMobile ? "w-full" : "w-[560px]", "bg-neutral-surface border-border-outline shadow-1 px-10 py-8 rounded-[24px]")} >
      <div className="text-[24px] font-bold text-text mb-4">{t("Validator Registration")}</div>
      <div className="text-base text-text-secondary text-left mb-6">{t("Register with us to be one of the initial Validators. In the early stage of the project, Validators must be considered carefully, but that also comes with higher rewards")}</div>
      <div className="">
        <Input
          className="w-full"
          value={pubKey}
          type="text"
          label="Public Key"
          placeholder="0xxxx"
          onChange={(e) => {
            const value = e.target.value
            setPubKey(value)
          }}
        />
      </div>
      <div className="mt-8">
        <Input
          className="w-full"
          value={amount}
          type="number"
          label="Your Delegation Amount (U2U)"
          placeholder="Ex.25.000"
          onChange={(e) => {
            const value = e.target.value
            setAmount(value)
          }}
        />
      </div>
      <div className="flex justify-center mt-10">
        {
          address ? (
            <Button className="w-full" scale={buttonScale.lg} onClick={onRegister}>{t('Register')}</Button>
          ) : (
            <ConnectWalletButton />
          )
        }
      </div>
    </div>
    </div>
  )
}