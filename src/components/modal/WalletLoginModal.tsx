import { useCallback } from "react"
import { Modal } from "."
import { useAuth } from "../../hooks"
import { ConnectorNames } from "../../utils"
import { useTranslation } from "react-i18next"
import { Images } from "../../images"
import {Connector, useConnect} from "wagmi";
import { WalletButton } from "@rainbow-me/rainbowkit"
import BitgetIcon from "../../images/bitget-wallet.png";

interface WalletLoginModalProps {
  isOpenModal: boolean
  setIsOpenModal: (open: boolean) => void
}

interface WalletOption {
  id: number
  name: string
  logo: any,
  connector: ConnectorNames
}

const wallets: WalletOption[] = [
  {
    id: 1,
    name: "MetaMask",
    logo: Images.MetamaskIcon,
    connector: ConnectorNames.MetaMaskLogin
  },
  {
    id: 2,
    name: "WalletConnect",
    logo: Images.WalletConnectLogo,
    connector: ConnectorNames.WalletConnectV2Login
  }
]

export const WalletLoginModal = ({
  isOpenModal,
  setIsOpenModal
}: WalletLoginModalProps) => {

  const { t } = useTranslation()
  const { connectors } = useConnect();
  const { login } = useAuth()

  const onLogin = useCallback(async (connector: Connector, connect?: () => Promise<void>) => {
    try {
      if (connect) {
        console.log(123123)
        return await connect();
      }
      await login(connector);
    } catch (error) {
      console.error('Error connecting wallet:', error)
    } finally {
      setIsOpenModal(false);
    }
  }, [])

  // const onConnect = useCallback(async (connectorName: ConnectorNames) => {
  //   try {
  //     await login(connectorName)
  //     setIsOpenModal(false)
  //   } catch (error) {
  //     console.log("Error:: ", error)
  //   }
  //   // eslint-disable-next-line
  // }, [])

  return (
    <Modal isOpen={isOpenModal} scale="md" setIsOpen={setIsOpenModal} onClose>
      <div className="text-2xl text-text-title font-bold mb-1">{t('Connect a wallet to continue')}</div>
      <div className="text-base text-text-secondary mb-3">{t("Choose how you want to connect. If you don't have a wallet, you can select a provider and create one.")}</div>
      <div className="mb-8">
        <div
             className={`flex gap-x-4 items-center p-6 rounded-xl border border-border-outline mb-3 cursor-pointer`}
             onClick={() => onLogin(connectors[0])}>
          <img src={Images.MetamaskIcon} alt="u2u" className="w-[32px] h-[32px]"/>
          <div className={`text-base font-semibold text-text-disabled`}>{connectors[0].name}</div>
        </div>
        {/*{*/}
        {/*  wallets.map((w: WalletOption, index: number) => {*/}
        {/*    return (*/}
        {/*        <div key={index}*/}
        {/*             className={`flex items-center gap-x-4 items-center p-6 rounded-xl border border-border-outline mb-3 cursor-pointer`}*/}
        {/*             onClick={() => onConnect(w.connector)}>*/}
        {/*          <img src={w.logo} alt="u2u" className="w-[32px] h-[32px]"/>*/}
        {/*          <div className={`text-base font-semibold text-text-disabled`}>{t(w.name)}</div>*/}
        {/*        </div>*/}
        {/*    )*/}
        {/*  })*/}
        {/*}*/}
        <WalletButton.Custom wallet="bitget">
          {({ ready, connect, connector }) => {
            return (
            <div
                 className={`flex gap-x-4 items-center p-6 rounded-xl border border-border-outline mb-3 cursor-pointer`}
                 onClick={() => onLogin(connector, connect)}>
              <img src={Images.BitgetIcon} alt="u2u" className="w-[32px] h-[32px]"/>
              <div className={`text-base font-semibold text-text-disabled`}>{connector.name}</div>
            </div>
          );
          }}
        </WalletButton.Custom>

        <WalletButton.Custom wallet="walletconnect">
          {({ ready, connect, connector }) => {
            return (
                <div
                    className={`flex items-center gap-x-4 p-6 rounded-xl border border-border-outline mb-3 cursor-pointer`}
                        onClick={connect}>
                  <img src={Images.WalletConnectLogo} alt="u2u" className="w-[32px] h-[32px]"/>
                  <div className={`text-base font-semibold text-text-disabled`}>{connector.name}</div>
                </div>
            );
          }}
        </WalletButton.Custom>


        {/*{*/}
        {/*  wallets.map((w: WalletOption, index: number) => {*/}
        {/*    return (*/}
        {/*        <div key={index}*/}
        {/*             className={`flex items-center gap-x-4 items-center p-6 rounded-xl border border-border-outline mb-3 cursor-pointer`}*/}
        {/*             onClick={() => onConnect(w.connector)}>*/}
        {/*          <img src={w.logo} alt="u2u" className="w-[32px] h-[32px]"/>*/}
        {/*          <div className={`text-base font-semibold text-text-disabled`}>{t(w.name)}</div>*/}
        {/*        </div>*/}
        {/*    )*/}
        {/*  })*/}
        {/*}*/}
      </div>
      <div className="text-xs text-text-secondary text-center">{t("By connecting a wallet, you agree to ")}
        <a className="text-primary" href="/" target="_blank">{t("Unicorn Ultra’s Terms of Service")}</a>
        <span>{t(' and ')}</span>
        <a className="text-primary" href="/" target="_blank">{t("Unicorn Ultra’s Privacy")}</a>
      </div>
    </Modal>
  )
}