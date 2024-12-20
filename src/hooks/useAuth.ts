import { useCallback } from "react"
import {Connector, useConnect, useDisconnect, useSwitchChain} from 'wagmi'
import { ConnectorNotFoundError, SwitchChainNotSupportedError } from '@wagmi/core'
import { U2U_CHAINID } from "../contants"

export const useAuth = () => {
  const { connectAsync } = useConnect()
  const { disconnectAsync, disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()

  const login = useCallback(
      async (connector: Connector) => {
        try {
          return connectAsync({ connector });
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
      [connectAsync],
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
      switchChain && switchChain({chainId: Number(U2U_CHAINID)})
    } catch (error) {
      console.error(error)
    } finally {}
  }, [switchChain])

  return { login, logout, switchToNetwork }

}