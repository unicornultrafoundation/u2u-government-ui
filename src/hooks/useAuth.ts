import { useCallback } from "react"
import { ConnectorNames, connectorsByName } from "../utils"
import { appConfig, connectorLocalStorageKey } from "../contants"

export const useAuth = () => {
  const login = useCallback((connectorID: ConnectorNames) => {
    const connectors = connectorsByName[connectorID]
    const [connector, ] = connectors
    try {
      if (connector) {
        window.localStorage.setItem(connectorLocalStorageKey, connectorID);
        connector.activate(appConfig.chainID).catch(error => { })
      }
    } catch (error) { }
  }, [])

  const logout = useCallback((connectorID: ConnectorNames) => {
    const connectors = connectorsByName[connectorID]
    const [connector, ] = connectors
    if (connector?.deactivate) {
      void connector.deactivate()
    }
    window.localStorage.removeItem(connectorLocalStorageKey)
  }, [])

  return { login, logout }
}