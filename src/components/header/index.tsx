import { useTranslation } from "react-i18next"
import { Button, buttonType } from "../button"

export const Header = () => {
  const { t } = useTranslation()
  return (
    <div className="flex items-center w-full py-4">
      <div className="flex items-center justify-end w-full gap-4">
        <Button>{t('Validator Register')}</Button>
        <Button variant={buttonType.secondary}>{t('Connect Wallet')}</Button>
      </div>
    </div>
  )
}