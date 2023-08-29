import { Web3ReactProvider } from "@web3-react/core"
import { ReactNode } from "react"
import { getLibrary } from "./utils"

interface ProvidersProps {
  children: ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {children}
    </Web3ReactProvider>
  )
}

export default Providers