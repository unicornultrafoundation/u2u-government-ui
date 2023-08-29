import { useTranslation } from "react-i18next"
import { Button, buttonType } from "../button"
import { useAuth } from "../../hooks"
import { ConnectorNames } from "../../utils"

export const Header = () => {
  const { t } = useTranslation()
  const { login } = useAuth()
  const connect = () => {
    login(ConnectorNames.Injected)
  }

  return (
    <div className="flex items-center w-full py-4">
      <div className="flex items-center justify-end w-full gap-4">
        <Button>{t('Validator Register')}</Button>
        <Button variant={buttonType.secondary} onClick={() => connect()}>{t('Connect Wallet')}</Button>
      </div>
    </div>
  )
}