import { useEffect } from "react"
import { useAppStore } from "../store"
import { useTranslation } from "react-i18next"

export const useChangeLanguage = () => {
  const { i18n } = useTranslation()
  const [lng] = useAppStore(state => [
    state.lng
  ])
  useEffect(() => {
    i18n.changeLanguage(lng);
    // eslint-disable-next-line 
  }, [lng])
}