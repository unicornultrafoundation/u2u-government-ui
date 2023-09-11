import { Web3ReactHooks, Web3ReactProvider } from "@web3-react/core"
import { ReactNode } from "react"
import { RefreshContextProvider } from "./context"
import { MetaMask } from "@web3-react/metamask"
import type { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2'

import { metaMask, metaMaskHooks } from "./utils/connectors/metamaskConnector"
import { walletConnectV2, walletConnectV2Hooks } from "./utils/connectors/walletConnectConnectorV2"

const connectors: [MetaMask | WalletConnectV2, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [walletConnectV2, walletConnectV2Hooks]
]

interface ProvidersProps {
  children: ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <Web3ReactProvider connectors={connectors}>
        <RefreshContextProvider>
          {children}
        </RefreshContextProvider>
    </Web3ReactProvider>
  )
}

export default Providers