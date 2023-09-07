import { useCallback, useState } from "react"
import { Input } from "../form"
import { Box, Button, ConnectWalletButton, buttonScale } from "../index"
import { useWeb3React } from "@web3-react/core"
import { useTranslation } from "react-i18next"
import { CreateValidatorParams } from "../../types"
import { useCreateValidator } from "../../hooks"
import { isMobile } from 'mobile-device-detect';

export const ValidatorRegistrationComponent = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
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

  if (isMobile) {
    return (
      <div className="text-left">
        <div className="md:hidden w-[50px] h-[2px] bg-green mb-6"></div>
        <div className="text-[26px] text-black-2 mb-3">Validator Registration</div>
        <div className="text-base text-gray">Register with us to be one of the initial Validators. In the early stage of the project, Validators must be considered carefully, but that also comes with higher rewards</div>
        <Box className="mt-10 pb-10 pt-6">
          <div className="text-left">
            <div>
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
            <div className="mt-6">
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
                account ? (
                  <Button className="w-full" scale={buttonScale.lg} onClick={onRegister}>{t('Register')}</Button>
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


  return (
    <div className="w-[600px]">
      <Box variant="gradient">
        <div className="p-6 text-left">
          <div className="text-[26px] text-black-2 text-center mb-3">Validator Registration</div>
          <div className="text-base text-gray">Register with us to be one of the initial Validators. In the early stage of the project, Validators must be considered carefully, but that also comes with higher rewards</div>
          <div className="mt-14">
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
              account ? (
                <Button className="w-full" scale={buttonScale.lg} onClick={onRegister}>{t('Register')}</Button>
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