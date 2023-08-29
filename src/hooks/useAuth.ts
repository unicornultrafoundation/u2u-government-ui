import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core"
import { useCallback } from "react"
import { ConnectorNames, connectorsByName, setupNetwork } from "../utils"
import { connectorLocalStorageKey } from "../contants"
import { NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected } from "@web3-react/injected-connector"

export const useAuth = () => {
  const { activate, deactivate } = useWeb3React()
  const login = useCallback((connectorID: ConnectorNames) => {
    const connector = connectorsByName[connectorID]
    if (connector) {
      window.localStorage.setItem(connectorLocalStorageKey, connectorID);
      activate(connector, async (error: Error) => {
        if (error instanceof UnsupportedChainIdError) {
          const hasSetup = await setupNetwork()
          if (hasSetup) {
            activate(connector)
          }
        } else {
          window.localStorage.removeItem(connectorLocalStorageKey)
          if (error instanceof NoEthereumProviderError) {
            alert('Provider Error - No provider was found')
          } else if (error instanceof UserRejectedRequestErrorInjected) {
            alert('Authorization Error - Please authorize to access your account')
          } else {
            alert(error.name + '-' + error.message)
          }
        }
      })
    } else {
      alert("Can't find connector - The connector config is wrong");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const logout = useCallback(() => {
    window.localStorage.removeItem(connectorLocalStorageKey)
    deactivate()
  }, [deactivate])

  return { login, logout }
}