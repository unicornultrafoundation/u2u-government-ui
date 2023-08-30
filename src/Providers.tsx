import { Web3ReactProvider } from "@web3-react/core"
import { ReactNode } from "react"
import { getLibrary } from "./utils"
import { RefreshContextProvider } from "./context"

interface ProvidersProps {
  children: ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <RefreshContextProvider>
        {children}
      </RefreshContextProvider>
    </Web3ReactProvider>
  )
}

export default Providers