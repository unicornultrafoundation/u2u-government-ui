import { Web3ReactProvider } from "@web3-react/core"
import { ReactNode } from "react"
import { getLibrary } from "./utils"
import { RefreshContextProvider } from "./context"
import { ApolloProvider } from "@apollo/client"
import { apolloClient } from "./thegraph"

interface ProvidersProps {
  children: ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ApolloProvider client={apolloClient}>
        <RefreshContextProvider>
          {children}
        </RefreshContextProvider>
      </ApolloProvider>
    </Web3ReactProvider>
  )
}

export default Providers