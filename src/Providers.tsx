import { ReactNode } from "react"
import { RefreshContextProvider } from "./context"

import {WagmiProvider} from "wagmi";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {wagmiConfig} from "./contants/wagmi";
import {RainbowKitProvider} from "@rainbow-me/rainbowkit";


interface ProvidersProps {
  children: ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
    const queryClient = new QueryClient()
  return (
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    <RefreshContextProvider>
                      {children}
                    </RefreshContextProvider>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
  )
}

export default Providers