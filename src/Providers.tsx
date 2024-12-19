import { Web3ReactHooks } from "@web3-react/core"
import { ReactNode } from "react"
import { RefreshContextProvider } from "./context"
import { MetaMask } from "@web3-react/metamask"
import type { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2'

// import { metaMask, metaMaskHooks } from "./utils/connectors/metamaskConnector"
// import { walletConnectV2, walletConnectV2Hooks } from "./utils/connectors/walletConnectConnectorV2"
import {WagmiProvider} from "wagmi";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {wagmiConfig} from "./contants/wagmi";
import {RainbowKitProvider} from "@rainbow-me/rainbowkit";
//
// const connectors: [MetaMask | WalletConnectV2, Web3ReactHooks][] = [
//   [metaMask, metaMaskHooks],
//   [walletConnectV2, walletConnectV2Hooks]
// ]

interface ProvidersProps {
  children: ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
    const queryClient = new QueryClient()
  return (
    // <Web3ReactProvider connectors={connectors}>
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    <RefreshContextProvider>
                      {children}
                    </RefreshContextProvider>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
     // </Web3ReactProvider>
  )
}

export default Providers