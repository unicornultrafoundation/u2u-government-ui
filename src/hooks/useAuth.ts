import { useCallback } from "react"
// import { ConnectorNames, connectorsByName, setupNetwork } from "../utils"
// import { appConfig, connectorLocalStorageKey } from "../contants"
import {Connector, useConnect, useDisconnect, useSwitchChain} from 'wagmi'
import { connect, ConnectorNotFoundError, SwitchChainNotSupportedError } from '@wagmi/core'
import {ACTIVE_CHAINID} from "../contants/chain";
import {wagmiConfig} from "../contants/wagmi";

export const useAuth = () => {
  // const login = useCallback(async (connectorID: ConnectorNames) => {
  //   const connectors = connectorsByName[connectorID]
  //   const [connector,] = connectors
  //   try {
  //     if (connector) {
  //       window.localStorage.setItem(connectorLocalStorageKey, connectorID);
  //       connector.activate(appConfig.chainID).catch(async (error: any) => {
  //         if (error.code === 4902) {
  //           await setupNetwork()
  //         }
  //       })
  //     }
  //   } catch (error) { }
  // }, [])

  // const logout = useCallback(() => {
  //   const connectorID = window.localStorage.getItem(connectorLocalStorageKey);
  //   if (connectorID) {
  //     try {
  //       const connectors = connectorsByName[connectorID as ConnectorNames]
  //       const [connector,] = connectors
  //       if (connector?.deactivate) {
  //         void connector.deactivate()
  //       } else {
  //         void connector.resetState()
  //       }
  //     } catch (error) {
  //
  //     }
  //   }
  //   window.localStorage.removeItem(connectorLocalStorageKey)
  // }, [])

  const { connectAsync, connectors } = useConnect()
  const { disconnectAsync, disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()

  const login = useCallback(
      async (connector: Connector) => {
        try {
          return connect(wagmiConfig, { connector });
        } catch (error) {
          if (error instanceof ConnectorNotFoundError) {
            console.log(error);
          }
          if (error instanceof SwitchChainNotSupportedError) {
            console.log('Unable to switch network. Please try it on your wallet');
          }
        }
        return undefined
      },
      [connectors, connectAsync],
  )

  const logout = useCallback(async () => {
    try {

      await disconnectAsync()
      return disconnect();
    } catch (error) {
      console.error(error)
    } finally {}
  }, [disconnectAsync, disconnect])

  const switchToNetwork = useCallback(async () => {
    try {
      switchChain && switchChain({chainId: ACTIVE_CHAINID})
    } catch (error) {
      console.error(error)
    } finally {}
  }, [switchChain])

  return { login, logout, switchToNetwork }

  return { login, logout }
}