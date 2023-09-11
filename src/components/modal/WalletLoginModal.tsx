import { useCallback } from "react"
import { Modal } from "."
import { walletConnectV2 } from "../../utils/connectors/walletConnectConnectorV2"
import { metaMask } from "../../utils/connectors/metamaskConnector"
import { useAuth } from "../../hooks"
import { ConnectorNames } from "../../utils"
import { useTranslation } from "react-i18next"
import MetaMaskLogo from "../../images/metamask-wallet.png"
import WalletConnectLogo from "../../images/icons/walletconnect.png"

interface WalletLoginModalProps {
  isOpenModal: boolean
  setIsOpenModal: (open: boolean) => void
}

export const WalletLoginModal = ({
  isOpenModal,
  setIsOpenModal
}: WalletLoginModalProps) => {

  const { t } = useTranslation()
  const { login } = useAuth()

  const connectMetaMask = useCallback(async () => {
    try {
      await login(ConnectorNames.MetaMaskLogin)
      setIsOpenModal(false)
    } catch (error) {
      console.log("Error", error)
    }
    // eslint-disable-next-line
  }, [metaMask])

  const walletConnect = useCallback(async () => {
    try {
      await login(ConnectorNames.WalletConnectV2Login)
      setIsOpenModal(false)
    } catch (error) {
      console.log("Error:: ", error)
    }
    // eslint-disable-next-line
  }, [walletConnectV2])

  return (
    <Modal isOpen={isOpenModal} scale="sm" setIsOpen={setIsOpenModal}>
      <div>
        <div className="text-2xl text-black-2 mb-10">{t('Connect Wallet')}</div>
      </div>
      <div className="flex justify-center gap-10">
        <div className="text-center">
          <div onClick={connectMetaMask} className="w-[100px] h-[100px] bg-light-1 flex items-center justify-center rounded-[10px] cursor-pointer">
            <img src={MetaMaskLogo} alt="u2u" className="w-[30px] h-[30px]" />
          </div>
          <div className="text-sm mt-2">Metamask</div>
        </div>
        <div className="text-center">
          <div onClick={walletConnect} className="w-[100px] h-[100px] bg-light-1 flex items-center justify-center rounded-[10px] cursor-pointer">
            <img src={WalletConnectLogo} alt="u2u" className="w-[30px] h-[30px]" />
          </div>
          <div className="text-sm mt-2">Walletconnect</div>
        </div>
      </div>

    </Modal>
  )
}