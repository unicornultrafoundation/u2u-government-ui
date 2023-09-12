import { initializeConnector } from '@web3-react/core'
import { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2'
import { WALLET_CONNECT_KEY, appConfig } from '../../contants'

export const [walletConnectV2, walletConnectV2Hooks] = initializeConnector<WalletConnectV2>(
  (actions) =>
    new WalletConnectV2({
      actions,
      options: {
        projectId: WALLET_CONNECT_KEY,
        chains: [appConfig.chainID],
        optionalChains: [appConfig.chainID],
        showQrModal: true,
        rpcMap: {
          [appConfig.chainID]: [appConfig.rpc]
        }
      },
    })
)