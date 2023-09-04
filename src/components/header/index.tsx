import { useTranslation } from "react-i18next"
import { Button, buttonType } from "../button"
import { useAuth, useBalance } from "../../hooks"
import { ConnectorNames, exploreAddress, truncate } from "../../utils"
import { useWeb3React } from "@web3-react/core"
import MetamaskIcon from "../../images/metamask-wallet.png"
import { RenderNumberFormat } from "../text"
import { useNavigate } from "react-router-dom"


export const Header = () => {
  const { t } = useTranslation()
  const { login } = useAuth()
  const { account } = useWeb3React()
  const { balance } = useBalance()
  const navigate = useNavigate()

  const connect = () => {
    login(ConnectorNames.Injected)
  }


  return (
    <div className="flex items-center justify-end w-full py-4 gap-4">
      <Button className="w-[200px]" onClick={() => navigate("/validator/register")}>{t('Validator Register')}</Button>
      {
        account ? (
          <div className="flex justify-end">
            <div className="flex items-center p-3 bg-[#EBFCFB] rounded-lg gap-5 text-left">
              <img src={MetamaskIcon} alt="u2u" className="w-[35px] h-[35px]" />
              <div>
                <div className="text-base font-medium">
                  <RenderNumberFormat amount={balance} className="mr-2" /> U2U
                </div>
                <div className="text-xs text-green">
                  <a href={exploreAddress(account)} target="_blank" rel="noopener noreferrer">{truncate({ str: account })}</a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-end gap-4">
            <Button variant={buttonType.secondary} onClick={() => connect()}>{t('Connect Wallet')}</Button>
          </div>
        )
      }
    </div>
  )
}