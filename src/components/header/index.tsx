import { useTranslation } from "react-i18next"
import { Button, buttonType } from "../button"
import { useAuth, useBalance } from "../../hooks"
import { ConnectorNames, truncate } from "../../utils"
import { useWeb3React } from "@web3-react/core"
import MetamaskIcon from "../../images/metamask-wallet.png"
import { RenderNumberFormat } from "../text"


export const Header = () => {
  const { t } = useTranslation()
  const { login } = useAuth()
  const { account } = useWeb3React()
  const { balance } = useBalance()
  const connect = () => {
    login(ConnectorNames.Injected)
  }

  return (
    <div className="flex items-center w-full py-4">
      {
        account ? (
          <div className="w-full flex justify-end">
            <div className="flex items-center p-3 bg-[#EBFCFB] rounded-lg gap-5">
              <img src={MetamaskIcon} alt="u2u" className="w-[35px] h-[35px]" />
              <div>
                <div className="text-left text-base font-medium">
                  <RenderNumberFormat amount={balance} className="mr-2" /> U2U
                </div>
                <div className="text-xs text-green">{truncate({ str: account })}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-end w-full gap-4">
            <Button>{t('Validator Register')}</Button>
            <Button variant={buttonType.secondary} onClick={() => connect()}>{t('Connect Wallet')}</Button>
          </div>
        )
      }
    </div>
  )
}